import github from '../../assets/github.png';
import arrow from '../../assets/arrow.png';

export default function HeroSection() {
    return (
        <>
            <div className='w-[100%] flex flex-wrap justify-center items-center py-5 sm:py-1 text-[#FAF0E6]'>
                <div className='flex items-center sm:flex-col md:flex-row sm:justify-center'>
                    <div className='sm:w-[90%] lg:w-[47%] flex flex-wrap mx-5 lg:ml-8 sm:my-5'>
                        <h1 className='sm:text-5xl md:text-7xl font-poppins font-semibold motion-preset-slide-right motion-duration-[1.13s]'>Explore GitHub Like Never Before</h1>
                        <p className='sm:text-lg md:text-2xl font-poppins font-normal my-5 motion-preset-slide-right motion-duration-[1.13s]'>Explore profiles, unlock repository insights, ask questions, and access API documentation—all in one place!</p>
                    </div>
                    <div className='sm:w-[90%] lg:w-[47%] flex flex-wrap justify-center items-center mx-5 py-6 sm:my-5  sm:-motion-translate-y-in-[50%] lg:motion-translate-x-in-[0%] lg:motion-translate-y-in-[-50%] motion-opacity-in-[15%] motion-duration-[1.00s] motion-ease-linear'>
                        <img src={github} alt="" className='sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40'/>
                    </div>
                </div>
                <div className='mx-auto mt-7 flex flex-col justify-center items-center'>
                    <p className='text-xl font-poppins mb-4 motion-preset-typewriter-[9] motion-duration-[7s]'>See Demos</p>
                    <button>
                        <img src={arrow} alt="" className='w-12 h-12 motion-loop-infinite motion-translate-y-loop-25'/>
                    </button>
                </div>
            </div>
        </>
    );
}
