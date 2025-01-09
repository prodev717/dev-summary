import DevSummary from "../components/summaries/DevSummary";

export default function DevInfo() {
    return (
        <div className='bg-[#352F44] bg-fixed flex flex-col items-center'>
            <h1 className='text-[#FAF0E6] sm:text-xl lg:text-3xl font-poppins font-semibold sm:my-3 lg:my-5 sm:w-[85%] lg:w-[60%]'>
                Enter a Github username to get the summary of the user's profile
            </h1>
            <DevSummary />
        </div>
    );
};