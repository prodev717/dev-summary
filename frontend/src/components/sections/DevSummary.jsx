import { useState } from 'react';
import axios from 'axios';
import { FaRegCopy } from 'react-icons/fa';
import { TbNotes } from 'react-icons/tb';
import { RiResetLeftFill } from 'react-icons/ri';


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
            setUserSummary(data.data); 
        })
        .catch((error) => {
            setLoading(false);
            console.error('Error sending request:', error);
        });
    };

    return (
        <div className="w-screen max-w-full flex flex-col items-center justify-center mt-2">
            <div className="sm:w-[95%] h-fit lg:w-[60%] bg-black rounded-lg border-white border-4 flex flex-col justify-center items-center motion-preset-fade motion-duration-[2.5s]">
                <div className="w-[100%] flex sm:flex-wrap lg:flex-nowrap items-center justify-between border-b-white border-b-2">
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter a github username"
                        className="sm:w-[100%] lg:w-[70%] sm:text-md lg:text-lg h-10 py-1 px-2 bg-transparent text-white placeholder-[#FAF0E6] outline-none sm:border-b-white sm:border-b-2"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className='flex'>
                        <button
                            className="w-fit flex gap-1 sm:text-md lg:text-lg h-10 py-1 px-2 bg-black text-white border-white border-2 hover:bg-white hover:text-black"
                            onClick={() => {
                                if (!username) {
                                    alert('Please provide the username');
                                    return;
                                };
                                handleSummary();
                                setLoading(true);
                            }}
                            disabled={loading}
                        >
                            <TbNotes className='h-7 w-6'/>
                            <p>Summarize</p>
                        </button>
                        <button
                            className="w-fit flex gap-2 sm:text-md lg:text-lg h-10 py-1 px-2 bg-black text-white border-white border-2 hover:bg-white hover:text-black"
                            onClick={() => {navigator.clipboard.writeText(userSummary.summary)}}
                        >
                            <FaRegCopy className='h-7 w-5'/>
                            <p>Copy</p>
                        </button>
                        <button
                            className="w-fit flex gap-2 sm:text-md lg:text-lg h-10 py-1 px-2 bg-black text-white border-white border-2 hover:bg-white hover:text-black"
                            onClick={() => {
                                setUsername('');
                                setUserSummary('');
                                setLoading(false);
                                document.getElementById('username').value = '';
                            }}
                        >
                            <RiResetLeftFill className='h-7 w-5'/>
                            <p>Reset</p>
                        </button>
                    </div>
                </div>
                <div className="w-[93%] h-fit text-white flex flex-col justify-center items-center px-2 py-2 motion-preset-fade motion-duration-[2.5s] my-5">
                    {loading ? (
                        <div
                        className="inline-block h-12 w-12 mb-4 animate-spin rounded-full border-4 border-solid border-white border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                            <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Loading...</span>
                        </div>
                    ) : null}
                    {userSummary&& !loading ? (
                        <div className="text-white border-[#FAF0E6] flex flex-col items-center">
                            <p className='my-1'>{userSummary.summary}</p>
                        </div>
                    ) : (
                        <p className="text-white text-md">
                            The summary of the user's GitHub profile will be displayed here
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};