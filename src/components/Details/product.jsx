import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { setHeaders, url } from "../../slices/api";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  console.log("product", product);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(
          `${url}/products/find/${params.id}`,
          setHeaders()
        );
        // console.log(res.data);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <StyledProduct>
      <ProductContainer>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ImageContainer>
              <img src={product.image?.url} alt=""></img>
            </ImageContainer>
            <ProductDetails>
              <h3>{product.name}</h3>
              <p>
                <span>Brand: </span>
                {product.brand}
              </p>
              <p>
                <span>Description: </span>
                {product.desc}
              </p>
            </ProductDetails>
            <Price>${product.price.toLocaleString()}</Price>
          </>
        )}
      </ProductContainer>
    </StyledProduct>
    // <>
    //   Product: {params.id}
    // </>
  );
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
const ProductDetails = styled.div`
  flex: 2;
  margin-left: 2rem;
  h3 {
    font-size: 35px;
  }
  p span {
    font-weight: bold;
  }
`;

const Price = styled.div`
  margin: 1rem 0;
  font-weight: bold;
  font-size: 25px;
`;
