import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { userService } from "../services/apis";
import {toast} from 'react-toastify';


export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (name, password) => {
        const id = toast.loading("Please wait...");
        setLoading(true);
        setError(null);
    
        try {
            const res = await userService.loginUser({ password, name });
    
            console.log(res);
            localStorage.setItem("user", res.auth_token);
            dispatch({ type: "LOGIN", payload: res.auth_token });
    
            toast.update(id, {
                render: "Logged in successfully!",
                type: "success",
                isLoading: false,
                autoClose: 2300,
            });
    
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err);
    
            console.log("In catch block", err);
    
            toast.update(id, {
                render: err?.data?.[Object.keys(err?.data)?.[0]]?.[0] || "Login failed",
                type: "error",
                isLoading: false,
                autoClose: 4000,
            });
    
            throw err; // Propagate the error for the caller to catch it.
        }
    };
    

    return { login, error, loading };
};