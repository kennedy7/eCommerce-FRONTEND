import { Paper } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import Paginate from "./Pagination";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.products);

  const [loading, setLoading] = useState(false);
  //   const [results, setResults] = useState([]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      {
        loading ? (
          "loading..."
        ) : (
          <>
            <h2>Search Results</h2>

            {results?.length < 1
              ? "No Products Found!"
              : `Found ${results?.length}`}

            {/* <div className="products">
                {results &&
                  results
                    ?.map((product) => (
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
              </div> */}
            {/* {data ? (
                <Paper elevation={6}>
                  <Paginate />
                </Paper>
              ) : null} */}
          </>
        )
        //  : (
        //     <p>Oops... Unexpected error occured...</p>
        //   )
      }
    </div>
  );
};

export default Search;
