import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  currentTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('themeMode');
    return (saved as ThemeMode) || 'system';
  });

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme());

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('themeMode', mode);
  };

  const currentTheme: 'light' | 'dark' = useMemo(() => {
    if (themeMode === 'system') {
      return systemTheme;
    }
    return themeMode;
  }, [themeMode, systemTheme]);

  const theme: Theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: currentTheme,
        primary: {
          main: currentTheme === 'dark' ? '#4caf50' : '#2e7d32',
          light: currentTheme === 'dark' ? '#81c784' : '#4caf50',
          dark: currentTheme === 'dark' ? '#388e3c' : '#1b5e20',
        },
        secondary: {
          main: currentTheme === 'dark' ? '#42a5f5' : '#1976d2',
          light: currentTheme === 'dark' ? '#64b5f6' : '#42a5f5',
          dark: currentTheme === 'dark' ? '#1976d2' : '#0d47a1',
        },
        background: {
          default: currentTheme === 'dark' ? '#121212' : '#fafafa',
          paper: currentTheme === 'dark' ? '#1e1e1e' : '#ffffff',
        },
        success: {
          main: currentTheme === 'dark' ? '#66bb6a' : '#4caf50',
        },
        warning: {
          main: currentTheme === 'dark' ? '#ffa726' : '#ff9800',
        },
        error: {
          main: currentTheme === 'dark' ? '#f44336' : '#d32f2f',
        },
        info: {
          main: currentTheme === 'dark' ? '#29b6f6' : '#0288d1',
        },
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
            },
          },
        },
      },
    });
  }, [currentTheme]);

  const value = {
    themeMode,
    setThemeMode,
    currentTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
