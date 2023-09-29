import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import useFormatMessage from 'hooks/useFormatMessage';
import AppIcon from 'components/AppIcon';
import * as URLS from 'config/urls';
import type { AppConfig } from '@automatisch/types';

import { CardContent, Typography } from '../AppRow/style';

type IntegrationRowProps = {
  integration: AppConfig;
};

const countTranslation = (value: React.ReactNode) => (
  <>
    <Typography variant="body1">{value}</Typography>
    <br />
  </>
);

function IntegrationRow({integration}: IntegrationRowProps): React.ReactElement {
  const { name, primaryColor, iconUrl, id } = integration;

  return (
    <Link to={URLS.NEW_INTEGRATION_OVERVIEW_PAGE(id)} data-test="integration-row">
      <Card sx={{ mb: 1 }}>
        <CardActionArea>
          <CardContent>
            <Box>
              <AppIcon name={name} url={iconUrl} color={primaryColor} />
            </Box>

            <Box>
              <Typography variant="h6">{name}</Typography>
            </Box>

            <Box>
              <ArrowForwardIosIcon
                sx={{ color: (theme) => theme.palette.primary.main }}
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default IntegrationRow;
