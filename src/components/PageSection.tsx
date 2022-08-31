import { FC } from 'react';
import { SMainPageSection, SubPageSection } from 'shared/styled';
import { IReactProps } from 'types/ChildrenNode';
import Typography from '@mui/material/Typography';

interface IProps extends IReactProps {
  pageTitle?: string;
}

const PageSection: FC<IProps> = ({ pageTitle, children }) => {
  return (
    <SMainPageSection>
      <Typography variant='h5' component='h5' sx={{ margin: '10px' }}>
        {pageTitle}
      </Typography>
      <SubPageSection>{children}</SubPageSection>
    </SMainPageSection>
  );
};

export default PageSection;
