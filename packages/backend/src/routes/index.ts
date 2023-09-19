import { NextFunction, Response, Router, Request } from 'express';
import jwt from 'jsonwebtoken';
import appConfig from '../config/app';
import graphQLInstance from '../helpers/graphql-instance';
import webhooksRouter from './webhooks';
import paddleRouter from './paddle.ee';
import integrationsRouter from './integrations';

import multer from 'multer';
const router = Router();
const authenticate = async (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers['authorization'];

    if (!token || !token.startsWith('Bearer ')) {
        return response.status(401).json({ message: 'Unauthorized' });
    }

    const tokenPart = token.split(' ')[1];

    try {
        const { userId } = jwt.verify(tokenPart, appConfig.appSecretKey) as {
            userId: string;
        };
        request.body.userId = userId;

        next();
    } catch (error) {
        return response.status(401).json({ message: 'Unauthorized' });
    }
};

router.use('/graphql', graphQLInstance);
router.use('/webhooks', webhooksRouter);
router.use('/paddle', paddleRouter);

const storage = multer.memoryStorage(); 
const upload = multer({ storage });
router.use(upload.single('logo'))

router.use(authenticate);
router.use('/integrations', integrationsRouter);

export default router;
