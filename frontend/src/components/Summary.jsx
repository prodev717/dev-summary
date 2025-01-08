import { useState } from 'react';

export default function DevSummary() {
    const [username, setUsername] = useState('');
    const [userSummary, setUserSummary] = useState(null); 

    const handleSummary = () => {
        fetch(`http://localhost:8000/devinfo/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            setUserSummary(data); 
            console.log(data);
        })
        .catch((error) => {
            console.error('Error sending request:', error);
        });
    };

    return (
        <div className="min-h-screen w-screen max-w-full max-h-full bg-[#352F44] bg-fixed flex flex-col items-center">
            <div className="sm:w-[85%] h-16 lg:w-[60%] bg-[#5C5470] rounded-lg border-[#FAF0E6] border-4 flex flex-col justify-center items-center motion-preset-fade motion-duration-[2.5s]">
                <div className="w-[100%] px-2 flex items-center">
                    <input
                        type="text"
                        placeholder="Enter a github username"
                        className="sm:w-[75%] lg:w-[80%] sm:text-sm lg:text-lg h-10 py-1 px-2 bg-transparent my-5 rounded-xl text-[#FAF0E6] placeholder-[#FAF0E6] outline-none"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button
                        className="sm:w-[25%] lg:w-[20%] sm:text-xs lg:text-lg h-10 py-1 px-2 bg-[#B9B4C7] text-[#FAF0E6] rounded-lg border-[#FAF0E6] border-2 transition transform hover:translate-x-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
                        onClick={() => {handleSummary();console.log(username)}}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="sm:w-[85%] lg:w-[60%] h-fit bg-[#5C5470] rounded-lg border-[#FAF0E6] border-4 mt-10 flex flex-col justify-center items-center px-2 py-4">
                {userSummary ? (
                    <div className="text-[#FAF0E6] border-[#FAF0E6]">
                        <h1 className='text-2xl text-center'><strong>Summary of {username}</strong></h1>
                        <p className='my-2'>{userSummary.summary}</p>
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