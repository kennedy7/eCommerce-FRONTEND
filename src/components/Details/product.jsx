import styled from "styled-components";

const Product = () => {
  return <>Product</>;
};

export default Product;

const StyledProduct = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;
const ProductContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2);
  border-radius: 5px;
  padding: 2rem;
`;
const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
  }
`;
