import { HeaderContainer } from "./styles";
import { Scroll, Timer } from 'phosphor-react'
import Logo from '../../assets/Logo.svg'
import { NavLink } from "react-router-dom";
 
export function Header() {
  return (
    <HeaderContainer>
      <img src={Logo} alt="Logo com dois triângulos de lado sobrepostos" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}