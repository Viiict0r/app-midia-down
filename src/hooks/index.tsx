import React from 'react';

import { VideoManagerProvider } from './useVideoManager';
import { QualitySelectionProvider } from './useQualitySelection';

export const AppProvider: React.FC = ({ children }) => (
  <VideoManagerProvider>
    <QualitySelectionProvider>{children}</QualitySelectionProvider>
  </VideoManagerProvider>
);
