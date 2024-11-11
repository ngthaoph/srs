import React from "react";
import {
  StyledTab,
  StyledTabBlock,
  StyledMainTabs,
  StyledTabItem,
  StyledTabSpacer,
} from "./SRSTabs.css";
import { Link } from "react-router-dom";
function SRSTab({ tabsName }) {
  return (
    <StyledTab>
      {/*Tabs*/}
      <StyledTabBlock>
        <StyledMainTabs>
          {tabsName.map((name, index) => (
            <StyledTabItem key={index}>
              <Link to={`/persons/${name.toLowerCase()}`}>{name}</Link>
            </StyledTabItem>
          ))}
        </StyledMainTabs>
      </StyledTabBlock>
    </StyledTab>
  );
}

export default SRSTab;
