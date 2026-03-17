import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../Contexts/DarkModeContext";

function DarkModeToogle() {
  const { isDarkMode, toogleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toogleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToogle;
