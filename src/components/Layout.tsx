import { FC } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const RootLayout = styled(Paper)(({ theme }) => ({
  maxWidth: `100%`,
  height: '100vh',
  margin: '0 auto',
  background: '#f1f5f9',
  padding: '2rem',
  overflow: 'auto',
}));

const Layout: FC<IReactProps> = ({ children }) => {
  return <RootLayout elevation={0}>{children}</RootLayout>;
};

export default Layout;
