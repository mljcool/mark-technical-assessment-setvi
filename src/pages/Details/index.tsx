import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import LoadingButton from '@mui/lab/LoadingButton';
import { useParams, useNavigate } from 'react-router-dom';
import { deletePost, getPostList, updatePost } from 'api/posts';
import { IPost } from 'types/Post';
import PageSection from 'components/PageSection';
import PostForms from 'components/PostForms';

const SUCCESS_CODE = 200;

const Details = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  const [isLoading, setIsloding] = useState({
    update: false,
    delete: false,
  });
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
          title: value.title,
          body: value.body,
        }));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const loadBuff = (name: string, isLoading: boolean) => {
    setIsloding((oldState) => ({ ...oldState, [name]: isLoading }));
  };

  const onNavigate = (type = 'update') => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      navigate(-1);
      loadBuff(type, false);
    }, 1500);
  };

  const onUpdate = async (type = 'update') => {
    loadBuff(type, true);
    const post = await updatePost(id as string, values);
    console.log(post);
    if (post.status === SUCCESS_CODE) {
      onNavigate(type);
    }
  };

  const onDeletePost = async (type = 'delete') => {
    loadBuff(type, true);
    const post = await deletePost(id);
    if (post.status === SUCCESS_CODE) {
      onNavigate(type);
    }
  };

  return (
    <PageSection pageTitle={`Details / ${values.title}`} canBack>
      <Stack direction='column' spacing={2}>
        <PostForms values={values} changeHandler={(e) => changeHandler(e)} />
        <Stack direction='row' spacing={2} alignItems='center'>
          <LoadingButton
            loading={isLoading.update}
            loadingPosition='start'
            variant='contained'
            onClick={() => onUpdate('update')}
            startIcon={<CreateIcon />}
          >
            update
          </LoadingButton>
          <LoadingButton
            loading={isLoading.delete}
            loadingPosition='start'
            variant='outlined'
            onClick={() => onDeletePost('delete')}
            startIcon={<DeleteIcon />}
          >
            Delete
          </LoadingButton>
        </Stack>
      </Stack>
    </PageSection>
  );
};

export default Details;
