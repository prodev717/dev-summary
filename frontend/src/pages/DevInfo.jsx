import DevSummary from "../components/sections/DevSummary";

export default function DevInfo() {
    return (
        <div className='h-screen flex flex-col items-center pt-[80px] scrollbar-track-gray-950'>
            <h1 className='text-white text-center sm:text-xl lg:text-3xl font-poppins font-semibold sm:my-3 lg:my-5 sm:w-[85%] lg:w-[60%]'>
                Get a summary of any GitHub user
            </h1>
            <DevSummary />
        </div>
    );
};