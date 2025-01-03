import { useState } from 'react';
import devicon from '../assets/code.png';
import repoicon from '../assets/repo.png';
import qnaicon from '../assets/qna.png';
import docsicon from '../assets/docs.png';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <nav className='bg-black p-5 font-poppins'>
            <div className='flex items-center justify-between'>
                <a href='/'>
                    <span className='text-white text-2xl font-semibold'>git2know</span>
                </a>
                <div className='md:hidden'>
                    <button 
                    className='text-white'
                    onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' className='w-8 h-8'>
                            <path d='M4 6h16M4 12h16M4 18h16'></path>
                        </svg>
                    </button>
                </div>
                <ul className='hidden md:flex space-x-7'>
                    <li>
                        <a href='#' className='text-white text-md px-3 py-2 hover:bg-slate-600 rounded flex items-center gap-2 transition duration-300'>
                            <img src={devicon} alt="" className='h-5'/>    
                            DevInfo
                        </a>
                    </li>
                    <li>
                        <a href='#' className='text-white text-md px-3 py-2 hover:bg-slate-600 rounded flex items-center gap-2 transition duration-300'>
                            <img src={repoicon} alt="" className='h-5'/>  
                            RepoInfo
                        </a>
                    </li>
                    <li>
                        <a href='#' className='text-white text-md px-3 py-2 hover:bg-slate-600 rounded flex items-center gap-2 transition duration-300'>
                            <img src={qnaicon} alt="" className='h-5'/> 
                            Q&A
                        </a>
                    </li>
                    <li>
                        <a href='#' className='text-white text-md px-3 py-2 hover:bg-slate-600 rounded flex items-center gap-2 transition duration-300'>
                            <img src={docsicon} alt="" className='h-5'/> 
                            API Docs
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        {
            isOpen ? 
            (<ul className='flex-col md:hidden sm:w-[30%] w-[50%] p-3 bg-black rounded shadow-white shadow-md absolute right-4 font-poppins'>
                <li className='py-2'>
                    <a href='#' className='text-white text-lg hover:bg-slate-600 flex items-center gap-2 transition duration-500 rounded px-1 py-1'>
                        <img src={devicon} alt="" className='h-5'/> 
                        DevInfo
                    </a>
                </li>
                <li className='py-2'>
                    <a href='#' className='text-white text-lg hover:bg-slate-600 flex items-center gap-2 transition duration-500 rounded px-1 py-1'>
                        <img src={repoicon} alt="" className='h-5'/> 
                        RepoInfo
                    </a>
                </li>
                <li className='py-2'>
                    <a href='#' className='text-white text-lg hover:bg-slate-600 flex items-center gap-2 transition duration-500 rounded px-1 py-1'>
                        <img src={qnaicon} alt="" className='h-5'/> 
                        Q&A
                    </a>
                </li>
                <li className='py-2'>
                    <a href='#' className='text-white text-lg hover:bg-slate-600 flex items-center gap-2 transition duration-500 rounded px-1 py-1'>
                        <img src={docsicon} alt="" className='h-5'/> 
                        API Docs
                    </a>
                </li>
            </ul>) : null
        }
        </>
    );
};