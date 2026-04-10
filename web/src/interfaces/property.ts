export interface Property {
    id: number;
    title: string;
    location: string;
    price: number;
    bedrooms?: number;
    bathrooms?: number;
    sqft?: number;
    description?: string;
    imageUrl?: string;
    likeCount: number;
    isLiked: boolean;
    isFavorited: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatePropertyInput {
    title: string;
    location: string;
    price: number;
    bedrooms?: number;
    bathrooms?: number;
    sqft?: number;
    description?: string;
}
