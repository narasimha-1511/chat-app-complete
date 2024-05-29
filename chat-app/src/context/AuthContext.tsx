import React, {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthUser = {
  fullName: string;
  userName: string;
  _id: string;
  profilePic: string;
};

export const AuthContext = createContext<Partial<AuthContextType>>({});

export const useAuthContext = () => useContext(AuthContext);

export interface AuthContextType {
  authUser: AuthUser | undefined;
  setAuthUser: Dispatch<SetStateAction<AuthUser>> | undefined;
}

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState<AuthUser>({
    fullName: "",
    userName: "",
    _id: "",
    profilePic: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("chat-user");
    try {
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setAuthUser(user);
      }
    } catch (error) {
      console.error("Error while parsing the json data", error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}
