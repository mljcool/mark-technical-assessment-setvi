import React, { FC } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IPost } from 'types/Post';

interface IProps {
  values: IPost;
  changeHandler?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void | React.ChangeEvent<HTMLInputElement> | undefined;
}

const PostForms: FC<IProps> = ({ values, changeHandler }) => {
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
        label='Content'
        id='post-content'
        name='body'
        value={values.body}
        onChange={changeHandler}
      />
    </Box>
  );
};

export default PostForms;
