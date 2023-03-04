import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setHeaders, url } from "../slices/api";

const SearchInput = () => {
  const [values, setValues] = useState("");
  const navigate = useNavigate();

  console.log(values);

  const handleSearch = async (e) => {
    // if (search.trim()) {
    e.preventDefault();
    try {
      const { data } = axios.get(
        `${url}/products/search/${values.search}`,
        setHeaders()
      );
      setValues({ values, products: data });

      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      //search
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
          value={values.search}
          onKeyDown={handleKeyDown}
          onChange={(e) => setValues({ ...values, search: e.target.value })}
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
