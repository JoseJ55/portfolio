import { motion } from 'motion/react';
import React from 'react';

import GitHub from '../../assets/github.svg?react';
import Mail from '../../assets/google.svg?react';
import LinkedIn from '../../assets/linkedin.svg?react';

interface NavbarInterface {
    children: React.ReactNode;
    scrollToHome: () => void;
    scrollToProjects: () => void;
}

interface LinkInterface {
    title: string;
    scrollTo: () => void;
}

const Link = ({ title, scrollTo }: LinkInterface) => {
    const bgMotion = {
        rest: { opacity: 0, ease: 'easeOut', duration: 0.2, type: 'tween' },
        hover: {
            opacity: 1,
            bottom: 0,
            transition: {
                duration: 0.2,
                type: 'tween',
                ease: 'easeIn'
            }
        }
    };

    return (
        <motion.li
            initial='rest'
            whileHover='hover'
            animate='rest'
            onClick={scrollTo}
            className='flex items-center justify-center relative max-w-[80px] w-full h-[80px] hover:cursor-pointer'
        >
            <p className='mx-4 z-[1]'>{title}</p>
            <motion.div
                variants={bgMotion}
                className='w-full h-full absolute bottom-full opacity-0 left-0 rounded-b-2xl bg-secondary'
            ></motion.div>
        </motion.li>
    );
};

export const Navbar = ({ children, scrollToHome, scrollToProjects }: NavbarInterface) => {
    return (
        <div className='flex flex-col w-full h-full'>
            <div className='bg-main w-full flex justify-between items-center'>
                <ul className='flex items-center gap-10 px-20 text-text text-lg'>
                    <Link title='Home' scrollTo={scrollToHome} />
                    <Link title='Projects' scrollTo={scrollToProjects} />
                    <Link title='About' scrollTo={() => null} />
                    <Link title='Contact' scrollTo={() => null} />
                </ul>

                <div className='px-20 flex justify-start items-center gap-10 text-white'>
                    <a target='_blank' rel='noreferrer' href='mailto:josejimenez826@gmail.com'>
                        <Mail className='w-[25px] h-[25px] hover:text-accent' />
                    </a>
                    <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/jose-jimenez-238453169/'>
                        <LinkedIn className='w-[25px] h-[25px] hover:text-accent' />
                    </a>
                    <a target='_blank' rel='noreferrer' href='https://github.com/JoseJ55'>
                        <GitHub className='w-[25px] h-[25px] hover:text-accent' />
                    </a>
                </div>
            </div>

            <div className='flex-1 bg-main relative'>
                {children}
            </div>
        </div>
    );
};
