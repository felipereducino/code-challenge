import React from 'react';

import * as St from './styles';

interface ILoading {
  status?: boolean;
}

const Loading: React.FC<ILoading> = ({ status }) => {
  return (
    <St.LoadingContainer status={status}>
      <St.LoadingSpinner />
    </St.LoadingContainer>
  );
};

export default Loading;
