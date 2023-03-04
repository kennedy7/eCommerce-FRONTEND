import { Paper } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import Paginate from "./Pagination";

// import { useGetAllProductsQuery } from "../slices/productsApi";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page");
  const searchQuery = query.get("searchQuery");

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // const { data, error, isLoading } = useGetAllProductsQuery();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  // const searchProduct = () => {
  //   if (search.trim()) {
  //     dispatch(productsSearch({}));
  //   } else {
  //     navigate("/");
  //   }
  // };

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data &&
              data
                ?.filter((product) =>
                  product.name.toLowerCase().includes(query)
                )
                .map((product) => (
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
  );
};

export default Home;
