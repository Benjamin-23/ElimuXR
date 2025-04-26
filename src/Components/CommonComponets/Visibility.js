import React, {Fragment} from 'react';

function Visibility({visible, children}) {
  return visible && children ? children : <Fragment />;
}

Visibility.defaultProps = {
  visible: true,
};

export default Visibility;
