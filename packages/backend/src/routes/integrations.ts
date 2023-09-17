import express, { Router } from 'express';

import { IRequest } from '@automatisch/types';
import appConfig from '../config/app';
import createApp from '../controllers/integrations/create-app';
import createAuth from '../controllers/integrations/create-auth';
import uniqueApp from '../controllers/integrations/unique-app';
import createTrigger from '../controllers/integrations/create-polling-trigger';
const router = Router();

router.use(
  express.text({
    limit: appConfig.requestBodySizeLimit,
    verify(req, res, buf) {
      (req as IRequest).rawBody = buf;
    },
  })
);

/**
 * @openapi
 * info:
 *   title: Create App API
 *   version: 1.0.0
 *   description: Endpoint to create a new app.
 * paths:
 *   /integrations/create:
 *     post:
 *       summary: Create a new app
 *       description: Create a new app with the specified configuration.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the app. (Required)
 *                 key:
 *                   type: string
 *                   description: The key of the app. (Required)
 *                 iconUrl:
 *                   type: string
 *                   description: The URL to the app's icon. (Optional)
 *                 authDocUrl:
 *                   type: string
 *                   description: URL to the authentication documentation. (Optional)
 *                 supportsConnections:
 *                   type: boolean
 *                   description: Indicates if the app supports connections. (Required)
 *                 baseUrl:
 *                   type: string
 *                   description: The base URL of the app. (Optional)
 *                 apiBaseUrl:
 *                   type: string
 *                   description: The base URL of the app's API. (Required)
 *                 primaryColor:
 *                   type: string
 *                   description: The primary color of the app. (Optional)
 *
 *       responses:
 *         '200':
 *           description: App created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   message:
 *                     type: string
 *           example:
 *             success: true
 *             message: App created successfully.
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '500':
 *           description: Internal server error.
 *
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: integer
 *
 */
router.post('/create', uniqueApp, createApp);

/**
 * @openapi
 * info:
 *   title: Create Authentication API
 *   version: 1.0.0
 *   description: Endpoint to create authentication for an app.
 * paths:
 *   /integrations/auth/apikey/{appkey}:
 *     post:
 *       summary: Create authentication for an app
 *       description: Create authentication for an app using the provided configuration.
 *       parameters:
 *         - in: path
 *           name: appkey
 *           schema:
 *             type: string
 *           required: true
 *           description: The key of the app for which authentication is created.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fields:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *                         description: The field key.
 *                       label:
 *                         type: string
 *                         description: The field label.
 *                       type:
 *                         type: string
 *                         description: The field type.
 *                       required:
 *                         type: boolean
 *                         description: Indicates if the field is required. (Required)
 *                       readOnly:
 *                         type: boolean
 *                         description: Indicates if the field is read-only. (Optional)
 *                       value:
 *                         type: any
 *                         description: The field's initial value. (Optional)
 *                       placeholder:
 *                         type: any
 *                         description: The field's placeholder value. (Optional)
 *                       description:
 *                         type: string
 *                         description: Description of the field. (Optional)
 *                       clickToCopy:
 *                         type: boolean
 *                         description: Indicates if the field can be clicked to copy its value. (Optional)
 *                 verifyEndpoint:
 *                   type: string
 *                   description: The verification endpoint for the authentication.
 *
 *       responses:
 *         '200':
 *           description: Authentication created successfully.
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '500':
 *           description: Internal server error.
 *
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: integer
 *
 */
router.post('/auth/apikey/:appkey', createAuth);

/**
 * @openapi
 * info:
 *   title: Create Polling Trigger API
 *   version: 1.0.0
 *   description: Endpoint to create a polling trigger for an app.
 * paths:
 *   /integrations/trigger/polling/{appkey}:
 *     post:
 *       summary: Create a polling trigger for an app
 *       description: Create a polling trigger for an app using the provided configuration.
 *       parameters:
 *         - in: path
 *           name: appkey
 *           schema:
 *             type: string
 *           required: true
 *           description: The key of the app for which the polling trigger is created.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the polling trigger. (Required)
 *                 key:
 *                   type: string
 *                   description: The key of the polling trigger. (Required)
 *                 pollInterval:
 *                   type: integer
 *                   description: The polling interval in seconds. (Required)
 *                 description:
 *                   type: string
 *                   description: Description of the polling trigger. (Optional)
 *                 run:
 *                   type: string
 *                   description: JavaScript code defining the polling logic. (Required)
 *
 *       responses:
 *         '200':
 *           description: Polling trigger created successfully.
 *         '400':
 *           description: Bad request. Invalid input data.
 *         '500':
 *           description: Internal server error.
 *
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: integer
 *
 */
router.post('/trigger/polling/:appkey', createTrigger);

export default router;
