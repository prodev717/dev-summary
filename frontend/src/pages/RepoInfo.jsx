import RepoSummary from '../components/sections/RepoSummary';

export default function RepoInfo() {
    return (
        <div className='h-screen flex flex-col items-center pt-[80px] motion-preset-fade motion-duration-[2.5s]'>
            <h1 className='text-white text-center sm:text-3xl lg:text-6xl font-poppins font-semibold sm:my-3 lg:my-5 sm:w-[85%] lg:w-[60%]'>Concise GitHub repository summary</h1> 
            <p className='text-white text-center sm:text-md lg:text-xl font-poppins mt-2 sm:w-[85%] lg:w-[50%]'>Get an abridged version of any GitHub repository using DevInfo - A GeminiAI powered profile summarizer</p>
            <RepoSummary />
        </div>
    );
};