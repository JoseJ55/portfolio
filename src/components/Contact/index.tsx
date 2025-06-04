import emailjs from '@emailjs/browser';
import React, { forwardRef, useRef } from 'react';

export const Contact = forwardRef<HTMLDivElement, unknown>((_, ref) => {
    const form = useRef<HTMLFormElement | null>(null);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (form.current) {
            emailjs.sendForm(
                import.meta.env.VITE_EMAIL_SERVICE_ID,
                import.meta.env.REACT_APP_EMAIL_TEMPLATE_ID,
                form.current,
                import.meta.env.REACT_APP_EMAIL_USER_ID
            )
                .then((result) => {
                    console.log('SUCCESS!', result.text);
                })
                .catch((error) => {
                    console.log('FAILED...', error.text);
                });
        };
    };

    return (
        <div ref={ref} className='sm:min-w-[700px] h-full flex justify-center items-center xl:mx-32'>
            <form
                ref={form}
                onSubmit={handleSubmit}
                className='flex flex-col w-5/6 sm:w-1/2 xl:w-2/3 gap-6 sm:gap-10 items-center'
            >
                <label
                    className={
                        `
                            text-text text-2xl sm:text-3xl xl:text-4xl text-nowrap -rotate-12 text-shadow-[0px_2px_1px] 
                            text-shadow-accent mb-10 sm:mb-20
                        `
                    }
                >
                    Coffee? Code? Conversation?
                </label>
                <input
                    name='name'
                    type='text'
                    required
                    placeholder='Name'
                    className='w-full p-2 border-b-2 border-accent text-text text-lg focus:outline-none'
                />
                <input
                    name='email'
                    type='email'
                    required
                    placeholder='Email'
                    className='w-full p-2 border-b-2 border-accent text-text text-lg focus:outline-none'
                />
                <textarea
                    name='message'
                    required
                    placeholder='Message'
                    className={
                        `
                            w-full px-2 min-h-[150px] border-b-2 border-accent text-text text-lg resize-none 
                            focus:outline-none
                        `
                    }
                />

                <input
                    type='submit'
                    value='Send'
                    className='w-full border-2 border-accent rounded-xl py-2 text-text'
                />
            </form>
        </div>
    );
});
