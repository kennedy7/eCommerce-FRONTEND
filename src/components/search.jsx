const Search = ({ setSearch }) => {
  return (
    <input
      input
      type="text"
      className="search"
      placeholder="Search products, brands and categories"
      onChange={({ currentTarget: input }) => setSearch(input.value)}
    />
  );
};

export default Search;
