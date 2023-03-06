import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsSearch } from "../slices/productsSlice";

const SearchInput = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(keyword);

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(productsSearch(keyword));
    navigate("/products/search");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          className="search"
          style={{ maxWidth: "100%", display: "inline-block" }}
          placeholder="Search products, brands and categories"
          value={keyword}
          onKeyDown={handleKeyDown}
          onChange={(e) => setKeyword(e.target.value)}
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
    </div>
  );
};

export default SearchInput;
