import { FC } from 'react';
import { SMainPageSection, SubPageSection } from 'shared/styled';
import { IReactProps } from 'types/ChildrenNode';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

interface IProps extends IReactProps {
  pageTitle?: string;
  canBack?: boolean;
}

const PageSection: FC<IProps> = ({ canBack, pageTitle, children }) => {
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
      <SubPageSection>{children}</SubPageSection>
    </SMainPageSection>
  );
};

export default PageSection;
