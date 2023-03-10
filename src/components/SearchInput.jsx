import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productsSearch } from "../slices/productsSlice";

const SearchInput = () => {
  // const { keyword } = useSelector((state) => state.products);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [keyword, setKeyword] = useState(params.keyword);

  console.log(keyword);

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(productsSearch(keyword));
    navigate(`/products/search/${keyword}`);
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
