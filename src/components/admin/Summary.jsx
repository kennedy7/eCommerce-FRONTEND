import styled from "styled-components";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import Widget from "./summary-components/widgets";
import { useEffect, useState } from "react";
import axios from "axios";
import { setHeaders, url } from "../../slices/api";
import Chart from "./summary-components/Chart";

const Summary = () => {
  const [users, setUsers] = useState([]);
  const [usersPercentage, setUsersPercentage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [ordersPercentage, setOrdersPercentage] = useState(0);
  const [income, setIncome] = useState([]);
  const [incomePercentage, setIncomePercentage] = useState(0);

  console.log(usersPercentage);
  console.log(ordersPercentage);

  function compare(a, b) {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  }

  //Get Users stats
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/users/stats`, setHeaders());
        res.data.sort(compare);

        if (res.data[0]._id >= 12) {
          setUsers(res.data[1]?.total);
          setUsersPercentage(
            //this month's users minus last month's users divided by last month's (inverse of the real logic because of Dec _id being greater than jan)
            ((res.data[1].total - res.data[0].total) / res.data[0].total) * 100
          );
        } else {
          setUsers(res.data[0]?.total);
          setUsersPercentage(
            //this month's users minus last month's users divided by last month's
            ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  //Get Orders stats
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/stats`, setHeaders());
        res.data.sort(compare);
        if (res.data[0]._id >= 12) {
          setOrders(res.data[1]?.total);
          setOrdersPercentage(
            //this month's users minus last month's users divided by last month's (inverse of the real logic because of Dec._id being greater than jan._id)
            ((res.data[1].total - res.data[0].total) / res.data[0].total) * 100
          );
        } else {
          setOrders(res.data);
          setOrdersPercentage(
            //this month's users minus last month's users divided by last month's
            ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  //Get Income stats
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/orders/income/stats`, setHeaders());
        res.data.sort(compare);
        if (res.data[0]._id >= 12) {
          setIncome(res.data[1]?.total);
          setIncomePercentage(
            //this month's users minus last month's users divided by last month's (inverse of the real logic because of Dec._id being greater than jan._id)
            ((res.data[1].total - res.data[0].total) / res.data[0].total) * 100
          );
        } else {
          setOrders(res.data);
          setOrdersPercentage(
            //this month's users minus last month's users divided by last month's
            ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const data = [
    {
      icon: <FaUsers />,
      digits: users,
      isMoney: false,
      title: "Users",
      color: "rgb(102, 108, 255)",
      bgColor: "rgba(102, 108, 255, 0.12)",
      percentage: usersPercentage,
    },
    {
      icon: <FaClipboard />,
      digits: orders,
      isMoney: false,
      title: "Orders",
      color: "rgb(38, 198, 249)",
      bgColor: "rgba(38, 198, 249, 0.12)",
      percentage: ordersPercentage,
    },
    {
      icon: <FaChartBar />,
      digits: income,
      isMoney: true,
      title: "Earnings",
      color: "rgb(253, 181, 40)",
      bgColor: "rgba(253, 181, 40, 0.12)",
      percentage: incomePercentage,
    },
  ];

  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            <h2>Overview</h2>
            <p>How your shop is performing compared to the previous month</p>
          </Title>
          <WidgetWrapper>
            {data?.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </WidgetWrapper>
        </Overview>
        <Chart />
      </MainStats>
      <SideStats></SideStats>
    </StyledSummary>
  );
};

export default Summary;

const StyledSummary = styled.div`
  width: 100%;
  display: 100%;
`;
const MainStats = styled.div`
  flex: 2;
  width: 100%;
`;
const Title = styled.div`
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;
const Overview = styled.div`
  background: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  width: 100%;
  padding: 1.5rem;
  height: 170px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: spce-between;
`;
const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;
