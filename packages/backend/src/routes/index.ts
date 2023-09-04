import { Router } from 'express';
import graphQLInstance from '../helpers/graphql-instance';
import webhooksRouter from './webhooks';
import paddleRouter from './paddle.ee';
import integrationsRouter from './integrations';

const router = Router();

router.use('/graphql', graphQLInstance);
router.use('/webhooks', webhooksRouter);
router.use('/integrations', integrationsRouter);
router.use('/paddle', paddleRouter);

export default router;
