import { createContext } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    login: () => false,
    logout: () => { },
});

export default AuthContext;