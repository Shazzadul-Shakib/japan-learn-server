import type { Response } from 'express';
import { ISuccessResponse } from '../utils/types';

export const sendSuccessResponse = (
  res: Response,
  payload: ISuccessResponse,
) => {
  const { message, data, status = 200 } = payload;
  return res.status(status).json({ success: true, message, data });
};
