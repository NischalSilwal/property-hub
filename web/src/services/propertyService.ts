import { api } from './api';
import type { Property, CreatePropertyInput } from '../interfaces';
import type { LikeResponse } from '../interfaces/like';
import type { FavoriteResponse } from '../interfaces/favorite';

class PropertyService {
    async getAll(): Promise<Property[]> {
        return api.get<Property[]>('/properties/');
    }

    async getById(id: number): Promise<Property> {
        return api.get<Property>(`/properties/${id}`);
    }

    async create(data: CreatePropertyInput): Promise<Property> {
        return api.post<Property>('/properties/', data);
    }

    async toggleLike(propertyId: number): Promise<LikeResponse> {
        return api.post<LikeResponse>('/likes/', { propertyId });
    }

    async checkLike(propertyId: number): Promise<LikeResponse> {
        return api.get<LikeResponse>(`/likes/${propertyId}/check`);
    }

    async getFavorites(): Promise<Property[]> {
        return api.get<Property[]>('/favourites/');
    }

    async toggleFavorite(propertyId: number): Promise<{ isFavorited: boolean }> {
        return api.post<{ isFavorited: boolean }>('/favorites/toggle', { propertyId });
    }

    async addFavorite(propertyId: number): Promise<void> {
        await api.post('/favourites/', { propertyId });
    }

    async removeFavorite(propertyId: number): Promise<void> {
        await api.delete(`/favourites/${propertyId}`);
    }

    async checkFavorite(propertyId: number): Promise<FavoriteResponse> {
        return api.get<FavoriteResponse>(`/favourites/${propertyId}/check`);
    }
}

export const propertyService = new PropertyService();
