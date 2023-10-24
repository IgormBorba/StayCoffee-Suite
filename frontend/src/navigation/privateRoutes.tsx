import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

const PrivateRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const { signed } = useContext(AuthContext);
  return signed ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
