import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { AuthResponse } from '@/models/response/AuthResponse';
import AuthService from '@/services/AuthService';
import { AxiosError } from 'axios';

export const useSignUp = () => {
    return useMutation<AuthResponse, AxiosError, { email: string; username: string; password: string }>({
        mutationFn: ({ email, username, password}) => AuthService.signUp(email, username, password)
    }
    )
}