import styled from "styled-components";

export const ButtonForm = styled.button`
  width: 100%;
  padding: 16px 0;
  min-height: 20px;
  text-align: center;
  background-color: ${(props) => (props.$negative ? "#F6F6F6" : "#f76800")};
  border-radius: 6px;
  color: ${(props) => props.$color || (props.$negative ? "#C5C5C5" : "#fff")};
`;

function Button({ text, negative, color }) {
  return (
    <ButtonForm $negative={negative} $color={color} disabled={negative}>
      {text}
    </ButtonForm>
  );
}

export default Button;
