import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import Landing from './pages/Landing';
import DevInfo from './pages/DevInfo';
import Footer from './components/common/Footer';

export default function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter> 
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/devinfo" element={<DevInfo />} />
          </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}
