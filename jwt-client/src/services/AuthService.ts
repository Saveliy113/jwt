import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async signIn(email: string, password: string): Promise<AuthResponse> {
        const res = await $api.post<AuthResponse>('/signIn', { email, password});
        return res.data;
    }

    static async signOut(): Promise<void> {
        return $api.post('/signOut');
    }

    static async signUp(email: string, password: string): Promise<AuthResponse> {
        const res = await $api.post<AuthResponse>('/signUp', { email, password});
        return res.data;
    }

}