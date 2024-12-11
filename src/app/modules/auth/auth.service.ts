import { AppError } from '../../utils/appError';
import { NewUser } from './auth.model';
import { TRegister } from './auth.validation';

const registerService = async (payload: TRegister) => {
  const { email } = payload;
  const isUserExist = await NewUser.findOne({ email });

  if (isUserExist) {
    throw new AppError('User already exist with the same email', 400);
  }

  try {
    const result = await NewUser.create(payload);
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

export const authServices = {
  registerService,
};
