import { useState, useEffect } from 'react';
import { propertyService } from '../services/propertyService';
import { PropertyCard } from '../components/PropertyCard';
import type { Property } from '../interfaces';

export function PropertyListings() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchProperties = async () => {
        try {
            setIsLoading(true);
            const data = await propertyService.getAll();
            setProperties(data);
        } catch {
            setError('Failed to load properties');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleFavoriteToggle = (propertyId: number, isFavorited: boolean) => {
        setProperties(prev =>
            prev.map(p =>
                p.id === propertyId ? { ...p, isFavorited } : p
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Discover Properties</h1>
                    <p className="text-gray-600">Find your dream home from our curated selection</p>
                </div>
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={fetchProperties}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            Try Again
                        </button>
                    </div>
                ) : properties.length === 0 ? (
                    <div className="text-center py-20">
                        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <p className="text-gray-500">No properties available yet.</p>
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
