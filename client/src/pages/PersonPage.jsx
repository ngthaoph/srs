import React from "react";
import SRSTabs from "../common/SRSTabs";

import { Outlet } from "react-router-dom";
import SRSMainContainer from "../common/SRSMainContainer";

function PersonPage() {
  return (
    <div>
      <SRSTabs tabsName={["Search", "Details", "Note", "Documents"]}></SRSTabs>
      <SRSMainContainer>
        <Outlet />
      </SRSMainContainer>
    </div>
  );
}

export default PersonPage;
