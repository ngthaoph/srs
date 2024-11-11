import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Navbar from "../layout/navbar/Navbar";

import { StyledApp, StyledLayout } from "./Layout.css";
import SRSMainContainer from "../common/SRSMainContainer";
import SRSTab from "../common/SRSTabs";

const Layout = () => (
  <StyledApp>
    <Header />

    <Navbar />

    <StyledLayout>
      <SRSMainContainer />
      <Outlet />
    </StyledLayout>
  </StyledApp>
);

export default Layout;
