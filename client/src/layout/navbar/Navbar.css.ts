import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledNavbar = styled.div`
  overflow: auto;
  height: 100%;
  position: fixed;
  top: 45px;
  left: 0;
  width: 160px;
  background: #f1f1f1;
  z-index: 10;
  border-right: 1px solid #fff;
`;

export const StyledNavbarLinkContainer = styled.div`
  margin: 0;
  padding: 0;

  margin-bottom: 1px;
  background: #31aae9;
`;
export const StyledNavbarLink = styled.a`
  font-size: 14px;
  line-height: 28px;
  font-weight: 400;
  color: #fff;
  text-align: center;
  text-decoration: none;

  &:link,
  &:visited {
    color: #fff; // Ensures that visited links are also white
  }

  &:focus .menubutton,
  &:hover .menubutton {
    background-color: #1e74c5;
    cursor: pointer;
  }

  p {
    margin-bottom: 1px;
  }
`;
export const StyledMenuButton = styled.p`
  width: 160px;
  background: #31aae9;
  height: 30px;
  margin: 0 0 0 1px;
  text-align: center;
`;
