import React from "react";
import {
  SRSMainContent,
  SRSMainContentContainer,
} from "./SRSMainContainer.css";
function SRSMainContainer({ children }) {
  return (
    <SRSMainContentContainer>
      <SRSMainContent>{children}</SRSMainContent>
    </SRSMainContentContainer>
  );
}

export default SRSMainContainer;
