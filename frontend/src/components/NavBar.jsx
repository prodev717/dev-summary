import { useState } from 'react';
import devicon from '../assets/code.png';
import repoicon from '../assets/repo.png';
import qnaicon from '../assets/qna.png';
import docsicon from '../assets/docs.png';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className='bg-gray-800 p-5 font-mono'>
            <div className='flex items-center justify-between'>
                <a href='/'>
                    <span className='text-white text-xl font-semibold'>git2know</span>
                </a>
                <div className='md:hidden'>
                    <button 
                    className='text-white'
                    onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                            fill='none'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                            className='w-8 h-8'
                        >
                            <path d='M4 6h16M4 12h16M4 18h16'></path>
                        </svg>
                    </button>
                </div>
                <ul className='hidden md:flex space-x-7'>
                    <li>
                        <a href='#' className='text-white text-md px-4 py-2 hover:bg-slate-600 rounded flex items-center gap-2 transition duration-300'>
                            <img src={devicon} alt="" className='h-5'/>    
                            DevInfo
                        </a>
                    </li>
                    <li>
                        <a href='#' className='text-white text-md px-4 py-2 hover:bg-slate-600 rounded flex items-center gap-2 transition duration-300'>
                            <img src={repoicon} alt="" className='h-5'/>  
                            RepoInfo
                        </a>
                    </li>
                    <li>
                        <a href='#' className='text-white text-md px-4 py-2 hover:bg-slate-600 rounded flex items-center gap-2 transition duration-300'>
                            <img src={qnaicon} alt="" className='h-5'/> 
                            Q&A
                        </a>
                    </li>
                    <li>
                        <a href='#' className='text-white text-md px-4 py-2 hover:bg-slate-600 rounded flex items-center gap-2 transition duration-300'>
                            <img src={docsicon} alt="" className='h-5'/> 
                            API Docs
                        </a>
                    </li>
                </ul>
            </div>
            {
                isOpen ? (
                <ul className='flex-col md:hidden'>
                    <li className='py-2 border-b-[1.5px] border-blue-400'>
                        <a href='#' className='text-white text-lg hover:bg-slate-600 flex items-center justify-center gap-2 transition duration-500 rounded'>
                            <img src={devicon} alt="" className='h-5'/> 
                            DevInfo
                        </a>
                    </li>
                    <li className='py-2 border-b-[1.5px] border-blue-400'>
                        <a href='#' className='text-white text-lg hover:bg-slate-600 flex items-center justify-center gap-2 transition duration-500 rounded'>
                            <img src={repoicon} alt="" className='h-5'/> 
                            RepoInfo
                        </a>
                    </li>
                    <li className='py-2 border-b-[1.5px] border-blue-400'>
                        <a href='#' className='text-white text-lg hover:bg-slate-600 flex items-center justify-center gap-2 transition duration-500 rounded'>
                            <img src={qnaicon} alt="" className='h-5'/> 
                            Q&A
                        </a>
                    </li>
                    <li className='py-2 border-b-[1.5px] border-blue-400'>
                        <a href='#' className='text-white text-lg hover:bg-slate-600 flex items-center justify-center gap-2 transition duration-500 rounded'>
                            <img src={docsicon} alt="" className='h-5'/> 
                            API Docs
                        </a>
                    </li>
                </ul>
                ) : null
            }
        </nav>
    );
};