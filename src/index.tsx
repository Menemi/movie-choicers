import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationProvider } from './modules/Notification/NotificationProvider';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root')!);
root.render(
    <NotificationProvider>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </NotificationProvider>,
);
