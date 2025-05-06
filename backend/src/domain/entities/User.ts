import { UserDTO } from '../../application/dtos/userDTO';
import {
  validateRole,
  validateUserType,
} from '../../shared/utils/UserValidationTypeAndRole';
import { UserRole, UserType } from '../enums/UserEnum';
import { IUserProps } from '../interfaces/IUserProps';

export class User {
  private id: string;
  private firstName: string;
  private lastName: string;
  private middleName: string | null;
  private birthDate: Date;
  private email: string;
  private password: string;
  private role: UserRole;
  private phone: string | null;
  private address: string;
  private user_type: UserType;
  private created_at: Date;
  private updated_at: Date | null;

  constructor(props: IUserProps) {
    this.id = props.id ?? crypto.randomUUID();
    this.firstName = props.first_name;
    this.lastName = props.last_name;
    this.middleName = props.middle_name ?? null;
    this.birthDate = props.birth_date;
    this.email = props.email;
    this.password = props.password;
    this.role = validateRole(props.role);
    this.phone = props.phone ?? null;
    this.address = props.address;
    this.user_type = validateUserType(props.user_type);
    this.created_at = props.created_at ?? new Date();
    this.updated_at = props.updated_at ?? null;
  }

  public toDTO(): UserDTO {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
      middle_name: this.middleName,
      birth_date: this.birthDate,
      email: this.email,
      phone: this.phone,
    };
  }

  getId(): string {
    return this.id;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getMiddleName(): string | null {
    return this.middleName;
  }

  getBirthDate(): Date {
    return this.birthDate;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getRole(): UserRole {
    return this.role;
  }

  getPhone(): string | null {
    return this.phone;
  }

  getAddress(): string {
    return this.address;
  }

  getUserType(): UserType {
    return this.user_type;
  }

  getCreatedAt(): Date {
    return this.created_at;
  }

  getUpdatedAt(): Date | null {
    return this.updated_at;
  }

  setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  setMiddleName(middleName: string): void {
    this.middleName = middleName;
  }

  setBirthDate(birthDate: Date): void {
    this.birthDate = birthDate;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  setRole(role: UserRole): void {
    this.role = role;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  setUserType(user_type: UserType): void {
    this.user_type = user_type;
  }
}
