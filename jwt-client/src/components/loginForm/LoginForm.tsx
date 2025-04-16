import { FC, useEffect, useMemo, useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInSchema, SignUpSchema } from './dto/formSchema'
import { z } from "zod"

import { Button } from '../ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import logo from '../../assets/logo.png'
import googleIcon from '../../assets/icons/google_icon.svg'
import { Input } from '../ui/input'
import { LoginFormActionType } from './model/loginForm.model'

const LoginForm: FC = () => {
  const [actionType, setActionType] = useState<LoginFormActionType>('signUp');

  const schema = useMemo(() => (
    actionType === 'signIn' ? SignInSchema : SignUpSchema
  ), [actionType])

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
          username: '',
            email: '',
            password: '',
        },
    });

    // Reset form when actionType changes
    useEffect(() => {
      form.reset({
        username: '',
        email: '',
        password: '',
      })
    }, [actionType])

    function onSubmit(data: z.infer<typeof schema>) {
        toast.success('Submited');
    }

    return (
        <div className="login-form mt-10 ml-10 border border-gray-500 w-[450px]">
            <div className='login-form__header'>
                <div className="header__title flex flex-col items-center w-full">
                    <img className='w-60' src={logo} alt='Logo' />
                    <p className='block'>Explore More. Experience Life.</p>
                </div>

                <div className="header__actions w-full flex items-center gap-2 mt-5">
                    <Button
                      className='cursor-pointer flex-1 py-6 h-[50px]'
                      variant={actionType === 'signUp' ? 'default' : 'outline'}
                      onClick={() => setActionType('signUp')}
                      >
                      Sign Up
                    </Button>
                    <Button
                      className='cursor-pointer flex-1 py-6 h-[50px]'
                      variant={actionType === 'signIn' ? 'default' : 'outline'}
                      onClick={() => setActionType('signIn')}
                    >
                      Sign in
                    </Button>
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
                    <Form {...form} key={actionType}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                          {actionType === 'signIn' && (
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                  <FormItem className='w-full'>
                                    <FormLabel className='text-xs font-light'>Username</FormLabel>
                                    <FormControl>
                                      <Input
                                        className='w-full !border-cyan-300 py-7 px-5 !ring-cyan-100'
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                            />
                          )}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className='text-xs font-light'>Email</FormLabel>
                                    <FormControl>
                                      <Input
                                        className='w-full !border-cyan-300 py-7 px-5 !ring-cyan-100'
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className='text-xs font-light'>Password</FormLabel>
                                    <FormControl>
                                      <Input
                                        type='password'
                                        className='w-full !border-cyan-300 py-7 px-5 !ring-cyan-100'
                                        {...field} 
                                       />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                            />

                            {actionType === 'signIn' && (
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" className='cursor-pointer' />
                                <label
                                  htmlFor="remember"
                                  className="cursor-pointer text-xs font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Remember me
                                </label>
                            </div>
                            )}
                            <Button className='w-full mt-5 cursor-pointer flex-1 py-6' variant="default" type="submit">Let's Start</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;