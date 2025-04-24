import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import AuthService from '@/services/AuthService';

import { AuthResponse } from '@/models/response/AuthResponse';

export const useSignUp = (options?: UseMutationOptions<AuthResponse, AxiosError, { email: string; username: string; password: string }>) => {
    return useMutation<AuthResponse, AxiosError, { email: string; username: string; password: string }>({
        mutationFn: ({ email, username, password}) => AuthService.signUp(email, username, password),
        ...options,
    }
    )
}

export const useCheckAuth = (options?: UseMutationOptions<AuthResponse, AxiosError, void>) => {
    return useMutation<AuthResponse, AxiosError, void>({
        mutationFn: () => AuthService.checkAuth(),
        ...options,
    }
    )
}
