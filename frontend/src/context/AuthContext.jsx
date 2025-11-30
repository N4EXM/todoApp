// resources/js/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    // useEffect(() => {
    //     console.log("user: ", user)
    // }, [user])

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch('/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    };

    const login = async (email, password, rememberMe) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, rememberMe }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();

            if (rememberMe) {
                localStorage.setItem('token', data.token);
                setUser(data.user);    
            }
            else {
                setUser(data.user);    
            }
        
            return data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (name, email, password, password_confirmation, rememberMe) => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name, 
                    email, 
                    password, 
                    password_confirmation, 
                    rememberMe
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();
            
            if (rememberMe) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
            }
            else {
                setUser(data.user);
            }
        
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await fetch('/api/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};