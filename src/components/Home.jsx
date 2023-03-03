import { Paper } from "@mui/material";
import axios from "axios";
import { set } from "immer/dist/internal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { setHeaders, url } from "../slices/api";
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

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({});

  // const { data, error, isLoading } = useGetAllProductsQuery();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  useEffect(() => {
    const fetchOrdersBySearch = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}/orders/?`, setHeaders());
        setSearch(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  });

  return (
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
  );
};

export default Home;
