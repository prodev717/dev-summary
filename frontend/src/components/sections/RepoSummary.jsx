import { useState } from 'react'

export default function RepoSummary() {
    const [username, setUsername] = useState('');
    const [repository, setRepository] = useState('');
    const [repoSummary, setRepoSummary] = useState(null); 
    const [loading, setLoading] = useState(false);

    const handleSummary = () => {
        fetch(`http://localhost:8000/repoinfo/${username}/${repository}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            setLoading(false);
            setRepoSummary(data); 
        })
        .catch((error) => {
            setLoading(false);
            console.error('Error sending request:', error);
        });
    };

    const handleDownload = () => {
        const blob = new Blob([repoSummary.summary], {type: 'text/plain'})
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Summary.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-screen max-w-full flex flex-col items-center mt-2">
            <div className="sm:w-[85%] h-16 lg:w-[60%] bg-[#5C5470] rounded-lg border-[#FAF0E6] border-4 flex flex-col justify-center items-center motion-preset-fade motion-duration-[2.5s]">
                <div className="w-[100%] px-2 flex items-center justify-between">
                    <input
                        type="text"
                        placeholder="Enter a github username"
                        className="sm:w-[35%] text-center border-b-white border-b-[1px] lg:w-[35%] sm:text-sm lg:text-lg h-10 py-1 px-2 bg-transparent my-5 text-[#FAF0E6] placeholder-[#FAF0E6] outline-none"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p className='text-[#FAF0E6] text-2xl'>/</p>
                    <input
                        type="text"
                        placeholder="Enter a repository name"
                        className="sm:w-[35%] text-center border-b-white border-b-[1px] lg:w-[40%] sm:text-sm lg:text-lg h-10 py-1 px-2 bg-transparent my-5 text-[#FAF0E6] placeholder-[#FAF0E6] outline-none"
                        onChange={(e) => setRepository(e.target.value)}
                    />
                    <button
                        className="sm:w-[25%] lg:w-[20%] sm:text-xs lg:text-lg h-10 py-1 px-2 bg-[#B9B4C7] text-[#FAF0E6] rounded-lg border-[#FAF0E6] border-2"
                        onClick={() => {
                            if (!username || !repository) {
                                alert('Please provide both username and repository');
                                return;
                            };
                            handleSummary();
                            setLoading(true);
                        }}
                        disabled={loading}
                    >
                        Summarize
                    </button>
                </div>
            </div>
            <div className="sm:w-[85%] lg:w-[60%] h-fit bg-[#5C5470] rounded-lg border-[#FAF0E6] border-4 mt-10 flex flex-col justify-center items-center px-2 py-2 motion-preset-fade motion-duration-[2.5s]">
                {loading ? (
                    <div
                    className="inline-block h-12 w-12 mb-4 animate-spin rounded-full border-4 border-solid border-white border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                        <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                    </div>
                ) : null}
                {repoSummary && !loading ? (
                    <div className="text-[#FAF0E6] border-[#FAF0E6] flex flex-col items-center">
                        <h1 className='text-2xl text-center'><strong>Summary of {repository}</strong></h1>
                        <p className='my-1'>{repoSummary.summary}</p>
                        <button
                            className="sm:w-[25%] lg:w-[20%] sm:text-md lg:text-lg h-10 py-1 px-2 my-2 bg-[#B9B4C7] text-[#FAF0E6] rounded-lg border-[#FAF0E6] border-2"
                           onClick={handleDownload} 
                        >
                            Download
                        </button>
                    </div>
                ) : (
                    <p className="text-[#FAF0E6] text-md">
                        The summary of the repository will be displayed here
                    </p>
                )}
            </div>
        </div>
    );
}