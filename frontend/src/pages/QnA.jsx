import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { ToastContainer, toast } from 'react-toastify';
import { FaChevronCircleUp } from 'react-icons/fa';
import { GrPowerReset } from 'react-icons/gr';
import { MdArrowRight } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import backend from '../components/common/Backend';

export default function Qna() {
    const [query, setQuery] = useState('');
    const [conversations, setConversations] = useState([]);
    const [username, setUsername] = useState('');
    const [repository, setRepository] = useState('');
    const [mode, setMode] = useState('Dev');
    const [open, setOpen] = useState(false);
    const [modeOpen, setModeOpen] = useState(false);
    const [UserNameHolder, setUserNameHolder] = useState('username');
    const [UserRepoHolder, setUserRepoHolder] = useState('username/repository');
    const [loading, setLoading] = useState(false);

    function handleSet(username, repository) {
        const endpoint = mode === 'Dev' ? username : `${username}/${repository}`;
        const setToast = (mode === 'Dev') ? toast.loading('Setting username', { closeButton: true }) : toast.loading('Setting username & repository', { closeButton: true });
        axios.get(`${backend}/load/${endpoint}`)
        .then((data) => {
            if (data.statusText === "OK") {
                setLoading(false);
                if (mode === 'Dev') {
                    toast.update(setToast, { render: "Username set successfully", type: "success", isLoading: false, closeButton: true, autoClose: 500 });
                    setUserNameHolder(username);
                }
                else  {
                    toast.update(setToast, { render: "Username & Repository set successfully", type: "success", isLoading: false, closeButton: true, autoClose: 500 });
                    setUserRepoHolder(`${username}/${repository}`);
                };
            }  
        })
        .catch((e) => {
            setLoading(false);
            if (mode === 'Dev') {
                toast.update(setToast, { render: "Something went wrong", type: "error", isLoading: false, closeButton: true, autoClose: 2000 });
                setUserNameHolder('username');
            }
            else if (mode === 'Repo') {
                toast.update(setToast, { render: "Something went wrong", type: "error", isLoading: false, closeButton: true, autoClose: 2000 });
                setUserRepoHolder('username/repository');
            }
        });
    };

    function handleSubmitQuery() {
        if (query === '') {
            alert('Cannot submit empty query');
            return;
        }
        
        const authOptions = {
            url: mode === 'Dev' ? 'http://127.0.0.1:8000/chatdev' : 'http://127.0.0.1:8000/chatrepo',
            method: 'POST',
            headers: { 
                'Content-type': 'application/json' 
            },
            data: mode === 'Dev' ? JSON.stringify({ "username": username, "prompt": query }) : JSON.stringify({ "username": username, "repository": repository, "prompt": query }),
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
        mode === 'Dev' ? setUserNameHolder('username') : setUserRepoHolder('username/repository');
        setLoading(false);
    };
    
    function handleSetVariables() {
        if (mode === 'Dev') {
            setUserNameHolder('Fetching...');
            handleSet(username);
        } 
        else if (mode === 'Repo') {
            setUserRepoHolder('Fetching');
            handleSet(username, repository);
        }
        setLoading(true);
    };

    return (
        <div className="h-screen w-screen max-w-full max-h-full pt-[70px] flex justify-center items-end bg-[#282929] bg-opacity-70">
            <div className='fixed sm:top-6 z-50 lg:top-auto lg:bottom-[30px] sm:right-3 lg:left-3 h-fit w-fit rounded-xl border-2 flex sm:flex-col lg:flex-col-reverse bg-[#4f4f4f]'>
                <ToastContainer style={{ top: '4em' }} autoClose={1000}/>
                <button className='h-full py-1 text-white flex' onClick={() => setModeOpen(!modeOpen)}>
                    <p className='text-white my-auto px-2'>{mode}</p>
                    <MdArrowRight className={'h-8 w-8 sm:rotate-90 lg:-rotate-90'} />
                </button> 
                {modeOpen ?
                <div className='flex flex-col gap-1 text-white '>
                    <button 
                    className='text-white bg-[#4f4f4f] hover:bg-white hover:text-[#4f4f4f] py-1 sm:rounded-none lg:rounded-t-lg'
                    onClick={() => {
                        setMode('Dev'); 
                        setModeOpen(!modeOpen);
                        handleReset();
                    }}
                    >Dev</button>
                    <button 
                    className='text-white bg-[#4f4f4f] hover:bg-white hover:text-[#4f4f4f] py-1 sm:rounded-b-lg lg:rounded-none'
                    onClick={() => {
                        setMode('Repo'); 
                        setModeOpen(!modeOpen);
                        handleReset();
                    }}
                    >Repo</button>
                </div> : null}
            </div>
            <div className='w-[100%] h-[80%] scrollbar-thin scrollbar-thumb-white scrollbar-thumb-rounded-full scrollbar-track-transparent overflow-x-hidden overflow-y-auto mb-32 py-5 px-2 flex flex-col items-center'>
                {conversations.length > 0 ? 
                <div className='sm:w-[90%] lg:w-[55%]'>    
                    {conversations.map((conv, index) => (
                        <div key={index} className='w-[100%] my-2 flex flex-col'>
                            <div className='w-100%'>
                                <p className='bg-[#494a49] text-white sm:text-md lg:text-lg rounded-full px-3 py-2 float-right'>{conv.query}</p>
                            </div>
                            <div className='w-[100%] prose sm:prose-lg lg:prose-2xl sm:prose-h1:text-2xl lg:prose-h1:text-4xl prose-h1:text-white sm:prose-p:text-md lg:prose-p:text-lg prose-strong:text-white prose-ul:list-disc prose-ol:list-item prose-ul:text-white prose-code:text-white prose-a:text-[#2256c7] prose-pre:bg-[#494a49]'>
                                <ReactMarkdown className='text-white sm:text-md lg:text-lg px-3 py-2 float-left max-w-[100%]'>{conv.response}</ReactMarkdown>
                            </div>
                        </div>
                    ))}
                </div> : <h1 className='my-auto text-4xl font-semibold font-noto-sans bg-gradient-to-r from-[#8EC5FC]  to-[#E0C3FC] inline-block text-transparent bg-clip-text'>Hello There!</h1>}
            </div>
            <div className="h-fit sm:w-[90%] lg:w-[55%] bg-[#4f4f4f] text-white rounded-3xl border-white border-[1.3px] bottom-7 fixed flex flex-col justify-between py-2">
                <div className='w-[100%] h-12 max-h-16 flex items-center'>
                    <textarea
                        value={query}
                        placeholder={mode === 'Dev' ? "Type in your query about the GitHub user" : "Type in your query about the GitHub repository."}
                        className="w-[100%] max-w-[100%] outline-none bg-transparent overflow-y-auto overflow-x-hidden text-md px-3 py-2 flex flex-wrap resize-none"
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSubmitQuery()
                            }
                        }}
                    ></textarea>
                </div>
                <div className='w-[100%] max-w-[100%] min-h-5 py-1 px-2 flex justify-between transition duration-500'>
                    {mode === 'Dev' ? 
                    <div id={mode} className='w-fit flex gap-2 border-white border-2 rounded-3xl sm:mt-2 lg:mt-0'>
                        {open ? null : <p className='px-2 py-1'>{UserNameHolder}</p>}
                        {open ? 
                        <input
                            id="username-inp"
                            type="text"
                            value={username}
                            placeholder="Username"
                            className="sm:w-32 lg:w-36 max-w-[150px] max-h-10 outline-none bg-transparent text-md text-center"
                            onChange={(e) => setUsername(e.target.value)}
                        /> : null}
                        <button onClick={() => setOpen(!open)}>
                            {(open && username && !loading) || (username && (UserNameHolder !== 'Username' && UserNameHolder !== 'Setting') && !loading) ? 
                            <TiTick 
                                id='tick'
                                className='w-8 h-8 rounded-full bg-white text-[#4f4f4f]'
                                onClick={handleSetVariables}
                            /> 
                                : 
                            (loading ? null : <MdArrowRight className={`w-8 h-8 rounded-full bg-white text-[#4f4f4f] ${open ? 'rotate-180' : null}`}/>)}
                            {loading ? 
                            <div
                            className="inline-block h-6 w-6 mx-1 my-auto animate-spin rounded-full border-4 border-solid border-white border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                                <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Loading...</span>
                            </div>: null}
                        </button>
                    </div>
                    : 
                    <div id={mode} className='w-fit flex flex-row gap-2 border-white border-2 rounded-3xl sm:mt-2 lg:mt-0'>
                        {open ? null : <p className='px-2 py-1'>{UserRepoHolder}</p>}
                        {open ? 
                        <div className='flex items-center'>
                            <input
                            type="text"
                            value={username}
                            placeholder="Username"
                            className="sm:w-24 lg:w-36 max-w-[150px] max-h-10 outline-none bg-transparent text-md text-center"
                            onChange={(e) => setUsername(e.target.value)}
                            />
                            /
                            <input
                            type="text"
                            value={repository}
                            placeholder="Repository"
                            className="sm:w-24 lg:w-40 lg:max-w-[170px] max-h-10 outline-none bg-transparent text-md text-center"
                            onChange={(e) => setRepository(e.target.value)}
                            />
                        </div> : null}
                        <button 
                        className='flex justify-center'
                        onClick={() => setOpen(!open)}>
                            {(open && username && repository && !loading) || (username && (UserNameHolder !== 'Username' && UserNameHolder !== 'Setting') && !loading) ? 
                            <TiTick 
                                id='tick'
                                className='w-8 h-8 rounded-full bg-white text-[#4f4f4f]'
                                onClick={handleSetVariables}
                            /> : 
                            (loading ? null : <MdArrowRight className={`w-8 h-8 rounded-full bg-white text-[#4f4f4f] ${open ? 'rotate-180' : null}`}/>)}
                            {loading ? 
                            <div
                            className="inline-block h-6 w-6 my-1 animate-spin rounded-full border-4 border-solid border-white border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                                <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Loading...</span>
                            </div>: null}
                        </button>
                    </div>}
                    <div className='flex sm:gap-[2px] lg:gap-2 sm:mt-2 lg:mt-0'>
                        <button>
                            <GrPowerReset 
                            className='h-8 w-8 hover:rotate-180 transition duration-500'
                            onClick={handleReset}
                            />
                        </button>
                        <button>
                            <FaChevronCircleUp 
                            className='h-8 w-8 hover:bg-white hover:text-[#4f4f4f] transition duration-500 rounded-full'
                            onClick={handleSubmitQuery}
                            disabled={(mode === 'Dev') ? (!username || !query) : (!username && !repository) && !query}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};