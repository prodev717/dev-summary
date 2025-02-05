import { useState } from 'react';
import axios from 'axios';

export default function Qna() {
    const [query, setQuery] = useState('');
    const [conversations, setConversations] = useState([]);
    const [username, setUsername] = useState('');
    const [repository, setRepository] = useState('');
    const [mode, setMode] = useState('dev');

    function handleSet(username, repository) {
        const url = mode === 'dev' ? `http://127.0.0.1:8000/load/${username}` : `http://127.0.0.1:8000/load/${username}/${repository}`;
        axios.get(url).then(data => console.log(data)).catch(e => console.error(e));
    };

    function handleSubmitQuery() {
        if (query === '') {
            alert('Cannot submit empty query');
            return;
        }
        
        const authOptions = {
            url: mode === 'dev' ? 'http://127.0.0.1:8000/chatdev' : 'http://127.0.0.1:8000/chatrepo',
            method: 'POST',
            headers: { 
                'Content-type': 'application/json' 
            },
            data: mode === 'dev' ? JSON.stringify({ "username": username, "prompt": query }) : JSON.stringify({ "username": username, "repository": repository, "prompt": query }),
            json: true
        };

        const newQuery = { query, response: 'Loading...' };
        setConversations((prev) => [...prev, newQuery]);

        axios(authOptions)
        .then(res => {
            console.log(res);
            setConversations((prev) =>
                prev.map((conv, index) =>
                    index === prev.length - 1 ? { ...conv, response: res.data } : conv
                )
            );
        })
        .catch(err => {
            console.log(err)
        });
        setQuery('');
    };

    function handleReset() {
        setQuery('');
        setConversations([]);
        setUsername('');
        setRepository('');
    }
    
    return (
        <div className="h-screen w-screen max-w-full max-h-full pt-[70px] flex justify-center items-end">
            <div className='fixed top-[70px] left-5 h-fit w-fit rounded-lg border-2 flex gap-2'>
                <label htmlFor="Toggle3" className="inline-flex items-center rounded cursor-pointer dark:text-gray-100">
                    <input id="Toggle3" type="checkbox" className="hidden peer" />
                    <span 
                    className="px-4 py-2 rounded-l-md text-black dark:bg-white peer-checked:dark:bg-black peer-checked:text-white" 
                    onClick={() => {
                        setMode('dev');
                        handleReset();
                    }}
                    >Dev</span>
                    <span 
                    className="px-4 py-2 rounded-r-md dark:bg-black peer-checked:dark:bg-white peer-checked:text-black"
                    onClick={() => {
                        setMode('repo');
                        handleReset();
                    }}
                    >Repo</span>
                </label>
            </div>
            <div className='sm:w-[90%] lg:w-[75%] h-[70%] scrollbar-thin scrollbar-thumb-white scrollbar-track-black overflow-y-auto mb-40 py-3 px-2 flex flex-col'>
                {conversations.map((conv, index) => (
                    <div key={index} className='w-[100%] my-2 flex flex-col'>
                        <div className='w-100%'>
                            <p className='bg-black text-white rounded-md px-3 py-2 float-right'>{conv.query}</p>
                        </div>
                        <div className='w-[100%] my-3'>
                            <p className='bg-black text-white rounded-md px-3 py-2 float-left max-w-[50%]'>{conv.response}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="h-fit sm:w-[90%] lg:w-[55%] bg-black text-white rounded-md border-white border-2 bottom-7 fixed flex flex-col justify-between py-2">
                <div className='w-[100%] min-h-5 flex items-center'>
                    <textarea
                        value={query}
                        placeholder={mode === 'dev' ? "Type in your query about the GitHub user" : "Type in your query about the GitHub repository."}
                        className="w-[100%] max-w-[100%] outline-none bg-transparent overflow-y-auto overflow-x-hidden text-md px-3 mb-2 flex flex-wrap resize-none"
                        onChange={(e) => setQuery(e.target.value)}
                    ></textarea>
                </div>
                <hr />
                <div className='w-[100%] max-w-[100%] min-h-5 py-1 px-2 flex gap-2'>
                    {mode === 'dev' ? 
                    <input
                        type="text"
                        value={username}
                        placeholder="Github username"
                        className="w-[70%] max-w-[90%] max-h-10 outline-none bg-transparent text-md border-b-[1px]"
                        onChange={(e) => setUsername(e.target.value)}
                    /> : 
                    <>
                        <input
                        type="text"
                        value={username}
                        placeholder="Github username"
                        className="w-[45%] max-w-[45%] max-h-10 outline-none bg-transparent text-md border-b-[1px]"
                        onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                        type="text"
                        value={repository}
                        placeholder="Github repository name"
                        className="w-[45%] max-w-[45%] max-h-10 outline-none bg-transparent text-md border-b-[1px]"
                        onChange={(e) => setRepository(e.target.value)}
                        />
                    </>}
                    <button 
                    className='ml-auto mt-1 bg-white text-black hover:bg-black hover:text-white border-[1.5px] border-white px-3 py-1 rounded'
                    onClick={() => {mode === 'dev' ? handleSet(username) : handleSet(username, repository)}}>
                        Set
                    </button>
                    <button
                    className='mt-1 bg-white text-black hover:bg-black hover:text-white border-[1.5px] border-white px-3 py-1 rounded'
                    onClick={() => {
                        if (query && username) handleSubmitQuery();
                        else alert('Please enter all details');
                    }}
                    >Go</button>
                </div>
            </div>
        </div>
    );
};