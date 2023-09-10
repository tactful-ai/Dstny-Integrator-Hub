import { Request, Response, NextFunction } from 'express';
import getExistingAppKeys from './get-apps';

export default async function checkAppKeyUniqueness(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const appKey = req.body.key;

  const existingAppKeys = await getExistingAppKeys();

  if (existingAppKeys.includes(appKey)) {
    return res
      .status(409)
      .json({ error: `Application with ${appKey} key already exists` });
  }

  next();
}
