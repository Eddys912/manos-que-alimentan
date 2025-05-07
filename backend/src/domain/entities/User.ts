import {
  validateRole,
  validateUserStatus,
  validateUserType,
} from '../../shared/utils/UserValidations';
import { UserRole, UserStatus, UserType } from '../enums/UserEnum';
import { IUserProps } from '../interfaces/IUser';

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
  private userType: UserType;
  private status: UserStatus;
  private createdAt: Date;
  private updatedAt: Date | null;

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
    this.userType = validateUserType(props.user_type);
    this.status = validateUserStatus(props.status);
    this.createdAt = props.created_at ?? new Date();
    this.updatedAt = props.updated_at ?? null;
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
    return this.userType;
  }

  getStatus(): UserStatus {
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

  setUserType(userType: UserType): void {
    this.userType = userType;
  }

  setStatus(status: UserStatus): void {
    this.status = status;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
