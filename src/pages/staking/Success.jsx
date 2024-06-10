import { useNavigate, useParams } from "react-router-dom";
import Appbar, { AppbarWrapper, Icon } from "../../components/Appbar";
import { MainLayout, Title } from "./Deposit";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { calculatedValueState } from "../../atom";
import Button, { ButtonForm } from "../../components/Button";

const CustomIcon = styled(Icon)`
  float: right;
`;

const Main = styled(MainLayout)`
  padding-top: calc(28px + 32px - 20px);
  justify-content: space-between;
`;

const SuccessContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const LogoWrapper = styled.div`
  display: flex;
`;

const Logo = styled.div`
  width: 64px;
  height: 64px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &:first-child {
    background-image: url("/assets/ava.png");
  }
  &:nth-child(2) {
    background-image: url("/assets/staking.png");
    margin-left: -10px;
  }
`;

const TokenName = styled.span`
  margin-left: 4px;
  font-weight: bold;
  text-transform: uppercase;
`;

const DivisionLine = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #ebeef1;
  border: none;
`;

const SubtitleWrapper = styled.div`
  & > h3 {
    font-size: 14px;
    line-height: 18px;
    color: #676767;
    margin-bottom: 6px;
  }
  & > strong {
    font-size: 22px;
    line-height: 30px;
    font-weight: bold;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CloseButton = styled(ButtonForm)`
  border: 1px solid #f76800;
  color: #f76800;
  background-color: #fff;
`;

function Success() {
  const tokenName = useParams().tokenName;
  const calculatedValue = useRecoilValue(calculatedValueState);
  const navigate = useNavigate();

  return (
    <>
      <Appbar icon={<CustomIcon onClick={() => navigate("/deposit")}>X</CustomIcon>} />
      <Main>
        <SuccessContainer>
          <LogoWrapper>
            <Logo />
            <Logo />
          </LogoWrapper>
          <Title>
            아발란체<TokenName>{tokenName}</TokenName>
            <br />
            스테이킹 완료
          </Title>
          <DivisionLine />
          <SubtitleWrapper>
            <h3>스테이킹 신청 수량</h3>
            <strong>
              {calculatedValue}
              <TokenName>{tokenName}</TokenName>
            </strong>
          </SubtitleWrapper>
        </SuccessContainer>
        <ButtonWrapper>
          <CloseButton $color="#f76800" onClick={() => navigate("/deposit")}>
            닫기
          </CloseButton>
          <Button text="스테이킹 내역" />
        </ButtonWrapper>
      </Main>
    </>
  );
}

export default Success;
