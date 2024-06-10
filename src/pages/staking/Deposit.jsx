import styled from "styled-components";
import Appbar, { Icon } from "../../components/Appbar";
import CoinCard from "../../components/CoinCard";
import { Link } from "react-router-dom";

export const MainLayout = styled.main`
  min-height: calc(100vh - 48px);
  margin-top: 48px;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: 22px;
  line-height: 30px;
  font-weight: bold;
`;

const CustomIcon = styled(Icon)``;

const CoinCardList = styled.ul`
  margin: 20px 0 32px;
`;

const dummyData = [
  { img: "assets/ava.png", title: "아발란체", quantity: "100.1239", code: "ava" },
  { img: "assets/dot.png", title: "폴카닷", quantity: "0", code: "dot" },
  { img: "assets/apc.png", title: "앱토스", quantity: "12", code: "apc" },
  { img: "assets/ijc.png", title: "인젝티브", quantity: "12", code: "ijc" },
];

function Deposit() {
  return (
    <>
      <Appbar pageName="입금" icon={<CustomIcon>{"<"}</CustomIcon>} />
      <MainLayout>
        <Title>
          입금을 진행할 <br /> 암호화폐를 선택해 주세요.
        </Title>
        <CoinCardList>
          {dummyData.map((coinData, idx) =>
            // 아발란체만 클릭되게
            coinData.code === "ava" ? (
              <Link to={`/deposit/application/${coinData.code}`}>
                <CoinCard key={idx} coinData={coinData} />
              </Link>
            ) : (
              <CoinCard key={idx} coinData={coinData} />
            )
          )}
          <CoinCard />
        </CoinCardList>
      </MainLayout>
    </>
  );
}

export default Deposit;
