


export default function APIdocs() {
    return(
        <div className='min-h-[100vh] flex flex-col items-center pt-[50px] pb-[30px] font-poppins text-[#FAF0E6]'>
            <div className='mt-10 mb-10 w-[100%] flex flex-col items-center'>
                <h1 className='w-[90%] sm:text-3xl lg:text-5xl text-left'>API Documentation</h1>
                <hr className='bg-[#FAF0E6] w-[90%] my-5'/>
                <div className='w-[90%]'>
                    <h2 className='text-2xl font-bold w-[100%] text-left mt-4'>Description</h2>
                    <p className='text-md mt-4'>This API allows users to fetch detailed summaries of GitHub repositories and developer skills. The API provides endpoints to:</p>
                    <ul className='list-disc ml-5 pl-5'>
                        <li className='text-md mt-2'>Retrieve a developer's skill summary based on their GitHub user profile.</li>
                        <li className='text-md mt-2'>Retrieve a detailed summary of a specific GitHub repository.</li>
                    </ul>
                    <h2 className='text-2xl font-bold w-[100%] text-left mt-7'>Base URL</h2>
                    <p className='bg-[#5C5470] rounded w-fit p-1 text-md my-4'>https://git2know.com</p>
                    <h2 className='text-2xl font-bold w-[100%] text-left mt-7'>Endpoints</h2>
                    <h2 className='text-xl font-bold w-[100%] text-left mt-7'>1. Developer Summary</h2>
                    <p className='bg-[#5C5470] rounded w-fit p-1 text-md my-4'>GET /devinfo/{`<username>`}</p>
                    <h2 className='text-xl font-semibold w-[100%] text-left my-5'>Description</h2>
                    <p className='text-md'>Fetches a summary of a developer's skills, experience, and expertise based on their public GitHub repositories.</p>
                    <h2 className='text-xl font-semibold w-[100%] text-left my-5'>Parameters</h2>
                    <ul className='list-disc ml-5 pl-5'>
                        <li className='my-4'><p className='bg-[#5C5470] rounded w-fit p-1 text-md my-4 inline mr-[1px]'>username</p>:   The GitHub username of the developer.</li>
                    </ul>
                    <h2 className='text-xl font-semibold w-[100%] text-left my-5'>Response</h2>
                    <p className='my-2'><strong>200 OK</strong>: Returns a JSON object containing the developer's Github profile summary.</p>
                    <div className="bg-[#5C5470] my-5 py-2 px-3 rounded-lg font-mono sm:w-[100%] lg:w-[60%]">
                        <div><span>{`{`}</span></div>
                        <div className="ml-4">
                            <span className="text-orange-500">{`"summary"`}</span>
                            <span >: </span>
                            <span className="text-sky-100">{`"The developer has expertise in Python and JavaScript, with a strong focus"`}</span>
                        </div>
                        <div><span>{`}`}</span></div>
                    </div>
                    <p className='my-2'><strong>Error</strong>: If username is invalid or data fetching fails</p>
                    <div className="bg-[#5C5470] my-5 py-2 px-3 rounded-lg font-mono sm:w-[100%] lg:w-[60%]">
                        <div><span>{`{`}</span></div>
                        <div className="ml-4">
                            <span className="text-orange-500">{`"summary"`}</span>
                            <span >: </span>
                            <span className="text-sky-100">{`"Error fetching repository data. Check the GitHub username and try again."`}</span>
                        </div>
                        <div><span>{`}`}</span></div>
                    </div>
                    <h2 className='text-xl font-bold w-[100%] text-left mt-9'>2. Repository Summary</h2>
                    <p className='bg-[#5C5470] rounded w-fit p-1 text-md my-4'>GET /devinfo/{`<username>`}/{`<repository>`}</p>
                    <h2 className='text-xl font-semibold w-[100%] text-left my-5'>Description</h2>
                    <p className='text-md'>Fetches a detailed description of the repository's README.md file.</p>
                    <h2 className='text-xl font-semibold w-[100%] text-left my-5'>Parameters</h2>
                    <ul className='list-disc ml-5 pl-5'>
                        <li className='my-4'><p className='bg-[#5C5470] rounded w-fit p-1 text-md my-4 inline mr-[1px]'>username</p>:   The GitHub username of the developer.</li>
                        <li className='my-4'><p className='bg-[#5C5470] rounded w-fit p-1 text-md my-4 inline mr-[1px]'>repository</p>:   Name of the repository.</li>
                    </ul>
                    <h2 className='text-xl font-semibold w-[100%] text-left my-5'>Response</h2>
                    <p className='my-2'><strong>200 OK</strong>: Returns a JSON object containing a detailed summary of the repository.</p>
                    <div className="bg-[#5C5470] my-5 py-2 px-3 rounded-lg font-mono sm:w-[100%] lg:w-[60%]">
                        <div><span>{`{`}</span></div>
                        <div className="ml-4">
                            <span className="text-orange-500">{`"summary"`}</span>
                            <span >: </span>
                            <span className="text-sky-100">{`"This project is a web-based application for real-time chat functionality..."`}</span>
                        </div>
                        <div><span>{`}`}</span></div>
                    </div>
                    <p className='my-2'><strong>Error</strong>: If username or repository name is invalid or data fetching fails</p>
                    <div className="bg-[#5C5470] my-5 py-2 px-3 rounded-lg font-mono sm:w-[100%] lg:w-[60%]">
                        <div><span>{`{`}</span></div>
                        <div className="ml-4">
                            <span className="text-orange-500">{`"summary"`}</span>
                            <span >: </span>
                            <span className="text-sky-100">{`"Error fetching repository data. Check the GitHub username and try again."`}</span>
                        </div>
                        <div><span>{`}`}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};