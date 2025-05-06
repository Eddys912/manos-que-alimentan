import { IUserProps } from '../../domain/interfaces/IUserProps';

export type UserDTO = Omit<
  IUserProps,
  'password' | 'created_at' | 'updated_at'
>;
