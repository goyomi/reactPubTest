import { Link, useNavigate, useParams } from "react-router-dom";
import Appbar, { Icon } from "../../components/Appbar";
import { MainLayout, Title } from "./Deposit";
import PercentCalculator from "../../components/PercentCalculator";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { calculatedValueState } from "../../atom";
import { useEffect, useState } from "react";
import Button from "../../components/Button";

const Main = styled(MainLayout)`
  justify-content: space-between;
`;

const SubTitle = styled.div`
  margin-top: 6px;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 18px;
  color: #676767;
  position: relative;
  & > span > * {
    margin-right: 5px;
  }
  & > span > span:last-child {
    margin-right: 0;
  }
`;

const TokenName = styled.span`
  text-transform: uppercase;
`;

const LoadMoreButton = styled.button`
  margin-left: 12px;
  color: #f76800;
`;

const InterestWrapper = styled.div`
  padding: 12px 0;
  text-align: center;
  font-size: 16px;
  line-height: 20px;
  color: #969696;
  & > span {
    margin: 0 2px;
  }
`;

const InterestRateValue = styled.span`
  font-size: ${(props) => (props.$length > 13 ? "14px" : "16px")};
`;

const CustomIcon = styled(Icon)``;

const dummyData = [{ quantityHeld: 95.329394, tokenName: "avax" }];

function Application() {
  const [negative, setNegative] = useState(false);
  const [interestRate, setInterestRate] = useState(0.05);
  const calculatedValue = useRecoilValue(calculatedValueState);
  const coinId = useParams().coinId;
  const navigate = useNavigate();

  useEffect(() => {
    setInterestRate(calculatedValue * 0.05);

    if (calculatedValue < 0 || interestRate < 0) setNegative(true);
    else setNegative(false);
  }, [calculatedValue, interestRate]);

  return (
    <>
      <Appbar icon={<CustomIcon onClick={() => navigate(-1)}>{"<"}</CustomIcon>} />
      {dummyData.map((data, idx) => (
        <Main key={idx}>
          <div>
            <Title>얼마나 예치할까요?</Title>
            <SubTitle>
              <span>
                <span>내 보유수량</span>
                <span>{data.quantityHeld}</span>
                <TokenName>{data.tokenName}</TokenName>
              </span>
              <LoadMoreButton>더 가져오기</LoadMoreButton>
            </SubTitle>
            <PercentCalculator quantityHeld={data.quantityHeld} tokenName={data.tokenName} coinId={coinId} />
          </div>
          <div>
            <InterestWrapper>
              1년 뒤 예상되는 이자
              <InterestRateValue $length={interestRate.toString().length}>
                {negative ? "0" : interestRate}
              </InterestRateValue>
              <TokenName>{data.tokenName}</TokenName>
            </InterestWrapper>
            <Link to={`/deposit/completed/${data.tokenName}`}>
              <Button text="다음" negative={negative} />
            </Link>
          </div>
        </Main>
      ))}
    </>
  );
}

export default Application;
