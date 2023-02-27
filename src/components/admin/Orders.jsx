import OrdersList from "./list/OrdersList";
import styled from "styled-components";

const Orders = () => {
  return (
    <>
      <Container> </Container>
      <OrdersList />
    </>
  );
};

export default Orders;
const Container = styled.div`
  display: flex;
  padding: 15px 12px;
  border-radius: 5px;
  font-weight: 400;
  letter-spacing: 1.15px;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0.5rem 0;
`;
