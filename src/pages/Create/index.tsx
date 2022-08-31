import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom';
import PostForms from 'components/PostForms';
import PageSection from 'components/PageSection';
import { IPost } from 'types/Post';
import { addPost } from 'api/posts';

const Create = () => {
  let navigate = useNavigate();
  const [isLoading, setIsloding] = useState(false);
  const [values, setValues] = useState<IPost>({
    title: '',
    body: '',
  });
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSave = async () => {
    setIsloding(true);
    const { title, body } = values;
    try {
      if (title || body) {
        const post = await addPost({ ...values, userId: 1 });
        if (post.status === 201) {
          const timer = setTimeout(() => {
            clearTimeout(timer);
            navigate(-1);
            setIsloding(false);
          }, 1500);
        }
        console.log(post);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageSection pageTitle='Create Post' canBack>
      <Stack direction='column' spacing={2}>
        <PostForms values={values} changeHandler={(e) => changeHandler(e)} />
        <Stack direction='row' spacing={2} alignItems='center'>
          <LoadingButton
            loading={isLoading}
            loadingPosition='start'
            variant='contained'
            onClick={onSave}
            startIcon={<CreateIcon />}
          >
            save
          </LoadingButton>
        </Stack>
      </Stack>
    </PageSection>
  );
};

export default Create;
