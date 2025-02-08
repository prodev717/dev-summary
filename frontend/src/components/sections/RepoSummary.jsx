import { useState } from 'react'
import axios from 'axios';
import { TbNotes } from 'react-icons/tb';
import { FaRegCopy } from 'react-icons/fa';
import { RiResetLeftFill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';

export default function RepoSummary() {
    const [username, setUsername] = useState('');
    const [repository, setRepository] = useState('');
    const [repoSummary, setRepoSummary] = useState(null); 
    const [loading, setLoading] = useState(false);

    async function handleSummary() {
        await axios.get(
            `http://localhost:8000/repoinfo/${username}/${repository}`,
            {
                headers: { 'Content-Type': 'application/json' } 
            }
        )
        .then(data => {
            setLoading(false);
            setRepoSummary(data.data); 
        })
        .catch((error) => {
            setLoading(false);
            console.error('Error sending request:', error);
        });
    };

    function detailsEmptyNotification() {
        toast('Please enter all details!', { 
            toastId: 'emptydetails',
            closeOnClick: true,
            pauseOnHover: false,
            className: 'top-17 left-1 shadow-sm shadow-white'
        });
    };

    function copySummaryNotification() {
        toast('Copied successfully!', { 
            toastId: 'copied',
            closeOnClick: true,
            pauseOnHover: false,
            className: 'top-15 shadow-sm shadow-white'
        });
    };

    return (
        <div className="w-screen max-w-full flex flex-col items-center mt-7">
            <div className="sm:w-[85%] h-fit lg:w-[60%] bg-black rounded-lg border-white border-4 flex flex-col motion-preset-fade motion-duration-[2.5s]">
                <div className="w-[100%] h-fit flex sm:flex-col lg:flex-row border-white border-b-2">
                    <div className="h-[100%] sm:w-[100%] lg:w-[75%] flex">
                        <input
                            id="username"
                            type="text"
                            placeholder="GitHub username"
                            className="sm:w-[50%] lg:w-[50%] text-center sm:text-sm lg:text-lg h-10 py-1 px-2 bg-transparent border-white border-2 text-white placeholder-white outline-none"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            id="repository"
                            type="text"
                            placeholder="Repository name"
                            className="sm:w-[50%] lg:w-[50%] text-center sm:text-sm lg:text-lg h-10 py-1 px-2 bg-transparent border-white border-2 text-white placeholder-white outline-none"
                            onChange={(e) => setRepository(e.target.value)}
                        />
                    </div>
                    <div className='flex sm:w-[100%] lg:w-fit'>
                        <button
                            className="sm:w-[36%] lg:w-fit flex sm:text-md lg:text-md h-10 py-1 px-2 bg-black text-white border-white border-2 enabled:hover:bg-white enabled:hover:text-black"
                            onClick={() => {
                                if (!username || !repository) {
                                    detailsEmptyNotification();
                                    return;
                                };
                                handleSummary();
                                setLoading(true);
                            }}
                            disabled={loading}
                        >
                            <ToastContainer 
                                autoClose={1000}
                                theme="dark"
                                hideProgressBar
                                position='bottom-left'
                            />
                            {!loading ? 
                            (<>
                                <TbNotes className='h-7 w-7'/>
                                <p>Summarize</p>
                             </>) :
                            <div className='flex items-center gap-2 h-[100%]'>
                                <div
                                    className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                    role="status">
                                        <span
                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                        >Loading...</span>
                                </div>
                                <p>Fetching</p>
                            </div>}
                        </button>
                        <button
                            className="sm:w-[32%] lg:w-fit flex gap-2 sm:text-md lg:text-lg h-10 py-1 px-2 bg-black text-white border-white border-2 enabled:hover:bg-white enabled:hover:text-black"
                            onClick={() => {
                                navigator.clipboard.writeText(repoSummary.summary);
                                copySummaryNotification();
                            }}
                            disabled={(!username || !repository) || !repoSummary || loading}
                        >
                            <ToastContainer 
                                autoClose={1000}
                                position='bottom-left'
                                theme="dark"
                                hideProgressBar
                            />
                            <FaRegCopy className='h-7 w-5'/>
                            <p>Copy</p>
                        </button>
                        <button
                            className="sm:w-[32%] lg:w-fit flex gap-2 sm:text-md lg:text-lg h-10 py-1 px-2 bg-black text-white border-white border-2 enabled:hover:bg-white enabled:hover:text-black"
                            onClick={() => {
                                setUsername('');
                                setRepository('');
                                setRepoSummary('');
                                setLoading(false);
                                document.getElementById('username').value = '';
                                document.getElementById('repository').value = '';
                            }}
                            disabled={(!username && !repository) || !repoSummary || loading}
                        >
                            <RiResetLeftFill className='sm:h-7 sm:w-5'/>
                            <p>Reset</p>
                        </button>
                    </div>
                </div>
                <div className="w-[97%] h-fit text-white text-md flex flex-col justify-center items-center motion-preset-fade motion-duration-[2.5s]">
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
                        <div className="w-[100%] text-white border-white flex flex-col prose sm:prose-lg lg:prose-xl prose-h1:text-xl prose-h1:text-white prose-p:text-lg prose-strong:text-white prose-strong:text-lg prose-ul:list-disc prose-ul:text-white">
                            <ReactMarkdown className='w-[95%]'>{repoSummary.summary}</ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-white text-lg my-3">
                            The summary of the repository will be displayed here
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}