import { useState } from 'react';
import axios from 'axios';
import { FaRegCopy } from 'react-icons/fa';
import { TbNotes } from 'react-icons/tb';
import { RiResetLeftFill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';


export default function DevSummary() {
    const [username, setUsername] = useState('');
    const [userSummary, setUserSummary] = useState(null); 
    const [loading, setLoading] = useState(false);

    async function handleSummary() {
        await axios.get(
            `http://localhost:8000/devinfo/${username}`,
            {
                headers: {'Content-Type': 'application/json'}
            }
        )
        .then(data => {
            setLoading(false);
            console.log(data.data);
            setUserSummary(data.data); 
        })
        .catch((error) => {
            setLoading(false);
            console.error('Error sending request:', error);
        });
    };

    function usernameEmptyNotification() {
        toast('Please enter a username!', { 
            toastId: 'emptyuser',
            closeOnClick: true,
            pauseOnHover: false,
            className: 'shadow-sm shadow-white w-fit'
        });
    };

    function copySummaryNotification() {
        toast('Copied successfully!', { 
            toastId: 'copied',
            closeOnClick: true,
            pauseOnHover: false,
            className: 'shadow-sm shadow-white w-fit'
        });
    };

    return (
        <div className="w-screen max-w-full flex flex-col items-center justify-center mt-7">
            <div className="sm:w-[90%] h-fit lg:w-[60%] bg-black rounded-lg border-white border-4 flex flex-col justify-center items-center motion-preset-fade motion-duration-[2.5s] mb-10">
                <div className="w-[100%] flex sm:flex-wrap lg:flex-nowrap items-center justify-between border-b-white border-b-2">
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter a github username"
                        className="sm:w-[100%] lg:w-[70%] sm:text-md lg:text-lg h-10 py-2 px-2 bg-transparent text-white placeholder-white outline-none border-white border-2"
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (e.target.value === '') return;
                                e.preventDefault()
                                handleSummary();
                                setLoading(true);
                            };
                        }}
                        autoComplete='off'
                    />
                    <div className='flex sm:w-[100%] lg:w-fit'>
                        <button
                            className="sm:w-[36%] lg:w-fit sm:text-sm lg:text-md h-10 py-1 px-2 bg-black text-white border-white border-2 enabled:hover:bg-white enabled:hover:text-black flex items-center"
                            onClick={() => {
                                if (!username) {
                                    usernameEmptyNotification();
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
                            className="sm:w-[32%] lg:w-fit gap-2 sm:text-sm lg:text-md h-10 py-1 px-2 bg-black text-white border-white border-2 enabled:hover:bg-white enabled:hover:text-black flex items-center"
                            onClick={() => {
                                navigator.clipboard.writeText(userSummary.summary);
                                copySummaryNotification();
                            }}
                            disabled={!username || !userSummary}
                        >
                            <ToastContainer 
                                autoClose={1000}
                                theme="dark"
                                hideProgressBar
                                position='bottom-left'
                            />
                            <FaRegCopy className='h-7 w-5'/>
                            <p>Copy</p>
                        </button>
                        <button
                            className="sm:w-[32%] lg:w-fit gap-2 sm:text-sm lg:text-md h-10 py-1 px-2 bg-black text-white border-white border-2 enabled:hover:bg-white enabled:hover:text-black flex items-center"
                            onClick={() => {
                                setUsername('');
                                setUserSummary('');
                                setLoading(false);
                                document.getElementById('username').value = '';
                            }}
                            disabled={!username || !userSummary}
                        >
                            <RiResetLeftFill className='h-7 w-5'/>
                            <p>Reset</p>
                        </button>
                    </div>
                </div>
                <div className="w-[97%] h-fit text-white text-md flex flex-col items-center motion-preset-fade motion-duration-[2.5s]">
                    {loading ? (
                        <div
                        className="inline-block h-12 w-12 my-4 animate-spin rounded-full border-4 border-solid border-white border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                            <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Loading...</span>
                        </div>
                    ) : null}
                    {userSummary&& !loading ? (
                        <div className="w-[100%] text-white border-white px-2 flex flex-col prose sm:prose-lg lg:prose-xl prose-h1:text-xl prose-h1:text-white prose-p:text-lg prose-strong:text-white prose-strong:text-lg prose-ul:list-disc prose-ul:text-white">
                            <ReactMarkdown className='w-[95%]'>{userSummary.summary}</ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-white text-md text-lg my-3 mx-2">
                            The summary of the user's GitHub profile will be displayed here
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};