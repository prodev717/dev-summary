import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import Landing from './pages/landing/Landing';
import DevInfo from './pages/devinfo/DevInfo';

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
    </>
  );
}
