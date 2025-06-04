import { animate, motion, useMotionValue, useScroll } from 'motion/react';
import React, { useEffect, useRef } from 'react';

import { About, Contact, Footer, Header, Navbar, Projects } from '../../components';


export const Home = () => {
    const velocityRef = useRef(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const animationRef = useRef<ReturnType<typeof animate> | null>(null);

    const homeRef = useRef<HTMLDivElement | null>(null);
    const projectsRef = useRef<HTMLDivElement | null>(null);
    const aboutRef = useRef<HTMLDivElement | null>(null);
    const contactRef = useRef<HTMLDivElement | null>(null);

    const { scrollXProgress } = useScroll({ container: containerRef });

    const scrollX = useMotionValue(0);

    const scrollTo = (scrollRef: React.RefObject<HTMLDivElement | null>) => {
        const container = containerRef.current;
        const target = scrollRef.current;
        if (!container || !target) return;

        const isMobile = window.innerWidth <= 640;

        if (isMobile) {
            if (scrollRef.current) {
                scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            const targetLeft = target.offsetLeft - container.offsetLeft;;
            const maxScroll = container.scrollWidth - container.clientWidth;
            const clampedTarget = Math.min(targetLeft, maxScroll);

            animationRef.current?.stop();
            scrollX.set(container.scrollLeft);

            animationRef.current = animate(scrollX, clampedTarget, {
                type: 'spring',
                stiffness: 100,
                damping: 25,
                restDelta: 0.5,
                onUpdate: (latest) => {
                    container.scrollLeft = latest;
                },
            });
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            if(window.innerWidth < 640) return;

            velocityRef.current += e.deltaY * 1.6;

            animationRef.current?.stop();

            scrollX.set(container.scrollLeft);

            const maxScroll = container.scrollWidth - container.clientWidth;
            const unclampedTarget = container.scrollLeft + velocityRef.current;
            const clampedTarget = Math.max(0, Math.min(unclampedTarget, maxScroll));

            animationRef.current = animate(scrollX, clampedTarget, {
                type: 'spring',
                stiffness: 100,
                damping: 25,
                restDelta: 0.5,
                onUpdate: (latest) => {
                    container.scrollLeft = latest;
                },
                onComplete: () => {
                    velocityRef.current = 0;
                },
            });

            velocityRef.current *= 0.6;
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
            animationRef.current?.stop();
        };
    }, [scrollX]);

    return (
        <div className='w-screen h-screen bg-black relative'>
            <Navbar
                scrollToHome={() => scrollTo(homeRef)}
                scrollToProjects={() => scrollTo(projectsRef)}
                scrollToAbout={() => scrollTo(aboutRef)}
                scrollToContact={() => scrollTo(contactRef)}
            >
                <div className='fixed top-0 left-0 w-screen h-screen z-[0] overflow-x-hidden'>
                    <div className='relative w-full h-full'>
                        <motion.div
                            className={
                                `
                                    w-[50px] h-[50px] absolute top-1/6 left-1/4 bg-secondary/40 rounded-full 
                                    shadow-[0px_0px_30px] shadow-secondary transition-all
                                `
                            }
                            animate={{
                                y: [0, Math.random() * 10 + 10, 0],
                                x: [0, Math.random() * 10 + 10, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                ease: 'easeInOut',
                            }}
                        ></motion.div>
                        <motion.div
                            className={
                                `
                                    w-[40px] h-[40px] absolute top-4/5 left-1/5 bg-secondary/40 rounded-full 
                                    shadow-[0px_0px_30px] shadow-secondary transition-all
                                `
                            }
                            animate={{
                                y: [0, Math.random() * 10 + 10, 0],
                                x: [0, Math.random() * 10 + 10, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                ease: 'easeInOut',
                            }}
                        ></motion.div>
                        <motion.div
                            className={
                                `
                                    w-[200px] h-[200px] absolute top-1/4 left-2/3 bg-secondary/40 rounded-full 
                                    shadow-[0px_0px_90px] shadow-secondary transition-all
                                `
                            }
                            animate={{
                                y: [0, Math.random() * 10 + 10, 0],
                                x: [0, Math.random() * 10 + 10, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                ease: 'easeInOut',
                            }}
                        ></motion.div>
                    </div>
                </div>

                <motion.div
                    ref={containerRef}
                    className={
                        `
                            relative w-full h-full z-[1] flex flex-col sm:flex-row overflow-y-auto sm:overflow-y-hidden 
                            overflow-x-hidden sm:overflow-x-auto transition-all duration-100 
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                        `
                    }
                >
                    <Header ref={homeRef} scrollTo={() => scrollTo(projectsRef)} />
                    <Projects ref={projectsRef} />
                    <About ref={aboutRef} />
                    <Contact ref={contactRef} />
                    <Footer />
                </motion.div>

                <motion.div
                    style={{ scaleX: scrollXProgress }}
                    className={
                        `
                            hidden sm:block fixed bottom-8 left-0 w-full h-[10px] bg-accent/80 origin-center z-40 
                            transition-all duration-100 rounded-3xl
                        `
                    }
                />
            </Navbar>
        </div>
    );
};
