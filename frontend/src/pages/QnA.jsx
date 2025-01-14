import { useState } from 'react';
import send from '../assets/send.png'

export default function Qna() {
    const [query, setQuery] = useState('');
    const [submittedQuery, setSubmittedQuery] = useState('');
    const [allqueries, setAllQueries] = useState([]);
    const [response, setResponse] = useState('');
    const [username, setUsername] = useState('');
    const [repository, setRepository] = useState('');

    const queryStyles = 'bg-[#5C5470] max-w-[50%] text-[#FAF0E6] rounded-md px-3 py-2 float-right'
    const responseStyles = 'bg-[#5C5470] max-w-[50%] text-[#FAF0E6] rounded-md px-3 py-2 float-left'

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
    }

    return (
        <div className="h-screen w-screen max-w-full max-h-full pt-[70px] flex justify-center items-end">
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
                        placeholder="Enter your query about the Github user"
                        className="w-[100%] max-w-[95%] outline-none bg-transparent overflow-y-auto overflow-x-hidden text-md px-2 flex flex-wrap resize-none"
                        onChange={(e) => setQuery(e.target.value)}
                    ></textarea>
                </div>
                <hr />
                <div className='w-[100%] max-w-[100%] min-h-5 py-2 px-2 flex justify-center'>
                    <input
                        type="text"
                        value={username}
                        placeholder="Enter the URl of the Github username"
                        className="w-[95%] max-w-[95%] max-h-10 outline-none bg-transparent text-md"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <a href="" className='flex items-center' onClick={handleSubmitQuery}>
                        <img src={send} alt="" className='h-5 w-6'/>
                    </a>
                </div>
            </div>
        </div>
    );
};