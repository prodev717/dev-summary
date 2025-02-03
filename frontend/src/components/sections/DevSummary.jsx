import { useState } from 'react';
import axios from 'axios';
import { FaRegCopy } from "react-icons/fa";

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
        <div className="w-screen max-w-full flex flex-col items-center mt-2">
            <div className="sm:w-[85%] h-16 lg:w-[60%] bg-black rounded-lg border-[#FAF0E6] border-4 flex flex-col justify-center items-center motion-preset-fade motion-duration-[2.5s]">
                <div className="w-[100%] px-2 flex items-center justify-between">
                    <input
                        type="text"
                        placeholder="Enter a github username"
                        className="sm:w-[75%] lg:w-[70%] border-b-white border-b-[1px] sm:text-md lg:text-lg h-10 py-1 px-2 bg-transparent my-5 text-[#FAF0E6] placeholder-[#FAF0E6] outline-none"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button
                        className="text-md h-10 py-2 px-4 bg-white text-black rounded-lg border-black border-2"
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
                        Summarize
                    </button>
                </div>
            </div>
            <div className="sm:w-[85%] lg:w-[60%] mb-10 h-fit bg-blac text-white rounded-lg border-[#FAF0E6] border-4 mt-10 flex flex-col justify-center items-center px-2 py-2 motion-preset-fade motion-duration-[2.5s]">
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
                    <div className="text-[#FAF0E6] border-[#FAF0E6] flex flex-col items-center">
                        <h1 className='text-2xl text-center'><strong>Summary</strong></h1>
                        <p className='my-1'>{userSummary.summary}</p>
                        <button
                            className="w-fit flex gap-2 sm:text-md lg:text-lg h-10 py-1 px-2 my-2 bg-black text-white rounded-lg border-[#FAF0E6] border-2"
                            onClick={() => {navigator.clipboard.writeText(userSummary.summary)}}
                        >
                            <FaRegCopy className='h-7 w-5'/>
                            <p>Copy</p>
                        </button>
                    </div>
                ) : (
                    <p className="text-[#FAF0E6] text-md">
                        The summary of the user's GitHub profile will be displayed here
                    </p>
                )}
            </div>
        </div>
    );
};