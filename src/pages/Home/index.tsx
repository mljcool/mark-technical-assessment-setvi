import { useEffect, useMemo, useState, useCallback, memo, FC } from 'react';
import SearchBar from 'components/SearchBar';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { getPostList } from 'api/posts';
import { IPost } from 'types/Post';
import { useNavigate } from 'react-router-dom';

import { SearhBarSection } from './styled';
import PageSection from 'components/PageSection';
import { Utils } from 'utils/search';

interface ComponentProps {
  onLoad?: (isLoad: boolean) => void;
}

const HomePageComponent: FC<ComponentProps> = ({ onLoad }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState<IPost[]>([]);
  const [placeholderData, setPlaceholderData] = useState<IPost[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searched, setSearched] = useState<string>('');
  const [page, setPage] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value: string) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  const memoizedHandleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      return handleChangePage(event, newPage);
    },
    []
  );

  const memoizedHandleChangePerPage = useCallback((event: changeEvent) => {
    return handleChangeRowsPerPage(event.target.value);
  }, []);

  const requestSearch = (searchedVal: string) => {
    setSearched(searchedVal);
    const results = Utils.filterArrayByString(
      placeholderData,
      searchedVal
    ) as IPost[];
    setPost(results);
    if (!results.length) {
      setRowsPerPage(0);
    } else {
      setRowsPerPage(5);
    }
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - post.length) : 0;

  useEffect(() => {
    onLoad && onLoad(true);
    (async () => {
      try {
        const response = await getPostList();
        const { data } = response;
        setPost(data as IPost[]);
        setPlaceholderData(data as IPost[]);
        onLoad && onLoad(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const TableHeader = () => (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Title</TableCell>
        <TableCell>Content</TableCell>
      </TableRow>
    </TableHead>
  );
  return (
    <>
      <SearhBarSection>
        <SearchBar
          value={searched}
          onSearchPost={(e) => requestSearch(e.target.value)}
        />
        <Button
          variant='contained'
          onClick={() => navigate(`/create`)}
          startIcon={<CreateIcon />}
        >
          Create
        </Button>
      </SearhBarSection>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, maxHeight: 450 }} aria-label='simple table'>
          <TableHeader />
          <TableBody>
            {(rowsPerPage > 0
              ? post.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : post
            ).map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/details/${row.id}`)}
              >
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.title}
                </TableCell>
                <TableCell component='th' scope='row'>
                  {row.body}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter sx={{ minWidth: '100%' }}>
            <TableRow>
              <TablePagination
                sx={{ minWidth: '100%' }}
                rowsPerPageOptions={[5, 10, 15, { label: 'All', value: -1 }]}
                colSpan={3}
                count={post.length === 0 ? 1 : post.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={memoizedHandleChangePage}
                onRowsPerPageChange={memoizedHandleChangePerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

const MemoizedHomePage = memo(HomePageComponent);

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <PageSection pageTitle='Listing all items' isLoading={isLoading}>
      <MemoizedHomePage onLoad={(isLoad) => setIsLoading(isLoad)} />
    </PageSection>
  );
};

export default Home;
