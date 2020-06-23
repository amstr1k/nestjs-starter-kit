import { IUser } from '../interfaces/user.interface';
import { IReadableUser } from '../interfaces/readable-user.interface';

export function mapToReadableUser(user: IUser, accessToken?: string): IReadableUser {
    return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        accessToken: accessToken
    } as IReadableUser;

}
