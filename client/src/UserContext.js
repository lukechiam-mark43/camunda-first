import React from 'react'

const UserContext = React.createContext({
  id: null
})

export const UserProvider = UserContext.Provider

export default UserContext
