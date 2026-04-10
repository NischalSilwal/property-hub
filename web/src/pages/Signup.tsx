import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../store/AuthContext';
import { useToast } from '../components/CustomToast';
import type { SignupFormData } from '../interfaces/auth';

export function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupFormData>();

    const onSubmit = async (data: SignupFormData) => {
        try {
            await registerUser(data.name, data.email, data.password);
            showToast('Registration successful', 'success');
            navigate('/login');
        } catch (err) {
            if (err instanceof Error && err.message === 'Email already registered') {
                showToast('Email already registered', 'error');
            } else {
                showToast(err instanceof Error ? err.message : 'Registration failed', 'error');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                        <p className="text-gray-500">Join us today</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500'}`}
                                {...register('name', { required: 'Name is required' })}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="your@email.com"
                                className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500'}`}
                                {...register('email', { required: 'Email is required' })}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Min 6 characters"
                                    className={`w-full px-4 py-3 pr-12 border rounded-lg outline-none transition-all ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500'}`}
                                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-lg transition-colors"
                        >
                            {isSubmitting ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
