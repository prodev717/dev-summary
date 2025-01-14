import { useState } from 'react';
import devicon from '../../assets/code.png';
import repoicon from '../../assets/repo.png';
import qnaicon from '../../assets/qna.png';
import docsicon from '../../assets/docs.png';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    
    const navLinks = [
        {id: 1,text: 'DevInfo', link: '/devinfo', icon: devicon},
        {id: 2,text: 'RepoInfo', link: '/repoinfo', icon: repoicon},
        {id: 3,text: 'Q&A', link: '#', icon: qnaicon},
        {id: 4,text: 'API Docs', link: '/apidocs', icon: docsicon},
    ];

    const navLinksStyle = 'text-[#FAF0E6] text-md px-3 py-2 hover:bg-slate-600 rounded flex items-center gap-2 transition duration-300';
    const navLinksStyleMobile = 'text-[#FAF0E6] text-lg hover:bg-slate-600 flex items-center gap-2 transition duration-500 rounded px-1 py-1';
    const navLinksContainerStyleMobile = 'flex-col md:hidden sm:w-[50%] p-2 rounded border-[1px] absolute top-14 right-4 font-poppins bg-[#352F44] z-50';

    const navList = navLinks.map((navLink) => {
        return (
        <li key={navLink.id} className={isOpen ? 'py-2' : ''}>
            <a href={navLink.link} className={isOpen ? navLinksStyleMobile : navLinksStyle}>
                <img src={navLink.icon} alt="" className='h-5'/>
                {navLink.text}
            </a>
        </li>
        );
    });
    
    return (
        <>
            <nav className='fixed top-0 left-0 w-full bg-[#352F44] p-5 font-poppins border-b-[1px] border-b-white z-50'>
                <div className='flex items-center justify-between'>
                    <a href='/'>
                        <span className='text-[#FAF0E6] text-2xl font-semibold ml-3'>Git2Know</span>
                    </a>
                    <div className='md:hidden mr-3'>
                        <button className='text-[#FAF0E6]' onClick={() => setIsOpen(!isOpen)} >
                            <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' className='w-8 h-8'>
                                <path d='M4 6h16M4 12h16M4 18h16'></path>
                            </svg>
                        </button>
                    </div>
                    <ul className='hidden md:flex space-x-3 mr-3'>
                        {navList}
                    </ul>
                </div>
            </nav>
            {isOpen ? 
            (<ul className={navLinksContainerStyleMobile}>
                {navList}
            </ul>) : null}
        </>
    );
};