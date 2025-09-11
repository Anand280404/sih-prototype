import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = ({ onLogin, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const mockCredentials = [
    { email: 'student@peco.com', password: 'student123', role: 'student', name: 'Alex Green' },
    { email: 'admin@peco.com', password: 'admin123', role: 'admin', name: 'Dr. Earth' },
    { email: 'emma@peco.com', password: 'nature123', role: 'student', name: 'Emma Nature' },
    { email: 'teacher@peco.com', password: 'teach123', role: 'admin', name: 'Ms. Forest' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Please enter your email to continue your eco-adventure!';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Oops! That doesn\'t look like a valid email address.';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Don\'t forget your secret password!';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Your password should be at least 6 characters long.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    // Check credentials
    const user = mockCredentials?.find(
      cred => cred?.email === formData?.email && cred?.password === formData?.password
    );
    
    if (!user) {
      setErrors({
        general: `Hmm, we couldn't find that account. Try these demo accounts:\n• student@peco.com (password: student123)\n• admin@peco.com (password: admin123)`
      });
      return;
    }
    
    await onLogin({
      ...user,
      rememberMe: formData?.rememberMe
    });
  };

  const handleDemoLogin = (credentials) => {
    setFormData({
      email: credentials?.email,
      password: credentials?.password,
      rememberMe: false
    });
    onLogin(credentials);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center shadow-large animate-gentle-bounce">
            <Icon name="Leaf" size={32} color="white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-warning rounded-full flex items-center justify-center animate-pulse">
            <Icon name="Sparkles" size={16} color="white" />
          </div>
        </div>
        <h1 className="font-heading text-3xl text-primary mb-2">Welcome Back, Eco-Hero!</h1>
        <p className="font-caption text-muted-foreground">
          Ready to continue your environmental adventure?
        </p>
      </div>
      {/* Demo Account Quick Access */}
      <div className="mb-6 p-4 bg-success/5 rounded-lg border border-success/20">
        <h3 className="font-caption font-medium text-success mb-3 flex items-center">
          <Icon name="Zap" size={16} className="mr-2" />
          Quick Demo Access
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin(mockCredentials?.[0])}
            className="justify-start text-left"
            disabled={isLoading}
          >
            <Icon name="User" size={16} className="mr-2" />
            <div>
              <div className="font-medium">Student Demo</div>
              <div className="text-xs opacity-75">Alex Green</div>
            </div>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin(mockCredentials?.[1])}
            className="justify-start text-left"
            disabled={isLoading}
          >
            <Icon name="Shield" size={16} className="mr-2" />
            <div>
              <div className="font-medium">Admin Demo</div>
              <div className="text-xs opacity-75">Dr. Earth</div>
            </div>
          </Button>
        </div>
      </div>
      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-caption font-medium text-error mb-1">Login Failed</h4>
                <p className="text-sm text-error whitespace-pre-line">{errors?.general}</p>
              </div>
            </div>
          </div>
        )}

        {/* Email Input */}
        <div className="relative">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder="Enter your email (e.g., student@peco.com)"
            error={errors?.email}
            required
            disabled={isLoading}
            className="pl-12"
          />
          <div className="absolute left-3 top-9 text-muted-foreground">
            <Icon name="Mail" size={20} />
          </div>
        </div>

        {/* Password Input */}
        <div className="relative">
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            error={errors?.password}
            required
            disabled={isLoading}
            className="pl-12"
          />
          <div className="absolute left-3 top-9 text-muted-foreground">
            <Icon name="Lock" size={20} />
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button
            type="button"
            className="text-sm font-caption text-primary hover:text-primary/80 transition-colors duration-200"
            onClick={() => {
              alert('Demo app: Password reset would be sent to your email!');
            }}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          size="lg"
          className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90"
        >
          <Icon name="TreePine" size={20} className="mr-2" />
          Continue Adventure
        </Button>
      </form>
      {/* Registration Link */}
      <div className="mt-8 text-center">
        <p className="text-sm font-caption text-muted-foreground mb-4">
          New to Peco? Start your eco-journey today!
        </p>
        <Button
          variant="outline"
          onClick={() => {
            alert('Demo app: Registration would redirect to sign-up page!');
          }}
          disabled={isLoading}
        >
          <Icon name="UserPlus" size={20} className="mr-2" />
          Create New Account
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;