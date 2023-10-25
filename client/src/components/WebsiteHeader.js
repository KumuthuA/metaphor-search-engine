import React from 'react';
import { Typography, Container } from '@mui/material';

const WebsiteHeader = ({ title, subtitle }) => {
  return (
    <Container>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h3" component="h1">
          {title}
        </Typography>
        <Typography variant="subtitle1" component="h2" style={{ color: 'gray' }}>
          {subtitle}
        </Typography>
      </div>
    </Container>
  );
};

export default WebsiteHeader;
