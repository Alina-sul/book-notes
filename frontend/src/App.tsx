import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import './App.css';
import { theme } from './theme';
import { AppRoutes } from './routes';
import NavigationBar from './components/Layout/NavigationBar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <NavigationBar />
          <AppRoutes />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
