import launchLogo from "../../assets/launchLogo.png";
import {
  StyledHead,
  StyledHeader,
  StyledBannerLogo,
  StyledLogoLink,
  StyledHeaderText,
  StyledUserDetails,
} from "./Header.css";

import UserLogin from "../../auth/UserLogin.jsx";
function Header() {
  return (
    <StyledHead>
      <StyledHeader>
        <StyledBannerLogo>
          <StyledLogoLink href="www.launchhousing.org.au">
            <img src={launchLogo} alt="launch-logo" />
          </StyledLogoLink>
        </StyledBannerLogo>
        <StyledHeaderText>
          {/*Workgroup**/}
          LH - PRAP-BPA and SMA
        </StyledHeaderText>
        {/*Worker Logins*/}
        <StyledUserDetails>
          <UserLogin />
        </StyledUserDetails>
      </StyledHeader>
    </StyledHead>
  );
}

export default Header;
