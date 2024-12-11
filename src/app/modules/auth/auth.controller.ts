import { sendSuccessResponse } from '../../helpers/responseHelper';
import { catchAsync } from '../../middleware/catchAsync';
import { authServices } from './auth.service';

// --- Create user --- //
const registerUser = catchAsync(async (req, res) => {
  const newUserInfo = req.body;
  const result = await authServices.registerService(newUserInfo);

  sendSuccessResponse(res, {
    message: result.message,
    status: result.status,
    data: result.data,
  });
});

// --- login user --- //
const loginUser = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const result = await authServices.loginUserService(userInfo);

  // --- set token to cookies --- //
  if (result.success) {
    res.cookie('access_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });
  }

  sendSuccessResponse(res, {
    message: result.message,
    status: result.status,
    data: result.data,
  });
});

// --- Logout user --- //
const logoutUser = catchAsync(async (_, res) => {
  res.clearCookie('access_token');

  sendSuccessResponse(res, {
    message: 'User logged out successfully.',
    data: {},
  });
});

// --- Export all controller --- //
export const authController = {
  registerUser,
  loginUser,
  logoutUser,
};
