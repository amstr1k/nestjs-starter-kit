export interface IReadableUser extends Document {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  accessToken?: string;
}
