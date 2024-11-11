import React from "react";
import { StyledQuickSearch } from "./QuickSearch.css";

import Button from "../../common/SRSButton";

function QuickSearch() {
  return (
    <StyledQuickSearch>
      <form action="person" method="post" name="quicksearchform">
        <span>
          Family name search
          <input type="text" maxLength="100" name="searchterm"></input>
        </span>

        <Button>GO</Button>
      </form>
    </StyledQuickSearch>
  );
}

export default QuickSearch;
