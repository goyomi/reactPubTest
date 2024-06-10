import styled from "styled-components";

const CoinCardList = styled.li`
  max-width: 335px;
  min-height: 64px;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ebeef1;
  border-radius: 8px;

  & > a:last-child {
    margin-bottom: 0;
  }
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CoinInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  & > div {
    display: flex;
    flex-direction: column;
    & > span :first-child {
      font-size: 16px;
      line-height: 20px;
      font-weight: bold;
    }
    & > span:nth-child(2) {
      font-size: 13px;
      line-height: 18px;
      color: #969696;
    }
  }
`;

const CoinLogo = styled.div`
  width: 40px;
  height: 40px;
  background: url(${(props) => props.$logoPath}) no-repeat center center/ cover;
`;

const CoinDetailWrapper = styled.div`
  font-size: 13px;
  line-height: 18px;
  color: #676767;
  & > span:first-child {
    margin-right: 6px;
  }
  & > span:nth-child(2) {
    text-transform: uppercase;
  }
`;

function CoinCard({ coinData }) {
  if (!coinData) return;
  return (
    <CoinCardList>
      <Card>
        <CoinInfoWrapper>
          <CoinLogo $logoPath={coinData.img} />
          <div>
            <span>{coinData.title}</span>
            <span>보유 수량</span>
          </div>
        </CoinInfoWrapper>
        <CoinDetailWrapper>
          <span>{coinData.quantity}</span>
          <span>{coinData.code}</span>
        </CoinDetailWrapper>
      </Card>
    </CoinCardList>
  );
}

export default CoinCard;
