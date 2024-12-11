import { catchAsync } from '../../middleware/catchAsync';
import { authServices } from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const newUserInfo = req.body;
  const result = await authServices.registerService(newUserInfo);
  res.status(result.status).json({
    message: result.message,
    success: result.success,
    data: result.data,
  });
});

export const authController = {
  registerUser,
};
