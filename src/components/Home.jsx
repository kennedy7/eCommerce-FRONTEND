import { useGetAllProductsQuery } from "../features/productsApi";

const Home = () => {
    const { data, error, isFetching, isLoading } = useGetAllProductsQuery()
    return ( <h2>Home</h2> );
}
 
export default Home;