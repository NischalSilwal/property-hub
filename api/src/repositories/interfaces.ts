export interface UserPublic {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
}

export interface UserRow extends UserPublic {
    passwordHash: string;
    updatedAt: Date;
}

export interface IUserRepository {
    findById(id: number): Promise<UserPublic | null>;
    findByEmail(email: string): Promise<UserRow | null>;
    create(name: string, email: string, passwordHash: string): Promise<number>;
    existsByEmail(email: string): Promise<boolean>;
}

export interface PropertyRow {
    id: number;
    title: string;
    location: string;
    price: number;
    bedrooms?: number;
    bathrooms?: number;
    sqft?: number;
    description?: string;
    likeCount: number;
    isLiked: boolean;
    isFavorited: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPropertyRepository {
    findById(id: number): Promise<PropertyRow | null>;
    findByIdWithCounts(id: number, userId?: number): Promise<PropertyRow | null>;
    findAll(): Promise<PropertyRow[]>;
    findAllWithCounts(userId?: number): Promise<PropertyRow[]>;
    delete(id: number): Promise<boolean>;
}

export interface FavoriteRow {
    id: number;
    userId: number;
    propertyId: number;
    isActive: boolean;
    createdAt: Date;
}

export interface IFavoriteRepository {
    findByUserAndProperty(userId: number, propertyId: number): Promise<FavoriteRow | null>;
    findByUser(userId: number): Promise<FavoriteRow[]>;
    create(userId: number, propertyId: number): Promise<number>;
    toggle(userId: number, propertyId: number): Promise<boolean>;
    setActive(userId: number, propertyId: number, isActive: boolean): Promise<boolean>;
    delete(userId: number, propertyId: number): Promise<boolean>;
    exists(userId: number, propertyId: number): Promise<boolean>;
    findOrCreate(userId: number, propertyId: number): Promise<FavoriteRow>;
}

export interface LikeRow {
    id: number;
    userId: number;
    propertyId: number;
    createdAt: Date;
}

export interface ILikeRepository {
    findByUserAndProperty(userId: number, propertyId: number): Promise<LikeRow | null>;
    findByProperty(propertyId: number): Promise<LikeRow[]>;
    findByUser(userId: number): Promise<LikeRow[]>;
    create(userId: number, propertyId: number): Promise<number>;
    delete(userId: number, propertyId: number): Promise<boolean>;
    countByProperty(propertyId: number): Promise<number>;
    exists(userId: number, propertyId: number): Promise<boolean>;
}
