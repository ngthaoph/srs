import React, { createContext, useContext, useState } from "react";

export const ClientContext = createContext();

export function ClientProvider({ children }) {
  const [client, setClient] = useState({
    firstName: "",
    lastName: "",
  });
  const [recentList, setRecentList] = useState([
    {
      ...client,
    },
  ]);

  const [isSearched, setIsSearched] = useState(false);
  return (
    <ClientContext.Provider
      value={{
        client,
        setClient,
        isSearched,
        setIsSearched,
        recentList,
        setRecentList,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClients must be used within a ClientProvider");
  }
  return context;
}
