import React, { FC, memo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IPost } from 'types/Post';

interface ComponentProps {
  values: IPost;
  changeHandler?: (e: changeEvent) => void | changeEvent | undefined;
}

const PostForms: FC<ComponentProps> = ({ values, changeHandler }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <TextField
        sx={{ m: 1, width: '50%' }}
        label='Title'
        id='post-title'
        name='title'
        value={values.title}
        onChange={changeHandler}
      />
      <TextField
        sx={{ m: 1, width: '100%' }}
        label='Description'
        id='post-content'
        name='body'
        value={values.body}
        onChange={changeHandler}
      />
    </Box>
  );
};

export default memo(PostForms);
