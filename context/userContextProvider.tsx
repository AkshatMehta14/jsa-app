import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AccountType, User } from "../types/database/users";
import React, { createContext, useContext, useState } from "react";
import { auth, firestore } from "../app/firebase";
import { collection, addDoc } from "firebase/firestore";

interface UserCtx {
  user?: UserCredential;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signUp: (
    name: string,
    chapter: string,
    email: string,
    password: string
  ) => Promise<boolean>;
}

const UserContext = createContext<UserCtx>(null as any);

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserCredential>();

  const login = async (email: string, password: string) => {
    const userData = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((err) => console.log(err));

    if (!userData) return false;
    setUser(userData);
    return true;
  };

  const logout = () => {
    signOut(auth);
    setUser(undefined);
  };

  const signUp = async (
    name: string,
    chapter: string,
    email: string,
    password: string
  ) => {
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((err) => console.log(err));

    if (!userData) return false;
    setUser(userData);
    addDoc(collection(firestore, "users"), {
      name,
      chapter,
      email,
      accountType: AccountType.DEBATER,
    } as User);
    return true;
  };

  return (
    <UserContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </UserContext.Provider>
  );
};
