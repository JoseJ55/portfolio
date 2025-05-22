import { Header, Navbar, Projects } from '../../components';


export const Home = () => {
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

                <div className='relative w-full h-full z-[1] flex overflow-auto overflow-y-hidden'>
                    <Header />
                    <Projects />
                </div>
            </Navbar>
        </div>
    );
};
