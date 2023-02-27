import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { clearCart, getTotals } from "../slices/cartSlice";

const CheckOutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  return (
    <Container>
      <h2> Checkout success</h2>
      <p>We are currently processing your order, Please be patient.</p>
      <p>check your order status on your profile after 10mins.</p>
      <p>
        For more inquiries and assistance contact our support at{" "}
        <strong>support@kenonlinehop.com</strong>
      </p>
    </Container>
  );
};

export default CheckOutSuccess;

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`;
