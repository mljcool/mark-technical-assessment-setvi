import ThemeWrapper from './theme';
import AppBarPage from './components/AppBar';
import { RenderPages } from 'routes/routes.routes';
import './App.css';

const App = () => {
  return (
    <ThemeWrapper>
      <AppBarPage />
      <div className='App'>
        <RenderPages />
      </div>
    </ThemeWrapper>
  );
};

export default App;
