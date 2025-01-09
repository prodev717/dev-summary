import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import Navigator from './components/navigation/Navigator';
import Footer from './components/common/Footer';

export default function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter> 
          <Navigator />
      </BrowserRouter>
      <Footer />
    </>
  );
}
