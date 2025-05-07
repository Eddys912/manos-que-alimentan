import { FoodStatus } from '../enums/FoodEnum';
import { IFoodProps } from '../interfaces/IFood';

export class Food {
  private id: string;
  private foodName: string;
  private image: string;
  private category: string;
  private expirationDate: Date;
  private quantity: number;
  private status: FoodStatus;
  private createdAt: Date;
  private updatedAt: Date | null;

  constructor(props: IFoodProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.foodName = props.food_name;
    this.image = props.image;
    this.category = props.category;
    this.expirationDate = props.expiration_date;
    this.quantity = props.quantity;
    this.status = props.status ?? FoodStatus.AVAILABLE;
    this.createdAt = props.created_at ?? new Date();
    this.updatedAt = props.updated_at ?? null;
  }

  getId(): string {
    return this.id;
  }

  getFoodName(): string {
    return this.foodName;
  }

  getImage(): string {
    return this.image;
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

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date | null {
    return this.updatedAt;
  }

  setId(id: string): void {
    this.id = id;
  }

  setFoodName(foodName: string): void {
    this.foodName = foodName;
  }

  setImage(image: string): void {
    this.image = image;
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
