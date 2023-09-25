import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from 'components/Layout';
import PublicLayout from 'components/PublicLayout';
import Applications from 'pages/Applications';
import Application from 'pages/Application';
import Executions from 'pages/Executions';
import Execution from 'pages/Execution';
import Flows from 'pages/Flows';
import Flow from 'pages/Flow';
import Login from 'pages/Login';
import LoginCallback from 'pages/LoginCallback';
import SignUp from 'pages/SignUp/index.ee';
import ForgotPassword from 'pages/ForgotPassword/index.ee';
import ResetPassword from 'pages/ResetPassword/index.ee';
import EditorRoutes from 'pages/Editor/routes';
import * as URLS from 'config/urls';
import settingsRoutes from './settingsRoutes';
import adminSettingsRoutes from './adminSettingsRoutes';
import Notifications from 'pages/Notifications';
import NewIntegrationAuthType from 'pages/NewIntegrationAuthType';
import NewIntegrationAuthAPIKey from 'pages/NewIntegrationAuthAPIKey';

import IntegrationPage from 'pages/integrationPage';
import OverviewPage from 'pages/overviewPage';
import MyIntegrations from 'pages/MyIntegrations';
import ActionTabs from 'pages/ActionTabs';
import TriggerTabs from 'pages/TriggerTabs';
import ListAllTriggersPage from 'pages/listAllTriggersPage';
import ListAllActionsPage from 'pages/listAllActionsPage';

export default (
  <Routes>
    <Route
      path={URLS.EXECUTIONS}
      element={
        <Layout>
          <Executions />
        </Layout>
      }
    />

    <Route
      path={URLS.EXECUTION_PATTERN}
      element={
        <Layout>
          <Execution />
        </Layout>
      }
    />
    <Route
      path={URLS.CREATE_INTEGRATION_PAGE}
      element={
        <Layout>
          <IntegrationPage />
        </Layout>
      }
    />

    <Route
      path={URLS.MY_INTEGRATIONS}
      element={
        <Layout>
          <MyIntegrations />
        </Layout>
      }
    />

    <Route
      path={`${URLS.NEW_INTEGRATION_CREATE_ACTIONS}/:appKey`}
      element={
        <Layout>
          <ActionTabs />
        </Layout>
      }
    />
    <Route
      path={`${URLS.NEW_INTEGRATION_LIST_TRIGGERS}/:appKey`}
      element={
        <Layout>
          <ListAllTriggersPage />
        </Layout>
      }
    />
    <Route
      path={`${URLS.NEW_INTEGRATION_LIST_ACTIONS}/:appKey`}
      element={
        <Layout>
          <ListAllActionsPage />
        </Layout>
      }
    />

    <Route
      path={`${URLS.NEW_INTEGRATION_CREATE_TRIGGERS}/:appKey`}
      element={
        <Layout>
          <TriggerTabs />
        </Layout>
      }
    />


    <Route
      path={`${URLS.NEW_INTEGRATION_OVERVIEW}/:appKey`}
      element={
        <Layout>
          <OverviewPage />
        </Layout>
      }
    />
    <Route
      path={URLS.FLOWS}
      element={
        <Layout>
          <Flows />
        </Layout>
      }
    />


    <Route
      path={URLS.FLOW_PATTERN}
      element={
        <Layout>
          <Flow />
        </Layout>
      }
    />

    <Route element={<Layout><NewIntegrationAuthType /></Layout>} path={`${URLS.NEW_INTEGRATION_AUTH_TYPE}/:appKey`} />

    <Route element={<Layout><NewIntegrationAuthAPIKey /></Layout>} path={`${URLS.NEW_INTEGRATION_AUTH_API_KEY}/:appKey`} />




    <Route
      path={`${URLS.APPS}/*`}
      element={
        <Layout>
          <Applications />
        </Layout>
      }
    />

    <Route
      path={`${URLS.APP_PATTERN}/*`}
      element={
        <Layout>
          <Application />
        </Layout>
      }
    />

    <Route path={`${URLS.EDITOR}/*`} element={<EditorRoutes />} />

    <Route
      path={URLS.LOGIN}
      element={
        <PublicLayout>
          <Login />
        </PublicLayout>
      }
    />

    <Route
      path={URLS.LOGIN_CALLBACK}
      element={<LoginCallback />}
    />

    <Route
      path={URLS.SIGNUP}
      element={
        <PublicLayout>
          <SignUp />
        </PublicLayout>
      }
    />

    <Route
      path={URLS.FORGOT_PASSWORD}
      element={
        <PublicLayout>
          <ForgotPassword />
        </PublicLayout>
      }
    />

    <Route
      path={URLS.RESET_PASSWORD}
      element={
        <PublicLayout>
          <ResetPassword />
        </PublicLayout>
      }
    />

    <Route
      path={URLS.UPDATES}
      element={
        <Layout>
          <Notifications />
        </Layout>
      }
    />

    <Route path="/" element={<Navigate to={URLS.FLOWS} replace />} />

    <Route path={URLS.SETTINGS}>{settingsRoutes}</Route>

    <Route path={URLS.ADMIN_SETTINGS}>{adminSettingsRoutes}</Route>

    <Route
      element={
        <Layout>
          <div>404</div>
        </Layout>
      }
    />


  </Routes>
);
