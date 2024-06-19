import httpStatus from 'http-status';
import { TLogin, TUser } from './user.interface';
import { User } from './user.model';
import config from '../../config';
import AppError from '../../errors/appErrors';
import { createToken } from './user.utils';

const registerUserIntoDB = async (userData: TUser) => {
  //checking if the user is already exist
  const user = await User.isUserExistsByEmail(userData.email);

  if (user) {
    throw new AppError(404, 'User is already exist!');
  }

  const result = await User.create(userData);

  return result;
};

const loginUserFromDB = async (payLoad: TLogin) => {
  //checking if the user is exist
  const user = await User.isUserExistsByEmail(payLoad.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User  not found!');
  }

  //checking the password is correct or not
  if (!(await User.isPasswordMatched(payLoad?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  // create token and send to the client

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  console.log('Generated token:', token);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    user: user,
    token,
  };
};

export const UsersServices = {
  registerUserIntoDB,
  loginUserFromDB,
};
