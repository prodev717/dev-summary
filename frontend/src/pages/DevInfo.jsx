import DevSummary from "../components/sections/DevSummary";

export default function DevInfo() {
    return (
        <div className='h-screen flex flex-col items-center pt-[80px] scrollbar-track-gray-950 motion-preset-fade motion-duration-[2.5s]'>
            <h1 className='text-white text-center sm:text-4xl lg:text-6xl font-poppins font-semibold mt-7 sm:w-[85%] lg:w-[60%]'>Concise profile summary</h1>
            <p className='text-white text-center sm:text-md lg:text-xl font-poppins mt-2 sm:w-[85%] lg:w-[50%]'>Get an abridged version of any GitHub user's profile using DevInfo - A GeminiAI powered profile summarizer</p>
            <DevSummary />
        </div>
    );
};