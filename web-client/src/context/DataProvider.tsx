import React, { createContext } from 'react'

export const ContextState = createContext({});


interface ContactInfoInterface{
    name: string,
    username: string
}

export default function DataProvider({ children }: any) {
  const [token, setToken] = React.useState<boolean | any>(false);
  const [contactInfo, setContactInfo] = React.useState<ContactInfoInterface>();

  React.useEffect(() => {
  }, [token, setToken])

  const state = {
    contactInfo: [contactInfo, setContactInfo]
  }

  return (
    <ContextState.Provider value={state}>
      {children}
    </ContextState.Provider>
  )
}
