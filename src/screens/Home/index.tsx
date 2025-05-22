import { animate, motion, useMotionValue, useScroll } from 'motion/react';
import { useEffect, useRef } from 'react';

import { Header, Navbar, Projects } from '../../components';


export const Home = () => {
    const velocityRef = useRef(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const animationRef = useRef<ReturnType<typeof animate> | null>(null);

    const { scrollXProgress } = useScroll({ container: containerRef });

    const scrollX = useMotionValue(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

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
            <Navbar>
                <div className='absolute w-full h-full z-[0]'>
                    <div className='relative w-full h-full'>
                        <div
                            className={
                                `
                                    w-[50px] h-[50px] absolute top-1/6 left-1/4 bg-secondary/40 rounded-full 
                                    shadow-[0px_0px_30px] shadow-secondary transition-all
                                `
                            }
                        ></div>
                        <div
                            className={
                                `
                                    w-[40px] h-[40px] absolute top-4/5 left-1/5 bg-secondary/40 rounded-full 
                                    shadow-[0px_0px_30px] shadow-secondary transition-all
                                `
                            }
                        ></div>
                        <div
                            className={
                                `
                                    w-[200px] h-[200px] absolute top-1/4 left-2/3 bg-secondary/40 rounded-full 
                                    shadow-[0px_0px_90px] shadow-secondary transition-all
                                `
                            }
                        ></div>
                    </div>
                </div>

                <motion.div
                    ref={containerRef}
                    className={
                        `
                            relative w-full h-full z-[1] flex overflow-y-hidden transition-all duration-100
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                        `
                    }
                >
                    <Header />
                    <Projects />
                </motion.div>

                <motion.div
                    style={{ scaleX: scrollXProgress }}
                    className={
                        `
                            fixed bottom-8 left-0 w-full h-[10px] bg-accent/80 origin-center z-40 transition-all 
                            duration-100 rounded-3xl
                        `
                    }
                />
            </Navbar>
        </div>
    );
};
