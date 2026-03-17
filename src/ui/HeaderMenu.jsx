import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import DarkModeToogle from "./DarkModeToogle";

const StyledList = styled.ul`
  display: flex;
  gap: 1rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledList>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToogle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledList>
  );
}

export default HeaderMenu;
