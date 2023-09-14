import { NextFunction, Response, Router, Request } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import appConfig from '../config/app';
import graphQLInstance from '../helpers/graphql-instance';
import webhooksRouter from './webhooks';
import paddleRouter from './paddle.ee';
import integrationsRouter from './integrations';

const router = Router();
const authenticate = async (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers['authorization'];
    console.log(token)

    if (token == null) {
        return response.status(401).json({ message: 'Unauthorized' });
    }

    try {
        console.log(appConfig.appSecretKey)
        const { userId } = jwt.verify(token, appConfig.appSecretKey) as {
            userId: string;
        };
        request.body.currentUser = await User.query()
            .findById(userId)
            .leftJoinRelated({
                role: true,
                permissions: true,
            })
            .withGraphFetched({
                role: true,
                permissions: true,
            });

        next();
    } catch (error) {
        // console.log(error)
        return response.status(401).json({ message: 'Unauthorized' });
    }
};

router.use('/graphql', graphQLInstance);
router.use('/webhooks', webhooksRouter);

// router.use(authenticate);
router.use('/integrations', integrationsRouter);
router.use('/paddle', paddleRouter);

export default router;
