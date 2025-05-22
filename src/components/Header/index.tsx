import ForwardArrow from '../../assets/foward-arrow.svg?react';

export function Header() {
  return (
    <div className='w-screen min-w-screen h-full relative'>
      <div className='absolute top-1/2 left-1/5 -translate-y-full text-text text-8xl'>
        <h2 className='text-shadow-[4px_0px_1px] text-shadow-accent'>Hello, I am</h2>
        <h2 className='text-shadow-[4px_0px_1px] text-shadow-accent'>Jose</h2>
      </div>

      <div
        className={
          `
            absolute right-[10%] bottom-[10%] w-[50px] h-[50px] rounded-full hover:cursor-pointer group 
            shadow-[0_0px_15px] hover:shadow-[0_0px_20px] shadow-secondary bg-secondary transition-all
          `
        }
      >
        <ForwardArrow
          className={
            `
              w-[25px] h-[25px] text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              group-hover:animate-bounce-right
            `
          }
        />
      </div>
    </div>
  );
};
