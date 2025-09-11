import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const AuthenticationWrapper = ({ children, requireAuth = true }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const authData = localStorage.getItem('pecoAuth');
      if (authData) {
        const { token, role, expiry } = JSON.parse(authData);
        if (token && expiry > Date.now()) {
          setIsAuthenticated(true);
          setUserRole(role);
        } else {
          localStorage.removeItem('pecoAuth');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('pecoAuth');
    }
    setIsLoading(false);
  };

  const handleLogin = (credentials) => {
    // Simulate authentication
    const authData = {
      token: 'demo-token-' + Date.now(),
      role: credentials?.role || 'student',
      expiry: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
      user: {
        id: Date.now(),
        name: credentials?.name || 'Demo User',
        email: credentials?.email
      }
    };

    localStorage.setItem('pecoAuth', JSON.stringify(authData));
    setIsAuthenticated(true);
    setUserRole(authData?.role);
    setShowLogin(false);

    // Redirect based on role
    if (authData?.role === 'admin') {
      navigate('/admin-content-management');
    } else {
      navigate('/student-dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('pecoAuth');
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/user-login');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-pulse">
            <Icon name="Leaf" size={24} color="white" />
          </div>
          <p className="font-caption text-muted-foreground">Loading Peco...</p>
        </div>
      </div>
    );
  }

  // Show login if required and not authenticated
  if (requireAuth && !isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Check role-based access
  const isAdminRoute = location?.pathname?.startsWith('/admin');
  if (isAuthenticated && isAdminRoute && userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="ShieldX" size={32} color="var(--color-error)" />
          </div>
          <div>
            <h2 className="font-heading text-2xl text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You don't have permission to access this area.</p>
          </div>
          <Button onClick={() => navigate('/student-dashboard')} className="w-full">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Render children with auth context
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userRole, 
      logout: handleLogout,
      checkAuth: checkAuthStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const LoginScreen = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onLogin(formData);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e?.target?.name]: e?.target?.value
    }));
  };

  const demoAccounts = [
    { role: 'student', email: 'student@peco.com', label: 'Student Demo' },
    { role: 'admin', email: 'admin@peco.com', label: 'Admin Demo' }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full mx-auto mb-4">
            <Icon name="Leaf" size={32} color="white" />
          </div>
          <h1 className="font-heading text-3xl text-primary">Welcome to Peco</h1>
          <p className="font-caption text-muted-foreground mt-2">
            Learn, grow, and protect our planet together
          </p>
        </div>

        {/* Demo Account Buttons */}
        <div className="space-y-3">
          <p className="text-sm font-caption text-center text-muted-foreground">
            Quick Demo Access:
          </p>
          {demoAccounts?.map((account) => (
            <Button
              key={account?.role}
              variant="outline"
              onClick={() => onLogin(account)}
              className="w-full justify-start"
              disabled={isLoading}
            >
              <Icon 
                name={account?.role === 'admin' ? 'Shield' : 'User'} 
                size={20} 
              />
              <span className="ml-2">{account?.label}</span>
            </Button>
          ))}
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted-foreground font-caption">
              Or sign in manually
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData?.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <div className="space-y-2">
            <label className="text-sm font-caption font-medium text-foreground">
              Account Type
            </label>
            <div className="flex space-x-4">
              {['student', 'admin']?.map((role) => (
                <label key={role} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData?.role === role}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary border-border focus:ring-primary"
                  />
                  <span className="font-caption capitalize">{role}</span>
                </label>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            loading={isLoading}
            className="w-full"
          >
            Sign In to Peco
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>New to Peco? Contact your educator for access.</p>
        </div>
      </div>
    </div>
  );
};

// Auth Context
const AuthContext = React.createContext({});

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthenticationWrapper');
  }
  return context;
};

export default AuthenticationWrapper;