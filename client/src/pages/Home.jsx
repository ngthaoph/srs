import React from "react";
import PageLayout from "../common/SRSTabs";
function Home() {
  return (
    <div>
      <PageLayout
        tabsName={[
          "My List",
          "Team List",
          "My Actions",
          "Team Actions",
          "Profiles",
          "Referrals",
          "Support Periods",
          "Lists",
          "Service Directory",
          "Reception",
        ]}
      />
    </div>
  );
}

export default Home;
