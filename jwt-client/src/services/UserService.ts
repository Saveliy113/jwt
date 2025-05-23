import { AxiosResponse } from "axios";
import $api from "../api";
import { IUser } from "../models/response/IUser";

export default class UserService {
    static async fetchUsers (): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }
}