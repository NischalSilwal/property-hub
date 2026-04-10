import { Link } from 'react-router-dom';
import { User, Mail, CalendarDays, Plus } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

export function Profile() {
    const { user } = useAuth();

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const isBroker = user?.role === 'broker';

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-5xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-600"> Account information</p>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-800 to-indigo-800 px-4 py-4">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-3xl font-bold">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="text-white">
                                <h2 className="text-2xl font-bold">Welcome back, {user?.name}!</h2>
                                <p className="text-purple-200 mt-1 capitalize">
                                    {user?.role || 'Property Buyer'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Details</h3>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
                                <div>
                                    <p className="text-sm text-gray-500">Full Name</p>
                                    <p className="font-medium text-gray-900">{user?.name}</p>
                                </div>
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-purple-800" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
                                <div>
                                    <p className="text-sm text-gray-500">Email Address</p>
                                    <p className="font-medium text-gray-900">{user?.email}</p>
                                </div>
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
                                <div>
                                    <p className="text-sm text-gray-500">Account Role</p>
                                    <p className="font-medium text-gray-900 capitalize">
                                        {user?.role || 'Buyer'}
                                    </p>
                                </div>
                                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium capitalize">
                                    {user?.role || 'buyer'}
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm">
                                <div>
                                    <p className="text-sm text-gray-500">Member Since</p>
                                    <p className="font-medium text-gray-900">
                                        {user?.createdAt ? formatDate(user.createdAt) : '-'}
                                    </p>
                                </div>
                                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                    <CalendarDays className="w-5 h-5 text-amber-600" />
                                </div>
                            </div>
                        </div>

                        {isBroker && (
                            <div className="mt-8 p-6 bg-purple-50 rounded-xl border border-purple-100">
                                <h4 className="font-semibold text-purple-900 mb-2">Broker Tools</h4>
                                <p className="text-purple-700 text-sm mb-4">
                                    As a broker, you can list new properties and manage your listings.
                                </p>
                                <Link
                                    to="/add-property"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add New Property
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
