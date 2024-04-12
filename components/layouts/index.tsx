import React, { useEffect } from "react";
import { useRouter } from "next/router";

// components
import Header from "components/uiElements/header";
import Container from "components/layouts/container";

// context
import { useStateValue } from "context/StateProvider";

// utils
import { saveCookie } from "utils/storageHelper";

// services
import { getUser } from "services/user";
import Sidebar from "./sidebar";

const Layout = ({ children }: { children: React.JSX.Element }) => {
  const { setCurrentUser, currentUser } = useStateValue();
  const { pathname } = useRouter();

  const headerUrls = ["/login", "/register", "/onboarding"];

  const isHeaderURL = headerUrls?.some(
    (url) => pathname.includes(url) || pathname === "/"
  );

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage?.getItem("user") as string);

      fetchUserData(user?._id);
    } catch (err) {
      console.log({ err });
      return;
    }
  }, []);

  const fetchUserData = async (userId: string) => {
    const { response } = await getUser(userId);

    if (response) {
      setCurrentUser(response?.data);

      const user = { ...response?.data };

      delete user[response?.data?.userType];

      localStorage.setItem("user", JSON.stringify(user));

      console.log({ user });

      saveCookie("user", JSON.stringify(user));
    }
  };

  return (
    <>
      {isHeaderURL && <Header />}
      {!isHeaderURL && <Sidebar userType={currentUser?.userType} />}
      {isHeaderURL ? children : <Container>{children}</Container>}
    </>
  );
};

export default Layout;
