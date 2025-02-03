import HeroSection from '../components/sections/HeroSection';
import DemoSection from '../components/sections/DemoSection';

export default function Landing() {
    return (
        <div className='h-screen w-screen max-w-full max-h-full pt-[70px]'>
            <HeroSection />
            <DemoSection />
        </div>
    );
}
