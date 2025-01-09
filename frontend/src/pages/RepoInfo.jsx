import RepoSummary from '../components/summaries/RepoSummary';

export default function RepoInfo() {
    return (
        <div className='min-h-screen w-screen max-w-full max-h-full bg-[#352F44] bg-fixed flex flex-col items-center'>
            <h1 className='text-[#FAF0E6] sm:text-xl lg:text-3xl font-poppins font-semibold sm:my-3 lg:my-5 sm:w-[85%] lg:w-[60%]'>
                Enter a Github username and a repository of the user to get the summary of it
            </h1> 
            <RepoSummary />
        </div>
    );
};