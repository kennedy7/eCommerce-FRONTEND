import { Button, ButtonGroup, Paper } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import Paginate from "./Pagination";

// import { useGetAllProductsQuery } from "../slices/productsApi";
const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { data, error, isLoading } = useGetAllProductsQuery();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  const allCategories = [
    "All",
    ...new Set(data.map((product) => product.category)),
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const handleClick = (category) => setSelectedCategory(category);

  console.log(allCategories);
  return (
    <div className="categories">
      <ButtonGroup>
        {allCategories.map((category) => (
          <Button
            onClick={() => handleClick(category)}
            key={category}
            className="btn-color-primary"
            style={{ margin: "5px" }}
          >
            {category}
          </Button>
        ))}
      </ButtonGroup>
      <div className="home-container">
        {status === "success" ? (
          <>
            <h2>New Arrivals</h2>

            <div className="products">
              {data &&
                data?.map((product) => (
                  <div key={product._id} className="product">
                    <h3>{product.name}</h3>
                    <Link to={`product/${product._id}`}>
                      <img src={product.image?.url} alt={product.name} />
                    </Link>

                    <div className="details">
                      <span>{product.desc}</span>
                      <span className="price">${product.price}</span>
                    </div>
                    <button onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                ))}
            </div>
            {data ? (
              <Paper elevation={6}>
                <Paginate />
              </Paper>
            ) : null}
          </>
        ) : status === "pending" ? (
          <p>Loading...</p>
        ) : (
          <p>Oops... Unexpected error occured...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
