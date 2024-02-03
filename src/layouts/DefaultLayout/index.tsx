import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/index";
import { DefaultLayoutContainer } from "./styles";

export function DefaultLayout() {
  return (
    <DefaultLayoutContainer>
      <Header />
      <Outlet />
    </DefaultLayoutContainer>
  );
}