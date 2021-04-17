import React, { createContext, useContext, useState } from 'react';

import { VideoQuality } from './types';

interface IQualitySelectionContext {
  selectQuality: (quality: VideoQuality | null) => void;
  currentSelectedQuality: VideoQuality | null;
}

const QualitySelectionContext = createContext<IQualitySelectionContext>(
  {} as IQualitySelectionContext,
);

export const QualitySelectionProvider: React.FC = ({ children }) => {
  const [selectedQuality, setSelectedQuality] = useState<VideoQuality | null>(
    null,
  );

  const selectQuality = (quality: VideoQuality | null) => {
    setSelectedQuality(quality);
  };

  return (
    <QualitySelectionContext.Provider
      value={{
        selectQuality,
        currentSelectedQuality: selectedQuality,
      }}
    >
      {children}
    </QualitySelectionContext.Provider>
  );
};

export const useQualitySelection = () => {
  const context = useContext(QualitySelectionContext);

  if (!context) {
    throw new Error(
      'useQualitySelection must be used within an QualitySelectionProvider',
    );
  }

  return context;
};

export { VideoQuality };
