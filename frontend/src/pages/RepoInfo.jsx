import RepoSummary from '../components/sections/RepoSummary';

export default function RepoInfo() {
    return (
        <div className='h-screen flex flex-col items-center pt-[80px]'>
            <h1 className='text-[#FAF0E6] sm:text-xl lg:text-3xl font-poppins font-semibold sm:my-3 lg:my-5 sm:w-[85%] lg:w-[60%]'>
                Enter a Github username and a repository of the user to get the summary of it
            </h1> 
            <RepoSummary />
        </div>
    );
};