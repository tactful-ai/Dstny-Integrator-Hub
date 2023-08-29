import express, { Router } from 'express';

import { IRequest } from '@automatisch/types';
import appConfig from '../config/app';
import createApp from '../controllers/integrations/create-app';
import createAuth from '../controllers/integrations/create-auth';

const router = Router();

router.use(
  express.text({
    limit: appConfig.requestBodySizeLimit,
    verify(req, res, buf) {
      (req as IRequest).rawBody = buf;
    },
  })
);

router.post('/create', createApp);
router.post('/auth/apikey/:appkey', createAuth);

export default router;
