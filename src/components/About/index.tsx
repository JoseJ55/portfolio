import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import { aboutText, skillIcons } from './constants';

import Career from '../../assets/career.svg?react';
import Profile from '../../assets/profile-500px.png';
import School from '../../assets/school.svg?react';

interface SkillInterface {
    name: string;
    src: string;
}

interface IconInterface {
    skill: SkillInterface;
    width: number;
    height: number;
    updateSkill: () => void;
}

interface ExperienceCardInterface {
    title: string;
    Icon: React.ReactNode;
    year: string;
}

const Icon = ({ skill, width, height, updateSkill }: IconInterface) => {

    const [place, setPlace] = useState({ width: 0, height: 0 });

    const genRandom = useCallback(() => {
        let x;
        let y;

        if (window.innerWidth < window.innerHeight) {
            x = Math.floor(Math.random() * (width - (width * 0.2)));
            y = Math.floor(Math.random() * (height - (height * 0.2)));
        } else {
            x = Math.floor(Math.random() * (width - (width * 0.1)));
            y = Math.floor(Math.random() * (height - (height * 0.1)));
        }

        setPlace({
            width: x,
            height: y
        });
    }, [width, height]);

    useEffect(() => {
        genRandom();
    }, [genRandom]);

    return (
        <div
            style={{ top: place.height, left: place.width }}
            className={
                `
                    absolute w-fit h-fit p-[10px] rounded-full bg-secondary flex justify-center items-center opacity-60 
                    hover:opacity-100 hover:cursor-pointer text-lg hover:z-10
                `
            }
            onClick={updateSkill}
        >
            <img className='w-[40px] h-[40px]' src={skill.src} alt={`${skill.name} icon`} />
        </div>
    );
};

const Skills = () => {
    const [elementHeight, setElementHeight] = useState<number>(0);
    const [elementWidth, setElementWidth] = useState<number>(0);
    const [currentSkill, setCurrentSkill] = useState<string>('');

    const skillsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (skillsRef.current) {
            setElementHeight(skillsRef.current.offsetHeight);
            setElementWidth(skillsRef.current.offsetWidth);
        }
    }, [skillsRef]);

    useEffect(() => {
        setTimeout(() => {
            setCurrentSkill('');
        }, 3000);
    }, [currentSkill]);

  return (
    <div className='min-w-[50vw] h-full flex items-start'>
        <div className='text-text text-3xl w-1/5 h-3/4 flex justify-center items-center'>
            <p className='-rotate-90 text-center'>My Skills</p>
        </div>

        <div ref={skillsRef} className='relative w-4/5 h-3/4'>
            <p
                className={
                    `
                        absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-accent text-7xl 
                        transition-all duration-300 font-semibold
                        ${currentSkill !== '' ? 'opacity-100' : 'opacity-0'}
                    `
                }
            >
                {currentSkill}
            </p>

            {skillIcons.map((skill, index) => (
                <Icon
                    key={index}
                    skill={skill}
                    width={elementWidth}
                    height={elementHeight}
                    updateSkill={() => setCurrentSkill(skill.name)}
                />
            ))}
        </div>
    </div>
  );
};

const ExperienceCard = ({ title, Icon, year }: ExperienceCardInterface) => {
    return (
        <div className='w-full text-text text-xl flex justify-between items-center'>
            <div className='flex items-center gap-4'>
                {Icon}
                <p>{title}</p>
            </div>

            <p>{year}</p>
        </div>
    );
};

export const About = forwardRef<HTMLDivElement, unknown>((_, ref) => {
    return (
        <div ref={ref} className='w-max h-full flex justify-center py-20 relative'>
            <div className='min-w-screen h-full flex justify-center relative gap-20'>
                <div className='flex flex-col items-center gap-10'>
                    <div
                        className={
                            `
                                w-[250px] h-[450px] bg-text rounded-2xl shadow-[0px_0px_20px] shadow-secondary 
                                overflow-hidden
                            `
                        }
                    >
                        <img className='w-full h-full object-cover' src={Profile} alt='image profile' />
                    </div>
                    <p className='text-text text-4xl'>Jose Jimenez</p>
                </div>

                <div className='w-1/3 h-3/4 flex flex-col items-center gap-4 text-text'>
                    {aboutText.map((text) => (
                        <p>{text}</p>
                    ))}
                </div>
            </div>

            <Skills />

            <div className='min-w-[50vw] h-full flex pl-36'>
                <div className='text-text text-3xl w-1/5 h-3/4 flex justify-center items-center'>
                    <p className='-rotate-90 text-center text-nowrap'>Experience/Education</p>
                </div>

                <div className='w-4/5 h-3/4 flex flex-col justify-center items-center'>
                    <ExperienceCard
                        title='Victor Valley College'
                        Icon={<School className='w-[50px] h-[50px]' />}
                        year='2020'
                    />
                    <div className='w-full h-[2px] bg-text my-6' />
                    <ExperienceCard
                        title='University of California Riverside'
                        Icon={<School className='w-[50px] h-[50px]' />}
                        year='2021'
                    />
                    <div className='w-full h-[2px] bg-text my-6' />
                    <ExperienceCard
                        title='Cal State Fullerton'
                        Icon={<School className='w-[50px] h-[50px]' />}
                        year='2023'
                    />
                    <div className='w-full h-[2px] bg-text my-6' />
                    <ExperienceCard
                        title='FOMO Social .inc'
                        Icon={<Career className='w-[50px] h-[50px]' />}
                        year='2021 - now'
                    />
                </div>
            </div>
        </div>
    );
});
