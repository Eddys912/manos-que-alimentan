import { validateFoodStatus } from '../../shared/utils/foodValidations';
import { FoodStatus } from '../enums/Food.enum';
import { IFoodProps } from '../interfaces/IFood';

/**
 * Domain entity representing a food.
 * Contains business rules and validation for food attributes.
 */
export class Food {
  private id: string;
  private foodName: string;
  private imageUrl: string;
  private category: string;
  private expirationDate: Date;
  private quantity: number;
  private status: FoodStatus;
  private createdAt?: Date;
  private updatedAt?: Date;

  /**
   * Constructs a new Food entity.
   * @param {IFoodProps} props - Properties required to create a food.
   */
  constructor(props: IFoodProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.foodName = props.food_name;
    this.imageUrl = props.image_url;
    this.category = props.category;
    this.expirationDate = props.expiration_date;
    this.quantity = props.quantity;
    this.status = validateFoodStatus(props.status);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  getId(): string {
    return this.id;
  }

  getFoodName(): string {
    return this.foodName;
  }

  getImageURL(): string {
    return this.imageUrl;
  }

  getCategory(): string {
    return this.category;
  }

  getExpirationDate(): Date {
    return this.expirationDate;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getStatus(): FoodStatus {
    return this.status;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  setId(id: string): void {
    this.id = id;
  }

  setFoodName(foodName: string): void {
    this.foodName = foodName;
  }

  setImage(imageUrl: string): void {
    this.imageUrl = imageUrl;
  }

  setCategory(category: string): void {
    this.category = category;
  }

  setExpirationDate(expiration_date: Date): void {
    this.expirationDate = expiration_date;
  }

  setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  setStatus(status: FoodStatus): void {
    this.status = status;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
