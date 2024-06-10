import { useEffect, useState } from "react";
import styled from "styled-components";
import { calculatedValueState } from "../atom";
import { useRecoilState } from "recoil";

const CalculatorContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CalculatorTitle = styled.h3`
  line-height: 26px;
`;

const InputWrapper = styled.div`
  margin: 6px 0;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  & > input {
    border: none;
    min-width: 200px;
    min-height: 26px;
  }
`;

const TokenName = styled.span`
  text-transform: uppercase;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 6px;
  & > button {
    width: 79.25px;
    height: 36px;
    padding: 9px 0;
    border: 1px solid #dcdcdc;
    border-radius: 6px;
    color: #676767;
  }
`;

const StakingInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  line-height: 18px;

  & > span:first-child {
    color: #969696;
  }
  & > div > span:first-child {
    margin-right: 4px;
  }
`;

const Negative = styled.strong`
  color: #ee4700;
`;

const CalculationResult = styled(StakingInfoWrapper)`
  & > span:first-child {
    color: inherit;
  }
  & > div > span {
    font-size: 22px;
    line-height: 30px;
    font-weight: bold;
  }
`;

const CalculationResultValue = styled.span`
  // 오류찾기
  font-size: ${(props) => (props.$length > 13 ? "16px" : "22px")};
`;

const OverRequest = styled.strong`
  font-size: 13px;
  line-height: 18px;
  color: #ee4700;
`;

const commission = 0.05;
const percentages = ["10%", "25%", "50%", "최대"];

function PercentCalculator({ quantityHeld, tokenName, coinId }) {
  const [inputValue, setInputValue] = useState(0);
  const [negative, setNegative] = useState(false);
  const [overRequest, setOverRequest] = useState(false);
  const [calculatedValue, setCalculatedValue] = useRecoilState(calculatedValueState);

  useEffect(() => {
    setCalculatedValue(quantityHeld - inputValue * commission - inputValue);
    inputValue > quantityHeld ? setOverRequest(true) : setOverRequest(false);
  }, [inputValue, quantityHeld, setCalculatedValue]);

  useEffect(() => {
    setNegative(calculatedValue < 0);
  }, [calculatedValue]);

  const handleButtonClick = (percent) => {
    if (percent === "10%") setInputValue(quantityHeld * 0.1);
    if (percent === "25%") setInputValue(quantityHeld * 0.25);
    if (percent === "50%") setInputValue(quantityHeld * 0.5);
    if (percent === "최대") setInputValue(quantityHeld * 1 - quantityHeld * commission);
  };
  const handleInputFocus = (event) => {
    if (event) {
      event.target.value = "";
    }
    return;
  };
  const handleInputValue = (event) => {
    setInputValue(Number(event.target.value));
  };

  return (
    <CalculatorContainer>
      <div>
        <CalculatorTitle>스테이킹 신청 수량</CalculatorTitle>
        <InputWrapper>
          <input min={0} type="number" value={inputValue} onFocus={handleInputFocus} onChange={handleInputValue} />
          <TokenName>{tokenName}</TokenName>
        </InputWrapper>
        <ButtonWrapper>
          {percentages.map((percent, idx) => (
            <button key={idx} onClick={() => handleButtonClick(percent)}>
              {percent}
            </button>
          ))}
        </ButtonWrapper>
      </div>
      {overRequest ? (
        <OverRequest>보유 수량까지만 신청이 가능해요.</OverRequest>
      ) : (
        <>
          <StakingInfoWrapper>
            <span>스테이킹 후 잔여 수량</span>
            <div>
              <span>{quantityHeld - inputValue}</span>
              <TokenName>{coinId}</TokenName>
            </div>
          </StakingInfoWrapper>
          <StakingInfoWrapper>
            <span>예상 수수료</span>
            {negative ? (
              <Negative>잔액이 부족해요</Negative>
            ) : (
              <div>
                <span>{inputValue * commission}</span>
                <TokenName>{coinId}</TokenName>
              </div>
            )}
          </StakingInfoWrapper>

          <CalculationResult>
            <span>
              총 출금(수수료 포함)
              <br />
              실제 스테이킹 수량
            </span>
            <div>
              {negative ? (
                "잔액이 부족해요"
              ) : (
                <>
                  <CalculationResultValue $length={calculatedValue.toString().length}>
                    {calculatedValue}
                  </CalculationResultValue>
                  <TokenName>{coinId}</TokenName>
                </>
              )}
            </div>
          </CalculationResult>
        </>
      )}
    </CalculatorContainer>
  );
}

export default PercentCalculator;
