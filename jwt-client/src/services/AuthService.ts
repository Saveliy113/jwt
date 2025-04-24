import axios from "axios";
import $api, { API_URL } from "../api";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async signIn(email: string, password: string): Promise<AuthResponse> {
        const res = await $api.post<AuthResponse>('/signIn', { email, password});
        return res.data;
    }

    static async signOut(): Promise<void> {
        return $api.post('/signOut');
    }

    static async signUp(email: string, username: string, password: string): Promise<AuthResponse> {
        const res = await $api.post<AuthResponse>('/signUp', { email, username, password});
        return res.data;
    }

    static async checkAuth(): Promise<AuthResponse> {
        const res = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
        return res.data;
    }

}