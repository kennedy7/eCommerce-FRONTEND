import styled from "styled-components";
import { useEffect, useState } from "react";
import { setHeaders, url } from "../../../slices/api";
import axios from "axios";

const Transactions = () => {
  const [orders, setOrders] = useState([]);
  const [isloading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/orders/?new=true`, setHeaders());

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <StyledTransactions>
      {isloading ? (
        <p>Transactions Loading...</p>
      ) : (
        <>
          <h3>Latest Transactions</h3>
        </>
      )}
    </StyledTransactions>
  );
};

export default Transactions;

const StyledTransactions = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 2rem;
  padding: 1rem;
  border: 2px solid rgba(48, 51, 78, 0.2);
  border-radius: 5px;
  h3 {
    margin-bottom: 1rem;
  }
`;
const Loader = styled.p`
  margin-top: 2rem;
`;
