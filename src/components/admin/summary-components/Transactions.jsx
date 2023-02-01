import styled from "styled-components";
import { useEffect, useState } from "react";
import { setHeaders, url } from "../../../slices/api";
import axios from "axios";
// import moment from "moment"

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
  background: darkslategray;
  color: rgba(234, 234, 255, 0.87);
  padding: 1rem;
  border-radius: 5px;
`;
const Transaction = styled.p`
  display: flex;
  font-size: 14px;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 3px;
  background: rgba(38, 198, 249, 0.12);
  p {
    flex: 1;
  }
  &:nth-child {
    background: rgba(102, 108, 255, 0.12);
  }
`;
