import React, { useState } from "react";

import { StyledNavbarLink, StyledNavbar, StyledMenuButton } from "./Navbar.css";
import styled from "styled-components";
import QuickSearch from "./QuickSearch.jsx";
import RecentList from "./RecentList.jsx";

function Navbar() {
  const [activePage, setActivePage] = useState("");
  function handleActivePage(page) {
    setActivePage(page);
  }

  return (
    <StyledNavbar>
      <StyledNavbarLink href="/home">
        <StyledMenuButton
          onClick={() => handleActivePage("home")}
          className="visited"
        >
          Home
        </StyledMenuButton>
      </StyledNavbarLink>{" "}
      <StyledNavbarLink href="/persons">
        <StyledMenuButton
          to="/persons"
          onClick={() => handleActivePage("persons")}
        >
          Persons
        </StyledMenuButton>
      </StyledNavbarLink>
      <StyledNavbarLink href="notes">
        <StyledMenuButton to="/days" onClick={() => handleActivePage("days")}>
          Days
        </StyledMenuButton>
      </StyledNavbarLink>
      <StyledNavbarLink href="admin">
        {" "}
        <StyledMenuButton to="/admin" onClick={() => handleActivePage("admin")}>
          Admin
        </StyledMenuButton>
      </StyledNavbarLink>
      <StyledNavbarLink href="login">
        {" "}
        <StyledMenuButton to="/login" onClick={() => handleActivePage("login")}>
          Log In
        </StyledMenuButton>
      </StyledNavbarLink>
      <RecentList />
      <QuickSearch />
    </StyledNavbar>
  );
}

export default Navbar;
