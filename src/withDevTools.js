import React from 'react';
import {StateInspector} from 'reinspect';


/**
 * HOC wraps provided component with app Redux devtools bridge
 * @function
 * @param {React.ComponentElement} Component - React component to wrap
 * @return {React.ElementType}
 */
export const withDevTools = Component => props =>
  (
    <StateInspector>
      <Component {...props} />
    </StateInspector>
  );
