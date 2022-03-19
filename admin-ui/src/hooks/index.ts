import { AuthContext } from 'contexts/auth';
import { useContext } from 'react';

export const useAuth = () => useContext(AuthContext);
