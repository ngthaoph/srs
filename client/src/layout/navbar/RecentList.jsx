import React, { useState } from "react";
import { StyledRecentList } from "./RecentList.css";
import { CiSquarePlus } from "react-icons/ci";
import { useClients } from "../../context/ClientProvider";
function RecentList() {
  const { recentList, client, setRecentList } = useClients();

  const [visibility, setVisibility] = useState(true);
  const handleToggleVisibility = () => {
    setVisibility(!visibility);
  };
  return (
    <StyledRecentList>
      <CiSquarePlus onClick={handleToggleVisibility} />

      <div>
        Recent List
        {visibility && (
          <div>
            {recentList.map((recent) => (
              <span key={recent.id}>{recent.firstName}</span>
            ))}
          </div>
        )}
      </div>
    </StyledRecentList>
  );
}

export default RecentList;
