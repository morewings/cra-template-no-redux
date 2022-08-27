import React from 'react';
import {StateInspector} from 'reinspect';

export const withDevTools = WrappedComponent => props =>
  (
    <StateInspector>
      <WrappedComponent {...props} />
    </StateInspector>
  );
