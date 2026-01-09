import { useState, useEffect } from 'react';
import client from '../api/client';
import {
    CheckCircle2,
    Clock,
    AlertTriangle,
    Plus,
    LayoutDashboard,
    Users,
    LogOut,
    TrendingUp,
    MoreVertical,
    Filter,
    MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const STATUS_COLORS = {
    open: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    'in-progress': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    completed: 'text-whatsapp bg-whatsapp/10 border-whatsapp/20',
    overdue: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const { logout, user } = useAuth();

    useEffect(() => {
        fetchTasks();
    }, [filter]);

    const fetchTasks = async () => {
        try {
            const { data } = await client.get(`/tasks?${filter !== 'all' ? `status=${filter}` : ''}`);
            setTasks(data);
        } catch (err) {
            console.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleEscalate = async (taskId) => {
        try {
            await client.put(`/tasks/${taskId}`, { status: 'overdue' });
            fetchTasks();
        } catch (err) {
            console.error('Escalation failed');
        }
    };

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'completed').length,
        pending: tasks.filter(t => t.status !== 'completed').length,
        overdue: tasks.filter(t => t.status === 'overdue').length,
    };

    const chartData = {
        labels: ['Open', 'In Progress', 'Completed', 'Overdue'],
        datasets: [{
            data: [
                tasks.filter(t => t.status === 'open').length,
                tasks.filter(t => t.status === 'in-progress').length,
                tasks.filter(t => t.status === 'completed').length,
                tasks.filter(t => t.status === 'overdue').length,
            ],
            backgroundColor: [
                'rgba(96, 165, 250, 0.5)',
                'rgba(251, 191, 36, 0.5)',
                'rgba(37, 211, 102, 0.5)',
                'rgba(248, 113, 113, 0.5)',
            ],
            borderColor: [
                '#60a5fa',
                '#fbbf24',
                '#25D366',
                '#f87171',
            ],
            borderWidth: 1,
        }]
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 p-6 flex flex-col gap-8 hidden lg:flex">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-whatsapp/20 flex items-center justify-center text-whatsapp">
                        <LayoutDashboard size={24} />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">WA Manager</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
                    <NavItem icon={<Users size={20} />} label="Team Members" />
                    <NavItem icon={<Clock size={20} />} label="Schedules" />
                </nav>

                <button
                    onClick={logout}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors mt-auto text-slate-400"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="p-8 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-[#0f172a]/80 backdrop-blur-xl z-10">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Tasks Overview</h1>
                        <p className="text-slate-400">Manage and monitor WhatsApp task flow</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-whatsapp"
                        >
                            <option value="all">All Tasks</option>
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="overdue">Overdue</option>
                        </select>
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-whatsapp">
                            {user?.name?.[0] || 'A'}
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard label="Total Tasks" value={stats.total} icon={<TrendingUp className="text-blue-400" />} />
                        <StatCard label="Completed" value={stats.completed} icon={<CheckCircle2 className="text-whatsapp" />} />
                        <StatCard label="Pending" value={stats.pending} icon={<Clock className="text-amber-400" />} />
                        <StatCard label="Overdue" value={stats.overdue} icon={<AlertTriangle className="text-red-400" />} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Task List */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                                <Filter size={18} className="text-slate-400 cursor-pointer hover:text-white" />
                            </div>

                            {loading ? (
                                <div className="h-64 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-whatsapp"></div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {tasks.map(task => (
                                        <div key={task._id} className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl hover:border-slate-700 transition-all group">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <h4 className="font-semibold text-white flex items-center gap-2">
                                                        {task.title}
                                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[task.status]}`}>
                                                            {task.status}
                                                        </span>
                                                    </h4>
                                                    <p className="text-sm text-slate-400 flex items-center gap-2">
                                                        <Users size={14} /> Assigned to: {task.assigned_to?.name || 'Unassigned'}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        ID: {task._id.slice(-6)} • Due: {new Date(task.due_date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {task.status !== 'overdue' && task.status !== 'completed' && (
                                                        <button
                                                            onClick={() => handleEscalate(task._id)}
                                                            className="px-3 py-1.5 text-xs font-medium bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                                        >
                                                            Escalate
                                                        </button>
                                                    )}
                                                    <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Charts Vertical Column */}
                        <div className="space-y-8">
                            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                                <h3 className="text-lg font-semibold text-white mb-6">Task Distribution</h3>
                                <div className="h-[250px] flex items-center justify-center">
                                    <Pie
                                        data={chartData}
                                        options={{
                                            maintainAspectRatio: false,
                                            plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="bg-whatsapp/10 border border-whatsapp/20 p-6 rounded-2xl relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h3 className="text-lg font-semibold text-whatsapp mb-2">WhatsApp Sync</h3>
                                    <p className="text-sm text-whatsapp/70 mb-4">Webhook is currently active and healthy. 42 messages processed today.</p>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-whatsapp">
                                        <div className="w-2 h-2 rounded-full bg-whatsapp animate-pulse"></div>
                                        Live
                                    </div>
                                </div>
                                <MessageSquare className="absolute -right-4 -bottom-4 w-24 h-24 text-whatsapp/10 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active = false }) {
    return (
        <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-whatsapp text-black shadow-lg shadow-whatsapp/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}>
            {icon}
            <span className="font-medium">{label}</span>
        </div>
    );
}

function StatCard({ label, value, icon }) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-slate-800">
                    {icon}
                </div>
            </div>
            <div className="space-y-1">
                <p className="text-slate-400 text-sm font-medium">{label}</p>
                <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
            </div>
        </div>
    );
}
