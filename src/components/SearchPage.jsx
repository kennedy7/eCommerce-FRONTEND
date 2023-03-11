// import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
// import Paginate from "./Pagination";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { results: data, searchSatus } = useSelector((state) => state.products);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      <h2>Search Results</h2>

      {searchSatus === "success" ? (
        <>
          {data?.length < 1 ? (
            <h3>No Products Found!</h3>
          ) : (
            <h3>
              Found {data?.length} {data?.length === 1 ? "Product" : "Products"}
            </h3>
          )}
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
          {/* {data ? (
            <Paper elevation={6}>
              <Paginate />
            </Paper>
          ) : null} */}
        </>
      ) : searchSatus === "pending" ? (
        <p>Loading...</p>
      ) : (
        <h3>Check the keyword(s)</h3>
      )}
    </div>
  );
};

export default Search;
