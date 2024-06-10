import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AppbarWrapper = styled.header`
  width: 100%;
  max-width: 375px;
  padding: 16px 20px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  margin: 0 auto;
  & > * {
    cursor: pointer;
  }
`;

export const Icon = styled.span`
  margin-right: 12px;
`;

function Appbar({ pageName, icon }) {
  return (
    <AppbarWrapper>
      {icon}
      {pageName ? <span>{pageName}</span> : ""}
    </AppbarWrapper>
  );
}

export default Appbar;
