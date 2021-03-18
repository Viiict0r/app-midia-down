import React from 'react';

import { VideoManagerProvider } from './videoManager';

export const AppProvider: React.FC = ({ children }) => (
  <VideoManagerProvider>{children}</VideoManagerProvider>
);
