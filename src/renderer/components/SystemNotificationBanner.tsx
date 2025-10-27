import React from 'react';
import { Alert, AlertTitle, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface SystemNotification {
  id: number;
  message: string;
  title?: string;
  type: 'info' | 'warning' | 'error' | 'success';
  dismissible: boolean;
  active: boolean;
  createdAt: string;
  expiresAt?: string;
}

interface SystemNotificationBannerProps {
  notification: SystemNotification | null;
  onDismiss?: (id: number) => void;
}

const SystemNotificationBanner: React.FC<SystemNotificationBannerProps> = ({ notification, onDismiss }) => {
  if (!notification || !notification.active) {
    return null;
  }

  // Check if notification has expired
  if (notification.expiresAt && new Date(notification.expiresAt) < new Date()) {
    return null;
  }

  return (
    <Collapse in={true}>
      <Alert
        severity={notification.type}
        sx={{
          borderRadius: 0,
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
        action={
          notification.dismissible && onDismiss ? (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => onDismiss(notification.id)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          ) : undefined
        }
      >
        {notification.title && <AlertTitle>{notification.title}</AlertTitle>}
        {notification.message}
      </Alert>
    </Collapse>
  );
};

export default SystemNotificationBanner;
