import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const SearhBarInput = styled(Paper)({
  borderRadius: 10,
  padding: '5px 6px',
});

const SearchBar = () => {
  return (
    <SearhBarInput>
      <Input
        placeholder='Search Post..'
        disableUnderline
        fullWidth
        inputProps={{
          'aria-label': 'Search',
        }}
        startAdornment={
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        }
        onChange={(ev) => {}}
      />
    </SearhBarInput>
  );
};

export default SearchBar;
