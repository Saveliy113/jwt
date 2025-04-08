import { makeAutoObservable } from "mobx";
import { IUser } from "../models/response/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }

    setUser(user: IUser) {
        this.user = user; 
    }

    setLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }

    async signIn(email: string, password: string) {
        try {
            const response = await AuthService.signIn(email, password);
            console.log('Response: ', response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user); 
        } catch (error: any ) {
            console.log(`[ store.signIn ] ${error.response?.data?.message}`);
        }
    }

    async signUp(email: string, password: string) {
        try {
            const response = await AuthService.signUp(email, password);
            console.log('Response: ', response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user); 
        } catch (error: any ) {
            console.log(`[ store.signUp ] ${error.response?.data?.message}`);
        }
    }

    async signOut() {
        try {
            await AuthService.signOut();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser); 
        } catch (error: any ) {
            console.log(`[ store.signUp ] ${error.response?.data?.message}`);
        }
    }

    async checkAuth() {
        try {
            this.setLoading(true);
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            console.log('Response: ', response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error: any) {
            console.log(`[ store.checkAuth ] ${error.reponse?.data?.message}`)
        } finally {
            this.setLoading(false);
        }
    }
}