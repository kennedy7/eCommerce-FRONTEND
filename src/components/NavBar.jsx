import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useState } from "react";

const NavBar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const searchProduct = () => {
    if (search.trim()) {
      //dispatch search
    }
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      //search
      searchProduct();
    } else {
      navigate("/");
    }
  };
  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>Ken's OnlineStore</h2>
      </Link>
      <form onSubmit={searchProduct}>
        <input
          type="text"
          className="search"
          style={{ maxWidth: "100%", display: "inline-block" }}
          placeholder="Search products, brands and categories"
          value={search}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          style={{
            padding: 10,
            borderRadius: 5,
            border: 0,
          }}
        >
          Search
        </button>
      </form>
      {/* <Search setSearch={(search) => setSearch(search)} /> */}

      <Link to="/cart">
        <div className="nav-cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-cart4"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
          <span className="cart-quantity">
            <span>{cartTotalQuantity}</span>
          </span>
        </div>
      </Link>

      {auth._id ? (
        <Links>
          {auth.isAdmin ? (
            <div>
              <Link to="/admin/summary">Admin</Link>
            </div>
          ) : (
            <div>
              <Link to={`/user/${auth._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="20"
                  fill="currentColor"
                  class="bi bi-person-gear"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                </svg>
              </Link>
            </div>
          )}

          <div
            onClick={() => {
              dispatch(logOutUser(null));
              toast.warning("Logged Out!", { position: "bottom-left" });
            }}
          >
            Logout
          </div>
        </Links>
      ) : (
        <AuthLinks>
          <Link to="/login"> Login </Link>
          <Link to="/register"> Register </Link>
        </AuthLinks>
      )}
    </nav>
  );
};

export default NavBar;

const AuthLinks = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;
const Links = styled.div`
  color: white;
  display: flex;

  div {
    cursor: pointer;

    &:last-child {
      margin-left: 2rem;
    }
  }
`;
