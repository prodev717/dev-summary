

export default function HeroSection() {
    
    return (
        <>  
            <div className='w-full h-full flex flex-wrap justify-center items-center py-5 sm:py-1 text-[#FAF0E6]'>
                <div className='flex justify-center items-center sm:flex-col md:flex-row sm:justify-center'>
                    <div className='sm:w-[90%] lg:w-[50%] flex flex-wrap mx-5 lg:ml-8 sm:my-5'>
                        <h1 className='md:text-7xl sm:text-5xl font-poppins font-semibold motion-preset-slide-right motion-duration-[1.13s]'>Explore GitHub Like Never Before</h1>
                        <p className='sm:text-md md:text-xl font-poppins font-normal my-5 motion-preset-slide-right motion-duration-[1.13s]'>Explore profiles, unlock repository insights, ask questions, and access API documentation—all in one place!</p>
                        <button className='bg-white px-3 py-2 rounded-md text-black'>See Demos</button>
                    </div>
                </div>
            </div>
        </>
    );
}
