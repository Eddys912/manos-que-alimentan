import { IFoodProps } from '../../domain/interfaces/IFoodProps';

export type FoodDTO = Omit<IFoodProps, 'created_at' | 'updated_at'>;
