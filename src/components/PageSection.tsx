import { FC } from 'react';
import { SMainPageSection, SubPageSection } from 'shared/styled';
import { IReactProps } from 'types/ChildrenNode';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import LinearIndeterminate from 'components/LoadingBar';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
interface IProps extends IReactProps {
  pageTitle?: string;
  canBack?: boolean;
  isLoading?: boolean;
}

const PageSection: FC<IProps> = ({
  canBack,
  pageTitle,
  isLoading,
  children,
}) => {
  let navigate = useNavigate();
  return (
    <SMainPageSection>
      <Stack direction='row' spacing={2} sx={{ marginBottom: '5px' }}>
        {canBack ? (
          <IconButton onClick={() => navigate(-1)} aria-label='delete'>
            <ArrowBackIcon />
          </IconButton>
        ) : null}
        <Typography variant='h5' component='h5' sx={{ margin: '10px' }}>
          {pageTitle}
        </Typography>
      </Stack>
      <SubPageSection>
        {isLoading && <LinearIndeterminate />}
        <Box sx={{ padding: '2rem' }}>{children}</Box>
      </SubPageSection>
    </SMainPageSection>
  );
};

export default PageSection;
