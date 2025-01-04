import { useState } from 'react';
import devicon from '../../assets/code.png';
import repoicon from '../../assets/repo.png';
import qnaicon from '../../assets/qna.png';
import docsicon from '../../assets/docs.png';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    
    const navLinks = [
        {id: 1,text: 'DevInfo', link: '/devinfo', icon: devicon},
        {id: 2,text: 'RepoInfo', link: '#', icon: repoicon},
        {id: 3,text: 'Q&A', link: '#', icon: qnaicon},
        {id: 4,text: 'API Docs', link: '#', icon: docsicon},
    ];

    const navLinksStyle = 'text-white text-md px-3 py-2 hover:bg-slate-600 rounded flex items-center gap-2 transition duration-300';
    const navLinksStyleMobile = 'text-white text-lg hover:bg-slate-600 flex items-center gap-2 transition duration-500 rounded px-1 py-1';
    const navLinksContainerStyleMobile = 'flex-col md:hidden sm:w-[50%] p-3 rounded shadow-white shadow-md absolute right-4 font-poppins bg-black z-50';

    const navList = navLinks.map((navLink) => {
        return (
        <li key={navLink.id}>
            <a href={navLink.link} className={navLinksStyle}>
                <img src={navLink.icon} alt="" className='h-5'/>
                {navLink.text}
            </a>
        </li>
        );
    });

    const navListMobile = navLinks.map((navLink) => {
        return (
        <li key={navLink.id} className='py-2'>
            <a href={navLink.link} className={navLinksStyleMobile}>
                <img src={navLink.icon} alt="" className='h-5'/> 
                {navLink.text}
            </a>
        </li>
        );
    });
    

    return (
        <>
        <nav className='bg-black p-5 font-poppins border-b-[1px] border-b-white'>
            <div className='flex items-center justify-between'>
                <a href='/'>
                    <span className='text-white text-2xl font-semibold'>git2know</span>
                </a>
                <div className='md:hidden'>
                    <button className='text-white' onClick={() => setIsOpen(!isOpen)} >
                        <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' className='w-8 h-8'>
                            <path d='M4 6h16M4 12h16M4 18h16'></path>
                        </svg>
                    </button>
                </div>
                <ul className='hidden md:flex space-x-7'>
                    {navList}
                </ul>
            </div>
        </nav>
        {isOpen ? 
        (<ul className={navLinksContainerStyleMobile}>
            {navListMobile}
        </ul>) : null}
        </>
    );
};