import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

export default function Landing() {
    return (
        <div className="relative h-screen w-screen max-w-full max-h-full">
            <div className="fixed bottom-0 left-0 right-0 top-0 bg-black z-0" />
            <div className="fixed bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-0" />
            <div className="relative z-10">
                <NavBar />
                <HeroSection />
                <Footer />
            </div>
        </div>
    );
}
