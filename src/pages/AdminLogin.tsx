import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import { authApi } from '../lib/authApi';
import { cn } from '../lib/utils';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await authApi.login(username, password);

            if (result.success && result.data) {
                authApi.setToken(result.data.token);
                navigate('/admin');
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (err) {
            setError('Unable to connect to server');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="pt-24 pb-16 min-h-screen bg-background flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-card p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-primary-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-text-primary">Admin Login</h1>
                        <p className="text-text-secondary mt-2">Enter your credentials to access the dashboard</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl flex items-center gap-3"
                        >
                            <AlertCircle className="w-5 h-5 text-error flex-shrink-0" />
                            <p className="text-sm text-error">{error}</p>
                        </motion.div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="input pl-12 w-full"
                                    placeholder="admin"
                                    required
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input pl-12 w-full"
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            className={cn(
                                'btn btn-primary w-full py-3 gap-2',
                                isLoading && 'opacity-80 cursor-not-allowed'
                            )}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-5 h-5" />
                                    Sign In
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-background rounded-xl">
                        <p className="text-xs text-text-muted text-center mb-2">Demo credentials</p>
                        <div className="text-center">
                            <code className="text-sm text-primary-600">admin / dental2024</code>
                        </div>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
