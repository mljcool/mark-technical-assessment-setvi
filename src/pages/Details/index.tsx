import React, { useEffect, useState, useMemo, useCallback } from 'react';
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

  const [title, setTitle] = useState<string>('Details /');
  const [isLoading, setIsloding] = useState({
    update: false,
    delete: false,
    onload: false,
  });
  const [values, setValues] = useState<IPost>({
    title: '',
    body: '',
  });

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
  const memoizedChangeHandler = useCallback(
    (event: changeEvent) => changeHandler(event),
    []
  );

  const changeHandler = (event: changeEvent) => {
    const { name, value } = event.target;
    setValues((preValues) => ({ ...preValues, [name]: value }));
  };

  const onUpdate = async (type = 'update') => {
    loadBuff(type, true);
    const post = await updatePost(id as string, values);
    if (post.status === SUCCESS_CODE) {
      onNavigate(type);
    }
  };

  useEffect(() => {
    loadBuff('onload', true);

    (async () => {
      try {
        const response = await getPostList(id);
        const { data, status } = response;
        if (status === SUCCESS_CODE) {
          const [value] = data;
          setTitle(`Details / ${value.title}`);
          setValues((prevState: IPost) => ({
            ...prevState,
            title: value.title,
            body: value.body,
          }));
        }
        loadBuff('onload', false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  const onDeletePost = async (type = 'delete') => {
    loadBuff(type, true);
    const post = await deletePost(id);
    if (post.status === SUCCESS_CODE) {
      onNavigate(type);
    }
  };

  const renderChildren = useMemo(
    () => (
      <>
        <Stack direction='column' spacing={2}>
          <PostForms
            values={values}
            changeHandler={(e) => memoizedChangeHandler(e)}
          />
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
      </>
    ),
    [values.title, values.body, isLoading.update, isLoading.delete]
  );

  return (
    <PageSection pageTitle={title} isLoading={isLoading.onload} canBack>
      {renderChildren}
    </PageSection>
  );
};

export default Details;
