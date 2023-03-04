import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHeaders, url } from "../slices/api";
import { productsSearch } from "../slices/productsSlice";

const SearchInput = () => {
  const [keyword, setKeyword] = useState("");
  // const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(keyword);
  // console.log(results);

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(productsSearch(keyword));
    // try {
    //   const { data } = await axios.get(
    //     `${url}/products/search/${keyword}`,
    //     setHeaders()
    //   );
    //   setResults({ results: data });
    navigate("/products/search");

    // } catch (error) {
    //   console.log(error);
    // }
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
