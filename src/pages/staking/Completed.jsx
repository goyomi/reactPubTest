import styled from "styled-components";
import { MainLayout, Title } from "./Deposit";
import { useEffect, useState } from "react";
import Appbar from "../../components/Appbar";
import Button from "../../components/Button";
import { Link, useParams } from "react-router-dom";

const TitleWrapper = styled.div`
  text-align: center;
  & > h3 {
    margin-top: 6px;
    font-size: 14px;
    line-height: 18px;
    color: #676767;
    text-decoration: underline;
  }
`;

const Main = styled(MainLayout)`
  padding-top: 72px;
  justify-content: space-between;
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const HideInput = styled.input`
  opacity: 0;
  width: 330px;
  height: 30px;
  position: absolute;
  top: 120;
`;

const CircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

const Circle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${(props) => (props.$filled ? "#545454" : "#dcdcdc")};
`;

const passwordLength = 6;

function Completed() {
  const [password, setPassword] = useState("");
  const [negative, setNegative] = useState(false);
  const tokenName = useParams().tokenName;

  useEffect(() => {
    password.length < passwordLength ? setNegative(true) : setNegative(false);
  }, [password]);

  const handleInputChange = (event) => setPassword(event.target.value);
  const circles = Array(passwordLength).fill(0);
  return (
    <>
      <Appbar />
      <Main>
        <TitleWrapper>
          <Title>비밀번호를 입력해 주세요</Title>
          <h3>비밀번호를 잊었나요?</h3>
        </TitleWrapper>
        <PasswordWrapper>
          <HideInput
            type="password"
            autoFocus
            maxLength={passwordLength}
            onChange={handleInputChange}
            value={password}
          />
          <CircleWrapper>
            {circles.map((_, idx) => (
              <Circle key={idx} $filled={idx < password.length} />
            ))}
          </CircleWrapper>
        </PasswordWrapper>
        <Link to={`/deposit/success/${tokenName}`}>
          <Button text="다음" negative={negative} />
        </Link>
      </Main>
    </>
  );
}

export default Completed;
