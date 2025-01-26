import { useState } from 'react';
import send from '../assets/send.png'

export default function Qna() {
    const [query, setQuery] = useState('');
    const [allqueries, setAllQueries] = useState([]);
    const [response, setResponse] = useState('');
    const [username, setUsername] = useState('');
    const [repository, setRepository] = useState('');
    const [mode, setMode] = useState('dev');

    const queryStyles = 'bg-[#5C5470] max-w-[50%] text-[#FAF0E6] rounded-md px-3 py-2 float-right'
    const responseStyles = 'bg-[#5C5470] max-w-[50%] text-[#FAF0E6] rounded-md px-3 py-2 float-left'

    const handleMode = () => {

    }

    const handleSubmitQuery = (e) => {
        if (query === '') {
            alert('Cannot submit empty query');
            return;
        }
        e.preventDefault();
        setAllQueries((prevQueries) => [...prevQueries, query]);
        setQuery('');
    };

    const handleResponse = () => {
        fetch()
        .then((res) => res.json())
        .then((data) => {
            setResponse(data);
            
        })
    };
    

    return (
        <div className="h-screen w-screen max-w-full max-h-full pt-[70px] flex justify-center items-end">
            <div className='fixed top-[70px] left-5 h-10 w-fit rounded-md border-2 flex gap-2'>
                <button 
                className='w-[50%] text-[#FAF0E6] px-2 text-center'
                onClick={() => {
                    setMode('dev')
                }}
                >Dev</button>
                <button 
                className='w-[50%[ bg-[#FAF0E6] text-[#5C5470] px-2 text-center'
                onClick={() => {
                    setMode('repo')
                }}
                >Repo</button>
            </div>
            <div className='sm:w-[90%] lg:w-[55%] h-fit mt-10 mb-32 py-3 flex flex-col'>
                {allqueries.map((query, index) => {
                    return (
                        <div key={index} className='w-[100%] my-2'>
                            <div className={queryStyles}>
                                <p>{query}</p>
                            </div>
                    </div>)
                })} 
            </div>
            <div className="h-fit sm:w-[90%] lg:w-[55%] bg-[#5C5470] text-[#FAF0E6] rounded-md border-[#FAF0E6] border-2 bottom-7 fixed flex flex-col justify-between py-2">
                <div className='w-[100%] min-h-5 flex items-center'>
                    <textarea
                        value={query}
                        placeholder={mode === 'dev' ? "Type in your query about the GitHub user" : "Type in your query about the GitHub repository."}
                        className="w-[100%] max-w-[95%] outline-none bg-transparent overflow-y-auto overflow-x-hidden text-md px-3 mb-2 flex flex-wrap resize-none"
                        onChange={(e) => setQuery(e.target.value)}
                    ></textarea>
                </div>
                <hr />
                <div className='w-[100%] max-w-[100%] min-h-5 py-2 px-2 flex justify-center'>
                    <input
                        type="text"
                        value={username}
                        placeholder={mode === 'dev' ? "Enter the GitHub user's URL" : "Enter the Github repository's URL"}
                        className="w-[95%] max-w-[95%] max-h-10 outline-none bg-transparent text-md"
                        onChange={(e) => {
                            if (mode === 'dev') setUsername(e.target.value);
                            else if (mode === 'repo') setRepository(e.target.value);
                        }}
                    />
                    <a href="#" 
                    className='flex items-center' 
                    onClick={() => {
                        if (query && username) handleSubmitQuery();
                        else alert('Please enter all details');
                    }}>
                        <img src={send} alt="" className='h-5 w-6'/>
                    </a>
                </div>
            </div>
        </div>
    );
};