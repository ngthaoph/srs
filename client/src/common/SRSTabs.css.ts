import styled from "styled-components";

export const StyledTab = styled.div`
  position: fixed;
  top: 45px;
  left: 0;
  width: 100%;
  z-index: 9;
`;

export const StyledTabBlock = styled.div`
  height: 31px;
  overflow: visible;
  background: #31aae9;
  padding-left: 160px;
`;

export const StyledMainTabs = styled.ul`
  display: flex; /* Use flexbox to align items side by side */
  margin: 0;
  padding: 0;
  height: 31px;
  width: 93%;
  overflow: hidden;
`;

export const StyledTabItem = styled.li`
  background: transparent;
  height: 31px;
  margin: 4px 1px;
  list-style: none; /* Remove default list styles */

  /* Styling for tab links */
  a {
    color: #fff;
    font-size: 14px;
    padding: 6px 2px;
    display: block; /* Make the entire area clickable */

    &:focus,
    &:hover {
      background: #1e74c5;
    }
  }

  &.tabselected,
  &:hover {
    background: #fff !important;

    a {
      color: #000;
    }
  }

  &.tabselected a:focus {
    background: #fff !important;
  }
`;

export const StyledTabSpacer = styled.div`
  float: left;
  height: 25px;
`;
