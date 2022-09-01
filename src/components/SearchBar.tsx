import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

export const SearhBarInput = styled(Paper)({
  borderRadius: 10,
  padding: '5px 6px',
});
interface ComponentProps {
  value: string;
  onSearchPost?: (e: changeEvent) => void | changeEvent | undefined;
}

const SearchBar: FC<ComponentProps> = ({ onSearchPost, value }) => {
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
        value={value}
        onChange={onSearchPost}
      />
    </SearhBarInput>
  );
};

export default SearchBar;
