import React, {useContext, useState} from 'react';

const IpContext = React.createContext();
const IpUpdateContext = React.createContext();

export function useIp() {
  return useContext(IpContext);
}

export function useUpdateIp() {
  return useContext(IpUpdateContext);
}

export default function IpProvider({children}) {
  const [ip, setIp] = useState('192.168.64.110:3000');

  const updateIp = (newIp) => {
    setIp(newIp);
  };

  return (
    <IpContext.Provider value={ip}>
      <IpUpdateContext.Provider value={updateIp}>
        {children}
      </IpUpdateContext.Provider>
    </IpContext.Provider>
  );
}
