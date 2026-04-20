import { z } from 'zod';

export const createPropertySchema = z.object({
    title: z
        .string()
        .min(2, 'Title must be at least 2 characters')
        .max(255, 'Title must be at most 255 characters'),
    location: z
        .string()
        .min(2, 'Location must be at least 2 characters')
        .max(255, 'Location must be at most 255 characters'),
    price: z
        .string()
        .min(1, 'Price is required'),
    bedrooms: z
        .number()
        .int('Bedrooms must be an integer')
        .min(0, 'Bedrooms must be at least 0')
        .optional(),
    bathrooms: z
        .number()
        .int('Bathrooms must be an integer')
        .min(0, 'Bathrooms must be at least 0')
        .optional(),
    sqft: z
        .number()
        .int('Sqft must be an integer')
        .min(0, 'Sqft must be at least 0')
        .optional(),
    description: z
        .string()
        .max(2000, 'Description must be at most 2000 characters')
        .optional(),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;