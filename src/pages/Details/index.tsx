import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PageSection from 'components/PageSection';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { useParams } from 'react-router-dom';
import { getPostList } from 'api/posts';
import { IPost } from 'types/Post';
import PostForms from 'components/PostForms';

const Details = () => {
  let { id } = useParams();
  const [values, setValues] = useState<IPost>({
    title: '',
    body: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await getPostList(id);
        const { data } = response;
        const [value] = data;
        setValues((prevState: IPost) => ({
          ...prevState,
          ['title']: value.title,
          ['body']: value.body,
        }));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <PageSection pageTitle='Details' canBack>
      <Stack direction='column' spacing={2}>
        <PostForms values={values} changeHandler={(e) => changeHandler(e)} />
        <Stack direction='row' spacing={2} alignItems='center'>
          <Button variant='contained' endIcon={<CreateIcon />}>
            update
          </Button>
          <Button variant='outlined' startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Stack>
      </Stack>
    </PageSection>
  );
};

export default Details;
