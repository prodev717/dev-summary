import { useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import githubIcon from '../assets/github.png';
import devIcon from '../assets/code.png';
import repoIcon from '../assets/repo.png';
import qnaIcon from '../assets/qna.png';
import { FaInstagram } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';


gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
    const devInfoRef = useRef(null);
    const repoInfoRef = useRef(null);
    const qnaRef = useRef(null);

    useGSAP(() => {
        [devInfoRef, repoInfoRef, qnaRef].forEach((ref) => {
            gsap.fromTo(
                ref.current,
                { opacity: 0, scale: 0.8 }, 
                { 
                    opacity: 1, 
                    scale: 1, 
                    duration: 1.2, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top 80%",
                        end: "top 30%",
                        scrub: true,
                    },
                }
            );
        });
    }, [devInfoRef, repoInfoRef]);

    function handleClick() {
        const element = document.getElementById('demo1');
        element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }

    return (
        <div className='h-screen w-screen max-w-full max-h-full'>
            <section id='hero' className='w-full h-full flex flex-wrap justify-center items-center py-5 sm:py-1 text-white'>
                <div className='sm:w-[90%] lg:w-[60%] flex justify-center items-center sm:flex-col md:flex-row sm:justify-center'>
                    <div className='flex flex-wrap mx-5 lg:ml-8 sm:my-5'>
                        <h1 className='text-center text-balance md:text-[69px] sm:text-4xl lg:text-6xl font-poppins font-semibold w-[100%]'>    
                            <TypeAnimation
                                sequence={[
                                    'Explore GitHub Like Never Before',
                                    1000
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </h1>
                        <p id='hero-desc' className='w-[100%] sm:text-md md:text-xl text-center text-balance font-poppins font-normal my-5 flex flex-wrap motion-delay-2000 motion-opacity-in-0 motion-translate-y-in-100'>
                            Discover profiles, unlock repo insights, ask questions, and explore API docs—all in one place!
                        </p>
                        <button 
                        className="mx-auto group relative inline-block overflow-hidden rounded border-4 border-double border-white px-5 py-2 font-medium text-white motion-delay-[2.5s] motion-opacity-in-0 -motion-translate-x-in-100 motion-blur-in-md"
                        onClick={handleClick}
                        >
                            <span className="absolute left-0 top-0 mb-0 flex h-full w-0 translate-x-0 transform bg-white opacity-90 transition-all duration-300 ease-out group-hover:w-full"></span>
                            <span className="relative group-hover:text-black">How It Works</span>
                        </button>
                    </div>
                </div>
            </section>
            <section id='demo1' ref={devInfoRef} className='w-full h-full flex flex-col justify-center items-center'>
                <h1 className='text-4xl text-center text-white font-poppins font-semibold sm:mb-12 lg:mb-20'>DevInfo</h1>
                <div className='flex sm:flex-col-reverse lg:flex-row w-[90%] items-center justify-center gap-10'>
                    <p id='devinfotext' className='sm:text-lg lg:text-xl text-white font-poppins text-balance sm:w-[97%] lg:w-[50%]'>✨ Discover GitHub profiles like never before! Simply enter a GitHub username, and our intelligent system gets to work. 🔍 We fetch real-time user data via the GitHub API, analyze it with the power of Gemini AI 🤖, and generate a concise yet insightful summary. 🚀 Whether you're exploring developers, researching contributors, or just curious, get a smart, AI-driven overview in seconds! ⏳ {'[Note: Data is taken from the README.md file only]'}</p>
                    <div className='sm:w-[97%] lg:w-[50%] flex gap-5 justify-center'>
                        <img src={githubIcon} alt="GitHub Icon" className='sm:w-24 lg:w-32'/>
                        <a className='motion-opacity-in-0 -motion-translate-x-in-100' href='/devinfo'>
                            <img src={devIcon} alt="" className='sm:w-8 sm:h-8 lg:w-10 lg:h-10'/>
                        </a>
                    </div>
                </div>
            </section>
            <section ref={repoInfoRef} className='w-full h-full flex flex-col justify-center items-center'>
                <h1 className='text-4xl text-center text-white font-poppins font-semibold sm:mb-12 lg:mb-20'>RepoInfo</h1>
                <div className='flex sm:flex-col lg:flex-row w-[90%] items-center justify-center gap-10'>
                    <div className='sm:w-[97%] lg:w-[50%] flex gap-5 justify-center'>
                        <img src={githubIcon} alt="GitHub Icon" className='sm:w-24 lg:w-32'/>
                        <a className='motion-opacity-in-0 -motion-translate-x-in-100' href='/repoinfo'>
                            <img src={repoIcon} alt="" className='sm:w-8 sm:h-8 lg:w-10 lg:h-10'/>
                        </a>
                    </div>
                    <p id='repoinfotext' className='sm:text-lg lg:text-xl text-white font-poppins text-balance sm:w-[97%] lg:w-[50%]'>🚀 Unlock powerful insights with AI! Simply enter a GitHub username and a repository name, and let our system do the rest. 🔍 We fetch detailed repository data using the GitHub API, analyze it with Gemini AI 🤖, and generate a concise, insightful summary. Get a smart, AI-powered breakdown of any repository in seconds! ⏳ {'[Note: Data is taken from the README.md file only]'}</p>
                </div>
            </section>
            <section ref={qnaRef} className='w-full h-full flex flex-col justify-center items-center'>
                <h1 className='text-4xl text-center text-white font-poppins font-semibold sm:mb-12 lg:mb-20'>Q&A</h1>
                <div className='flex sm:flex-col-reverse lg:flex-row w-[90%] items-center justify-center gap-10'>
                    <p id='repoinfotext' className='sm:text-lg lg:text-xl text-white font-poppins text-balance sm:w-[97%] lg:w-[50%]'>🤖 Chat with AI about any GitHub profile or repository! Simply enter a GitHub username—or choose a specific repository—and ask anything. 🚀 Our Gemini AI-powered tool fetches real-time data, analyzes it, and provides instant answers, helping you explore profiles, understand code, and clarify doubts effortlessly. 🔍 Get AI-driven insights in seconds! {'[Note: Data is taken from the README.md file only]'}</p>
                    <div className='sm:w-[97%] lg:w-[50%] flex gap-5 justify-center'>
                        <img src={githubIcon} alt="GitHub Icon" className='sm:w-24 lg:w-32'/>
                        <a className='motion-opacity-in-0 -motion-translate-x-in-100' href='/qna'>
                            <img src={qnaIcon} alt="" className='sm:w-8 sm:h-8 lg:w-10 lg:h-10'/>
                        </a>
                    </div>
                </div>
            </section>
            <footer className='h-28 bg-black text-white py-3 flex flex-col justify-between items-center'>
                <p className='font-poppins text-base sm:text-center lg:ml-3'>Built with <span className='text-xl'>&#128153;</span> by TeamX</p>
                <div className='h-fit flex gap-3'>
                    <a href='https://www.instagram.com/teamx.vit/' target='blank'>
                        <FaInstagram className='w-10 h-10'/>
                    </a>
                    <a href='https://github.com/TeamXVit' target='blank'>
                        <FaGithub className='w-9 h-9'/>
                    </a>
                </div>
            </footer>
        </div>
    );
};