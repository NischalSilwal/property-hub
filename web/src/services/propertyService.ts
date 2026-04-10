import { api } from './api';
import type { Property, CreatePropertyInput, LikeResponse, FavoriteResponse } from '../interfaces';

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
        return api.get<Property[]>('/favorites/');
    }

    async toggleFavorite(propertyId: number): Promise<FavoriteResponse> {
        return api.post<FavoriteResponse>('/favorites/toggle', { propertyId });
    }

    async addFavorite(propertyId: number): Promise<void> {
        await api.post('/favorites/toggle', { propertyId });
    }

    async removeFavorite(propertyId: number): Promise<void> {
        await api.delete(`/favorites/${propertyId}`);
    }

    async checkFavorite(propertyId: number): Promise<FavoriteResponse> {
        return api.get<FavoriteResponse>(`/favorites/${propertyId}/check`);
    }
}

export const propertyService = new PropertyService();
