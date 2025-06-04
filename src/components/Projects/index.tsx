import { motion } from 'motion/react';
import { forwardRef } from 'react';

import { ProjectsData } from './constants';

import type React from 'react';
import { useEffect, useRef } from 'react';
import Github from '../../assets/github.svg?react';
import Live from '../../assets/live.svg?react';

interface LinkInterface {
    github?: string | null;
    live?: string | null;
}

interface ProjectInterface {
    id: number;
    title: string;
    links: LinkInterface;
    description: string;
    tools: string[];
    images: string[];
    design?: string | null;
    website?: string | null;
}

interface CardInterface {
    project: ProjectInterface
}

interface AnchorInterface {
    title: string;
    link: string;
    icon: React.ReactNode;
}

const Anchor = ({ title, link, icon }: AnchorInterface) => {
    const bgMotion = {
        rest: { ease: 'easeOut', duration: 0.3, type: 'tween' },
        hover: {
            left: 0,
            transition: {
                duration: 0.3,
                type: 'tween',
                ease: 'easeIn'
            }
        }
    };

    return (
        <motion.a
            initial='rest'
            whileHover='hover'
            animate='rest'
            className={
                `
                    px-4 py-6 h-[30px] w-full  rounded-3xl flex justify-between items-center text-black sm:text-text 
                    hover:text-black transition-all duration-300 ease-in-out overflow-hidden relative
                `
            }
            target='_blank'
            rel='noopener noreferrer'
            href={link}
        >
            <p className='z-[3] relative'>{title}</p>
            {icon}
            <motion.div
                variants={bgMotion}
                className='bg-accent absolute top-0 left-0 sm:left-full w-full h-full z-[2]'
            ></motion.div>
        </motion.a>
    );
};

const Card = ({ project }: CardInterface) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const left = entry.boundingClientRect.left;

                if (backgroundRef.current) {
                    backgroundRef.current.style.opacity = left < 0 ? '0.6' : '1';
                }
            },
            {
                threshold: Array.from({ length: 11 }, (_, i) => i * 0.1)
            }
        );

        const mobileObserver = new IntersectionObserver(
            ([entry]) => {
                const top = entry.boundingClientRect.top;

                if (backgroundRef.current) {
                    backgroundRef.current.style.opacity = top < 0 ? '0.6' : '1';
                }
            },
            {
                threshold: Array.from({ length: 11 }, (_, i) => i * 0.1)
            }
        );

        if (containerRef.current && window.innerWidth > 640) {
            observer.observe(containerRef.current);
        }

        if (containerRef.current && window.innerWidth <= 640) {
            mobileObserver.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={
                `
                    h-max sm:h-full min-h-screen sm:min-h-auto max-h-max sm:max-h-screen sm:min-w-[1200px] 
                    lg:min-w-auto w-screen flex flex-col sm:flex-row justify-start items-center relative overflow-hidden
                `
            }
        >
            <div className='sticky left-0 top-0 overflow-hidden w-full sm:w-1/5 h-[20vh] sm:h-full z-[1]'>
                <img
                    ref={backgroundRef}
                    className='absolute top-0 left-0 object-cover w-full h-full transition-all duration-200 ease-in-out'
                    src={project.images[0]}
                    alt='image'
                />
            </div>

            <div
                className={
                    `
                        w-full sm:w-4/5 h-4/5 sm:h-full px-4 sm:px-20 py-10 sm:py-0 flex flex-col sm:flex-row 
                        justify-center items-center overflow-y-hidden
                    `
                }
            >
                <div className='flex flex-col h-3/4 w-full sm:w-1/4 p-2 gap-4'>
                    <h1 className='text-white text-4xl xl:text-5xl text-wrap z-[3] font-semibold'>{project.title}</h1>

                    <div className='w-3/5 lg:w-1/2 flex flex-col justify-between relative gap-4'>
                        {project.links.github &&
                            <Anchor
                                title='Github'
                                link={project.links.github}
                                icon={<Github className='h-[25px] w-[25px] z-[3]' />}
                            />
                        }
                        {project?.links?.live &&
                            <Anchor
                                title='Live'
                                link={project.links.live}
                                icon={<Live className='h-[25px] w-[25px] z-[3]' />}
                            />
                        }
                    </div>
                </div>

                <div
                    className={
                        `
                            w-full sm:w-3/4 h-full flex flex-col items-center gap-4 text-text pt-10 sm:pt-20 px-2 
                            sm:px-6 py-2 sm:py-4 z-[3]
                        `
                    }
                >
                    <p className='w-11/12 sm:w-4/5'>{project.description}</p>

                    <div className='w-11/12 sm:w-4/5 flex flex-col sm:flex-row flex-wrap justify-between gap-4'>
                        {project.design &&
                            <div className='w-full sm:w-2/5'>
                                <p className='text-3xl mb-4 text-accent font-semibold'>Design</p>
                                <p>{project.design}</p>
                            </div>
                        }
                        {project.website &&
                            <div className='w-full sm:w-2/5'>
                                <p className='text-3xl mb-4 text-accent font-semibold'>Tech</p>
                                <p>{project.website}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Projects = forwardRef<HTMLDivElement, unknown>((_, ref) => {
    return (
        <div ref={ref} className='h-full w-max flex flex-col sm:flex-row items-center relative'>
            {ProjectsData.map(project => (
                <Card project={project} />
            ))}
        </div>
    );
});
