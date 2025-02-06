import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'


export default function Landing() {

    useGSAP(() => {
        gsap.from('#hero-desc', {
            x: -100,
            opacity: 0,
            delay: 1.5,
            duration: 2,
            ease: 'back.inOut' 
        })
    }, [])

    function handleClick() {
        const element = document.getElementById('demo');
        element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }

    return (
        <div className='h-screen w-screen max-w-full max-h-full scrollbar-thin'>
            <div id='hero' className='w-full h-full flex flex-wrap justify-center items-center py-5 sm:py-1 text-white'>
                <div className='sm:w-[90%] lg:w-[60%] flex justify-center items-center sm:flex-col md:flex-row sm:justify-center'>
                    <div className='flex flex-wrap mx-5 lg:ml-8 sm:my-5'>
                        <h1 className='text-center md:text-[69px] sm:text-5xl font-poppins font-semibold w-[100%]'>    
                            <TypeAnimation
                                sequence={[
                                    'Explore GitHub Like Never Before',
                                    1000
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </h1>
                        <p id='hero-desc' className='w-[100%] sm:text-md md:text-xl font-poppins font-normal my-5 flex flex-wrap'>
                            Discover profiles, unlock repo insights, ask questions, and explore API docs—all in one place!
                        </p>
                        
                        <button 
                        className="mx-auto group relative inline-block overflow-hidden rounded border-4 border-double border-white px-5 py-2 font-medium text-white"
                        onClick={handleClick}
                        >
                            <span className="absolute left-0 top-0 mb-0 flex h-full w-0 translate-x-0 transform bg-white opacity-90 transition-all duration-300 ease-out group-hover:w-full"></span>
                            <span className="relative group-hover:text-black">See Demos</span>
                        </button>
                    </div>
                </div>
            </div>
            <div id='demo' className='w-full h-full flex justify-center py-5 sm:py-1 text-white'>
                <div className='flex sm:flex-col lg:flex-row justify-center items-center w-[100%] gap-4'>
                    <div className='h-[50%] w-[20%] border-2 border-white rounded-lg'>
                    </div>
                    <div className='h-[70%] w-[40%] border-2 border-white rounded-lg'>
                    </div>
                    <div className='h-[50%] w-[20%] border-2 border-white rounded-lg'>
                    </div>
                </div>
            </div>
        </div>
    );
}
