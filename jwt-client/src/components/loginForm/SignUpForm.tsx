import { FC, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpSchema } from './dto/formSchema'
import { z } from "zod"

import { Button } from '../ui/button'
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Loader2 } from 'lucide-react'

import { Input } from '../ui/input'
import { useSignUp } from '@/hooks/useAuth'

const SignUpForm: FC = () => {
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
          username: '',
          email: '',
          password: '',
        },
    });

    // Reset form on the first render
    useEffect(() => {
      form.reset({
        username: '',
        email: '',
        password: '',
      })
    }, [])

    const { mutate: signUp, isPending, isSuccess, isError} = useSignUp({
      onSuccess: () => {
        toast.success('Successfully authenticated')
      }
    });

    async function onSubmitSignUp(data: z.infer<typeof SignUpSchema>) {
      console.log('Sign Up', data)
      // await signUp(data);
      toast.success('Submited Sign Up');
    }

    return (
        <div className="controls__sign-in">
                    <Form {...form}>
                        <form 
                          onSubmit={form.handleSubmit(onSubmitSignUp)}
                          className="w-full space-y-4"
                        >
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

                            <Button
                              className='w-full mt-5 cursor-pointer flex-1 py-6'
                              variant="default"
                              type="submit"
                              disabled={isPending}
                            >
                             {isPending ? <Loader2 className='animate-spin w-5 h-5' /> : 'Let\'s Start'}
                            </Button>
                        </form>
                    </Form>
                </div>
    )
}

export default SignUpForm;