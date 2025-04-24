import { useState, useEffect, createContext, useContext, ReactNode} from 'react'
import { useNavigate } from 'react-router'

import { useCheckAuth } from '@/hooks/useAuth'
import { IUser } from '@/models/response/IUser';
import LoadingPage from '@/pages/LoadingPage';

interface AuthContextI {
    isAuthenticated: boolean;
    setIsAuthenticated: (val: boolean) => void;
    user: IUser | null;
}

const AuthContext = createContext<AuthContextI | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode })=> {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);

    const { mutate: checkAuth, isPending } = useCheckAuth({
        onSuccess: (data) => {
            localStorage.setItem('token', data.accessToken);
            setIsAuthenticated(true);
            setUser(data.user);
        },
        onError: () => {
            setIsAuthenticated(false);
            setUser(null);
            navigate("/signIn", { replace: true });
        }
    })
    
    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth();
        } else {
            if (!isAuthenticated) {
                navigate("/signIn", { replace: true });
            }
        }
    }, [])

    if (isPending) {
        return ( <LoadingPage />)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user }}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};