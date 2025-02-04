import { useState } from 'react';
import homeicon from '../../assets/home.png';
import devicon from '../../assets/code.png';
import repoicon from '../../assets/repo.png';
import qnaicon from '../../assets/qna.png';
import docsicon from '../../assets/docs.png';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    
    const navLinks = [
        {id: 1, text: 'Home', link: '/', icon: homeicon},
        {id: 2, text: 'DevInfo', link: '/devinfo', icon: devicon},
        {id: 3, text: 'RepoInfo', link: '/repoinfo', icon: repoicon},
        {id: 4, text: 'Q&A', link: '/qna', icon: qnaicon},
        {id: 5, text: 'API Docs', link: '/apidocs', icon: docsicon},
    ];

    const navLinksStyle = 'text-white text-md px-3 py-2 rounded flex items-center gap-2 transition duration-300 group';
    const navLinksStyleMobile = 'text-white text-lg  flex items-center gap-2 transition duration-500 rounded px-1 py-1 group';
    
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
            <nav className='fixed top-0 left-0 w-full bg-black px-5 py-3 font-poppins z-50'>
                <div className='flex items-center justify-center'>
                    <div className='md:hidden fixed top-4 left-5'>
                        <button className='text-white' onClick={() => setIsOpen(!isOpen)} >
                            <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' className='w-8 h-8'>
                                <path d='M4 6h16M4 12h16M4 18h16'></path>
                            </svg>
                        </button>
                    </div>
                    <ul className='hidden md:flex space-x-5 mr-3'>
                        {navList}
                    </ul>
                </div>
                {isOpen ? 
                (<ul className='flex-col md:hidden w-[90%] p-2 rounded border-[1px] fixed top-12 font-poppins bg-black z-50'>
                    {navList}
                </ul>) : null}
            </nav>
        </>
    );
};