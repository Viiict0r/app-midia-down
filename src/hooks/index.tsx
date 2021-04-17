import React from 'react';

import { VideoManagerProvider } from './useVideoManager';

export const AppProvider: React.FC = ({ children }) => (
  <VideoManagerProvider>{children}</VideoManagerProvider>
);
