

export default function Landing() {
    return (
        <div className='h-screen w-screen max-w-full max-h-full scrollbar-thin'>
            <div className='w-full h-full flex flex-wrap justify-center items-center py-5 sm:py-1 text-white'>
                <div className='flex justify-center items-center sm:flex-col md:flex-row sm:justify-center'>
                    <div className='sm:w-[90%] lg:w-[50%] flex flex-wrap mx-5 lg:ml-8 sm:my-5'>
                        <h1 className='md:text-7xl sm:text-5xl font-poppins font-semibold motion-preset-slide-right motion-duration-[1.13s]'>Explore GitHub Like Never Before</h1>
                        <p className='sm:text-md md:text-xl font-poppins font-normal my-5 motion-preset-slide-right motion-duration-[1.13s]'>Explore profiles, unlock repository insights, ask questions, and access API documentation—all in one place!</p>
                        <button className='bg-white px-3 py-2 rounded-md text-black'>See Demos</button>
                    </div>
                </div>
            </div>
            <div className='w-full h-full flex sm:gap-4 lg:gap-0 sm:flex-col lg:flex-row items-center py-5 sm:py-1 text-white'>
                <div className="sm:w-[100%] lg:w-[50%] flex flex-col items-center">
                    <div className="sm:w-[330px] lg:w-[480px] sm:h-[220px] lg:h-[300px] border-8 border-white flex rounded-md">
                        
                    </div>
                    <span className="sm:w-12 lg:w-16 h-10 border-2 border-white bg-white"></span>
                    <span className="sm:w-28 lg:w-32 h-4 bg-white"></span>
                </div>
                <div className="sm:w-[100%] lg:w-[50%] flex flex-col items-center">
                    <div className="p-2 w-[95%]">
                        <p className="sm:text-md lg:text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, a dolores dolorum ex iure unde nostrum aliquid odit modi? Laboriosam eveniet harum voluptatum voluptatem adipisci quo illo fuga dicta amet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur praesentium facere ea nemo tempore velit accusantium sed accusamus sit nostrum, cupiditate eos eveniet error maiores unde magni minima. Ab, recusandae.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
