import ThemeWrapper from './theme';
import AppBarPage from './components/AppBar';
import { RenderPages } from 'routes/routes.routes';
import Layout from 'components/Layout';
import './App.css';

const App = () => {
  return (
    <ThemeWrapper>
      <AppBarPage />
      <Layout>
        <RenderPages />
      </Layout>
    </ThemeWrapper>
  );
};

export default App;
