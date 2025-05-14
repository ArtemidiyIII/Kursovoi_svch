import { $authHost, $host } from "../http/index";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, password) =>
{
    
    const {data} = await $host.post('api/user/registration',{email,password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)            
}

export const login = async (email, password) =>
{        
    const {data} = await $host.post('api/user/login',{email,password})
    localStorage.setItem('token', data.token) 
    return jwtDecode(data.token)
}


export const check = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("No token found");
    }

    try {
        const { data } = await $authHost.get('api/user/auth');
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    } catch (error) {
        throw new Error("Unauthorized: " + error.message);
    }
};

export const fetchUsers = async () => {
    try {
        const { data } = await $authHost.get('api/user/users/report'); // Используем $authHost для запросов, требующих авторизации
        return data;
    } catch (error) {
        console.error("Ошибка при загрузке пользователей:", error);
        throw error;
    }
};

export const banUser = async (userId, isBlocked) => {
    try {
        const action = isBlocked ? 'unban' : 'ban';
        const { data } = await $authHost.post('api/user/users/control', { userId, action }); // Используем $authHost
        return data;
    } catch (error) {
        console.error("Ошибка при блокировке/разблокировке пользователя:", error);
        throw error;
    }
};