import { FC } from 'react';
import { useForm } from "react-hook-form"

import { Button } from '../ui/button';

import logo from '../../assets/logo.png';
import googleIcon from '../../assets/icons/google_icon.svg';

const LoginForm: FC = () => {
    return (
        <div className="login-form mt-10 ml-10 border border-gray-500 w-[500px]">
            <div className='login-form__header'>
                <div className="header__title flex flex-col items-center w-full">
                    <img className='w-60' src={logo} alt='Logo' />
                    <p className='block'>Explore More. Experience Life.</p>
                </div>

                <div className="header__actions w-full flex items-center gap-2 mt-5">
                    <Button className='cursor-pointer flex-1 py-6' variant="default">Sign Up</Button>
                    <Button className='cursor-pointer flex-1 py-6' variant="outline">Log in</Button>
                </div>
            </div>

            <div className="login-form__controls mt-15 flex flex-col gap-5">
                <div className='controls__sign-up text-left'>
                    <h2 className='text-4xl'>Begin Your Adventure</h2>
                    <p className='text-xs font-light mt-3 mb-2'>Sign Up with Open account</p>
                    <Button className='border-cyan-300 mt-1 px-10 py-5 w-full cursor-pointer' variant="outline">
                        <img src={googleIcon} alt="Google Icon" />
                    </Button>
                </div>

                <div className="controls__separator flex items-center gap-6 justify-between">
                    <hr className='flex-1 border-t border-cyan-300'/>
                    <p>or</p>
                    <hr className='flex-1 border-t border-cyan-300' />
                </div>

                <div className="controls__sign-in">
                    
                </div>
            </div>
        </div>
    )
}

export default LoginForm;