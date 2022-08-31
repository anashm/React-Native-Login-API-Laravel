import React, {useContext, useState, useEffect} from 'react';

const AuthContext = React.createContext();

export function useCurrentUser() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [userID, setUserID] = useState('');

  const value_to_send = {
    userID,
    setUserID,
  };

  return (
    <AuthContext.Provider value={value_to_send}>
      {children}
    </AuthContext.Provider>
  );
}
