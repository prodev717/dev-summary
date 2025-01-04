// import NavBar from '../../components/common/NavBar';
import HeroSection from './HeroSection';
import Footer from '../../components/common/Footer';

export default function Landing() {
    return (
        <div className='h-screen w-screen max-w-full max-h-full bg-black bg-fixed'>
            <HeroSection />
            <Footer />
        </div>
    );
}
