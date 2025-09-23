import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { APP_CONFIG, ROUTES } from '../../constants';

const NavigationBar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: ROUTES.BOOKS, label: 'Books' },
    { path: ROUTES.NOTES, label: 'Notes' },
    { path: ROUTES.ANALYSIS, label: 'Reading Analysis' },
  ];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        minHeight: '80px',
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          justifyContent: 'space-between',
          maxWidth: 'xl',
          margin: '0 auto',
          width: '100%',
          px: 12,
          minHeight: '100px !important',
        }}
      >
        <Box
          component={Link}
          to={ROUTES.BOOKS}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
          }}
        >
          <Box
            sx={{
              width: 18,
              height: 18,
              backgroundColor: 'black',
              borderRadius: '50%',
              flexShrink: 0,
              alignSelf: 'center',
              marginTop: '2px', // Fine-tune vertical alignment
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Literata, serif',
              color: 'black',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1.8rem',
              lineHeight: 1,
            }}
          >
            {APP_CONFIG.title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {navItems.map((item, index) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              disableRipple
              sx={{
                color: location.pathname === item.path ? 'black' : '#666',
                backgroundColor: 'transparent',
                fontWeight: location.pathname === item.path ? 600 : 500,
                textTransform: 'none',
                fontSize: '1rem',
                pl: 1.5,
                pr: index === navItems.length - 1 ? 0 : 1.5,
                py: 1,
                borderRadius: 0,
                position: 'relative',
                minHeight: 'auto',
                transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: location.pathname === item.path ? '80%' : '0%',
                  height: '1px',
                  backgroundColor: 'black',
                  transition: 'width 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                },
                '&:hover': {
                  color: 'black',
                  backgroundColor: 'transparent',
                },
                '&:hover::after': {
                  width: '80%',
                },
                '&:active': {
                  backgroundColor: 'transparent',
                  transform: 'translateY(1px)',
                },
                '&.MuiButton-root': {
                  '&:active': {
                    backgroundColor: 'transparent',
                  },
                },
                '&.MuiTouchRipple-root': {
                  display: 'none',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;