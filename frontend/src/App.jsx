import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import Navigator from './components/navigation/Navigator';

export default function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter> 
          <Navigator />
      </BrowserRouter>
    </>
  );
}
