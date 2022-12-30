import { useGetAllProductsQuery } from "../features/productsApi";

const Home = () => {
    const { data, error, isLoading } = useGetAllProductsQuery();
    return <div className="home-container">
        {isLoading ? (
            <p> Loading...<p />
                ): error ?
                (
                <p> Oops... An error occured <p />
                 ): (
                    <>
                    <h2>  New arrivals  </h2>
                    <div className="products"> 
                    {data?.map (product =>
                         <div key={product.id} className="product"> 
                    <h3> {product.name} </h3>
                    <img src={product.image} alt={product.name}/>
                         </div>
                     )}
                    </div>
                    </>
                )}
            </div> 
};

export default Home;