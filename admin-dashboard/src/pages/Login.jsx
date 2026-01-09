import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import { MessageSquare, Lock, Phone } from 'lucide-react';

export default function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await client.post('/auth/login', { phone, password });
            login(data.user, data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4 text-white">
            <div className="max-w-md w-full space-y-8 bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-xl">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-whatsapp/10 text-whatsapp mb-4">
                        <MessageSquare size={32} />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">AI Task Manager</h2>
                    <p className="mt-2 text-slate-400">Admin Dashboard Access</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                <Phone size={18} />
                            </div>
                            <input
                                type="text"
                                required
                                className="block w-full pl-10 pr-3 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-whatsapp focus:border-whatsapp outline-none transition-all placeholder:text-slate-500"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                required
                                className="block w-full pl-10 pr-3 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-whatsapp focus:border-whatsapp outline-none transition-all placeholder:text-slate-500"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-black bg-whatsapp hover:bg-whatsapp/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-whatsapp transition-all disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
}
