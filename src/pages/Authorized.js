import React from 'react';

const Authorized = ({ children }) => <div>{children}</div>;
function AuthComponent({ children, location, routerData }) {
  return (
    <Authorized>
      {children}
    </Authorized>
  );
}
export default AuthComponent;
