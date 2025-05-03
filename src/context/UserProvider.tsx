import React, { createContext, useContext, useState } from "react";

type UserDetails = {
  fullName: string;
  email: string;
  phone: string;
};

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

type UserProviderProps = {
  children: React.ReactNode;
};

type UserProviderState = {
  userDetails: UserDetails | null;
  addresses: Address[] | null;
  updateUserDetails: (details: UserDetails) => void;
  clearUserDetails: () => void;
  updateAddresses: (addresses: Address[]) => void;
};

const UserContext = createContext<UserProviderState | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [addresses, setAddresses] = useState<Address[] | null>(null);

  const updateUserDetails = (details: UserDetails) => setUserDetails(details);

  const clearUserDetails = () => setUserDetails(null);

  const updateAddresses = (addresses: Address[]) => setAddresses(addresses);

  return (
    <UserContext.Provider value={{ userDetails, addresses, updateUserDetails, clearUserDetails, updateAddresses }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
