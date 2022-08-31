import React from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

const AppBarPage = () => {
  return (
    <AppBar
      position='absolute'
      color='secondary'
      elevation={1}
      sx={{
        position: 'relative',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography variant='h6' color='white' noWrap>
          🤓 Mark Gocela Technical Assessment 😎 - setvi
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarPage;
