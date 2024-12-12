import config from '../../config';
import {
  comparePassword,
  encryptPassword,
} from '../../helpers/encryptionHelper';
import { AppError } from '../../utils/appError';
import { User } from './auth.model';
import { TLogin, TRegister } from './auth.validation';
import jwt from 'jsonwebtoken';

// --- Create new user --- //
const registerService = async (payload: TRegister) => {
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError('User already exist with the same email', 400);
  }

  try {
    const hashedPassword = await encryptPassword(password);

    const result = await User.create({
      ...payload,
      password: hashedPassword,
    });
    return {
      success: true,
      status: 200,
      message: 'New user created successfully',
      data: result,
    };
  } catch (error) {
    throw new AppError(
      'Failed to create a new user. Please try again later.',
      500,
    );
  }
};

// --- Login user --- //
const loginUserService = async (payload: TLogin) => {
  const { email, password } = payload;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError('User not found!', 404);
  }

  // --- Extract user info --- //
  const { password: hashedPassword, ...loggeedUserInfo } = user.toObject();
  const { _id } = loggeedUserInfo;
  const userId = _id.toString();

  // --- compare password --- //
  const passwordIsMatched = await comparePassword(password, hashedPassword);
  if (!passwordIsMatched) {
    throw new AppError('Invalid password', 400);
  }

  // --- apply jwt --- //
  const secret = config.secret;
  if (!secret) {
    throw new AppError('TOken secret is not defined', 404);
  }

  // --- create jwt token --- //
  const token = jwt.sign({ userId }, secret, { expiresIn: '1d' });

  // --- if everything okay then logged in --- //
  return {
    success: true,
    status: 200,
    message: 'User Logged in successfully',
    data: loggeedUserInfo,
    token,
  };
};

// --- Get all users --- //
const getAllUserService = async () => {
  const result = await User.find(
    {},
    {
      userName: 1,
      email: 1,
      role: 1,
    },
  );

  return {
    success: true,
    status: 200,
    message: 'Users retrived successfully',
    data: result,
  };
};

// --- Export all services --- //
export const authServices = {
  registerService,
  loginUserService,
  getAllUserService,
};
