import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    DollarSign,
    TrendingUp,
    Clock,
    Download,
    Search,
    ChevronRight,
    CheckCircle,
    AlertCircle,
    RefreshCw,
    LogOut
} from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { adminApi } from '../lib/adminApi';
import { authApi } from '../lib/authApi';
import { cn } from '../lib/utils';

interface Stats {
    totalRegistrations: number;
    paidRegistrations: number;
    pendingRegistrations: number;
    totalRevenue: number;
    conversionRate: number;
    recentRegistrations: Array<{
        fullName: string;
        email: string;
        pricingTotal?: number;
        paymentStatus: string;
        createdAt: string;
    }>;
}

interface Registration {
    _id: string;
    confirmationNumber: string;
    fullName: string;
    email: string;
    phone: string;
    country: string;
    profession: string;
    accommodationType: string;
    paymentStatus: string;
    pricingBreakdown: {
        basePrice: number;
        total: number;
    };
    createdAt: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [statsRes, regsRes] = await Promise.all([
                adminApi.getStats(),
                adminApi.getRegistrations({ limit: 10 })
            ]);

            if (statsRes.success && statsRes.data) {
                setStats(statsRes.data);
            }
            if (regsRes.success && regsRes.data) {
                setRegistrations(regsRes.data);
            }
        } catch (error) {
            console.error('Failed to load admin data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            const res = await adminApi.getRegistrations({
                search: searchQuery,
                status: statusFilter || undefined
            });
            if (res.success && res.data) {
                setRegistrations(res.data);
            }
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    const handleExport = () => {
        window.open(adminApi.exportCsv(), '_blank');
    };

    if (isLoading) {
        return (
            <main className="pt-24 pb-16 min-h-screen bg-background">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-center py-20">
                    <RefreshCw className="w-8 h-8 animate-spin text-primary-500" />
                </div>
            </main>
        );
    }

    return (
        <main className="pt-24 pb-16 min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
                        <p className="text-text-secondary">Manage registrations and view analytics</p>
                    </div>
                    <div className="flex gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={loadData}
                            className="btn btn-secondary gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleExport}
                            className="btn btn-primary gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => authApi.logout()}
                            className="btn btn-secondary gap-2 text-error hover:bg-error/10"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </motion.button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-card p-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                                <Users className="w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                                <p className="text-sm text-text-secondary">Total Registrations</p>
                                <p className="text-2xl font-bold text-text-primary">{stats?.totalRegistrations || 0}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-card p-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-secondary-600" />
                            </div>
                            <div>
                                <p className="text-sm text-text-secondary">Total Revenue</p>
                                <p className="text-2xl font-bold text-text-primary">{formatCurrency(stats?.totalRevenue || 0)}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-card p-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-accent-600" />
                            </div>
                            <div>
                                <p className="text-sm text-text-secondary">Conversion Rate</p>
                                <p className="text-2xl font-bold text-text-primary">{stats?.conversionRate || 0}%</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-card p-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-warning-100 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-warning-600" />
                            </div>
                            <div>
                                <p className="text-sm text-text-secondary">Pending</p>
                                <p className="text-2xl font-bold text-text-primary">{stats?.pendingRegistrations || 0}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-card p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or confirmation number..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="input pl-12 w-full"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="input w-full md:w-48"
                        >
                            <option value="">All Status</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSearch}
                            className="btn btn-primary"
                        >
                            Search
                        </motion.button>
                    </div>
                </div>

                {/* Registrations Table */}
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h2 className="text-lg font-semibold text-text-primary">Recent Registrations</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-background">
                                <tr>
                                    <th className="text-left text-sm font-medium text-text-secondary px-6 py-3">Confirmation</th>
                                    <th className="text-left text-sm font-medium text-text-secondary px-6 py-3">Name</th>
                                    <th className="text-left text-sm font-medium text-text-secondary px-6 py-3">Email</th>
                                    <th className="text-left text-sm font-medium text-text-secondary px-6 py-3">Country</th>
                                    <th className="text-left text-sm font-medium text-text-secondary px-6 py-3">Total</th>
                                    <th className="text-left text-sm font-medium text-text-secondary px-6 py-3">Status</th>
                                    <th className="text-left text-sm font-medium text-text-secondary px-6 py-3">Date</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {registrations.map((reg) => (
                                    <tr key={reg._id} className="hover:bg-background/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-mono text-primary-600">{reg.confirmationNumber || 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-text-primary">{reg.fullName}</td>
                                        <td className="px-6 py-4 text-sm text-text-secondary">{reg.email}</td>
                                        <td className="px-6 py-4 text-sm text-text-secondary">{reg.country}</td>
                                        <td className="px-6 py-4 text-sm font-medium">{formatCurrency(reg.pricingBreakdown?.total || 0)}</td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                                                reg.paymentStatus === 'paid' && 'bg-secondary-100 text-secondary-700',
                                                reg.paymentStatus === 'pending' && 'bg-warning-100 text-warning-700',
                                                reg.paymentStatus === 'failed' && 'bg-error/10 text-error'
                                            )}>
                                                {reg.paymentStatus === 'paid' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                {reg.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-text-secondary">
                                            {new Date(reg.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-primary-600 hover:text-primary-700">
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {registrations.length === 0 && (
                        <div className="py-12 text-center text-text-secondary">
                            No registrations found
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
