import { useState } from 'react';
import type { Property } from '../interfaces';
import { propertyService } from '../services/propertyService';
import { useAuth } from '../store/AuthContext';

interface PropertyCardProps {
    property: Property;
    onFavoriteToggle?: (propertyId: number, isFavorited: boolean) => void;
}

export function PropertyCard({ property, onFavoriteToggle }: PropertyCardProps) {
    const { isAuthenticated } = useAuth();
    const [isLiked, setIsLiked] = useState(property.isLiked);
    const [likeCount, setLikeCount] = useState(property.likeCount);
    const [isFavorited, setIsFavorited] = useState(property.isFavorited);
    const [isLiking, setIsLiking] = useState(false);
    const [isFavoriting, setIsFavoriting] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NPR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated || isLiking) return;

        setIsLiking(true);
        const previousState = { isLiked, likeCount };

        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

        try {
            const response = await propertyService.toggleLike(property.id);
            setIsLiked(response.isLiked);
            setLikeCount(response.likeCount);
        } catch {
            setIsLiked(previousState.isLiked);
            setLikeCount(previousState.likeCount);
        } finally {
            setIsLiking(false);
        }
    };

    const handleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated || isFavoriting) return;

        setIsFavoriting(true);
        const previousState = isFavorited;
        const newState = !previousState;

        setIsFavorited(newState);

        try {
            const response = await propertyService.toggleFavorite(property.id);
            setIsFavorited(response.isFavorited);
            onFavoriteToggle?.(property.id, response.isFavorited);
        } catch {
            setIsFavorited(previousState);
        } finally {
            setIsFavoriting(false);
        }
    };

    const dummyImages = [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    ];

    const imageUrl = property.imageUrl || dummyImages[property.id % dummyImages.length];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-700 rounded-full">
                        {formatPrice(property.price)}
                    </span>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                    {isAuthenticated && (
                        <>
                            <button
                                onClick={handleLike}
                                className={`p-2 rounded-full backdrop-blur-sm transition-all ${isLiked
                                    ? 'bg-red-500 text-white'
                                    : 'bg-white/90 text-gray-600 hover:bg-white'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                            <button
                                onClick={handleFavorite}
                                className={`p-2 rounded-full backdrop-blur-sm transition-all ${isFavorited
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white/90 text-gray-600 hover:bg-white'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">{property.title}</h3>
                <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {property.location}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex gap-4">
                        {property.bedrooms && (
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                {property.bedrooms} bed
                            </span>
                        )}
                        {property.bathrooms && (
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                </svg>
                                {property.bathrooms} bath
                            </span>
                        )}
                        {property.sqft && (
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                                {property.sqft.toLocaleString()} sqft
                            </span>
                        )}
                    </div>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {likeCount}
                    </span>
                </div>
            </div>
        </div>
    );
}
