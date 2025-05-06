import { FoodDTO } from '../../application/dtos/foodDTO';
import { FoodStatus } from '../enums/FoodEnum';
import { IFoodProps } from '../interfaces/IFoodProps';

export class Food {
  private id: string;
  private foodName: string;
  private image: string;
  private category: string;
  private expirationDate: Date;
  private quantity: number;
  private status: FoodStatus;
  private created_at: Date;
  private updated_at: Date | null;

  constructor(props: IFoodProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.foodName = props.food_name;
    this.image = props.image;
    this.category = props.category;
    this.expirationDate = props.expiration_date;
    this.quantity = props.quantity;
    this.status = props.status ?? FoodStatus.AVAILABLE;
    this.created_at = props.created_at ?? new Date();
    this.updated_at = props.updated_at ?? null;
  }

  public toDTO(): FoodDTO {
    return {
      id: this.id,
      food_name: this.foodName,
      image: this.image,
      category: this.category,
      expiration_date: this.expirationDate,
      quantity: this.quantity,
      status: this.status,
    };
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
    return this.created_at;
  }

  getUpdatedAt(): Date | null {
    return this.updated_at;
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
}
