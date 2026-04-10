import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import { PropertyCard } from '../components/PropertyCard';
import type { Property } from '../interfaces';

export function Favorites() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchFavorites = async () => {
        try {
            setIsLoading(true);
            const data = await propertyService.getFavorites();
            setProperties(data);
        } catch {
            setError('Failed to load favorites');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const handleFavoriteToggle = (propertyId: number, isFavorited: boolean) => {
        if (!isFavorited) {
            setProperties(prev => prev.filter(p => p.id !== propertyId));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
                    <p className="text-gray-600">Properties you've saved</p>
                </div>
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={fetchFavorites}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            Try Again
                        </button>
                    </div>
                ) : properties.length === 0 ? (
                    <div className="text-center py-20">
                        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <p className="text-gray-500 mb-4">No favorite properties yet.</p>
                        <Link
                            to="/properties"
                            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Browse Properties
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                onFavoriteToggle={handleFavoriteToggle}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
