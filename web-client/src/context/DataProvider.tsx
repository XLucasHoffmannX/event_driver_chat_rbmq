import React, { createContext } from 'react';
import Cookies from 'js-cookie';
import NotifyApi from '../app/api/NotifyApi';
import { UserApi } from '../app/api/UserApi';
import UsersOnline from '../app/api/UsersOnline';

export const ContextState = createContext({});

interface ContactInfoInterface {
  name: string,
  username: string,
  image: string,
  id: string,
  private_room: string
}

export default function DataProvider({ children }: any) {
  const [token, setToken] = React.useState<boolean | any>(false);
  const [contactInfo, setContactInfo] = React.useState<ContactInfoInterface>();

  React.useEffect(() => {
    setToken(Cookies.get('access-token'));
  }, [token, setToken])

  const state = {
    userApi: UserApi(token),
    contactInfo: [contactInfo, setContactInfo],
    notifyGeral: NotifyApi(),
    usersOnline: UsersOnline()
  }

  return (
    <ContextState.Provider value={state}>
      {children}
    </ContextState.Provider>
  )
}
