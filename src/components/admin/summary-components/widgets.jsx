import styled from "styled-components";

const Widget = ({ data }) => {
  return (
    <StyleWidget>
      <Icon color={data.color} bgcolor={data.bgcolor}></Icon>
      <Text></Text>
    </StyleWidget>
  );
};

export default Widget;

const StyleWidget = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.div`
  margin-right: 0.5rem;
  padding: 0.5rem;
  color: ${({ color }) => color};
  background: ${({ bgcolor }) => bgcolor};
  border-radius: 3px;
  font-size: 20px;
`;
const Text = styled.div`
  h3 {
    font-weight: 900;
  }
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;
