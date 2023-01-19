import styled from "styled-components";
import { FaUsers, FaChartBar, FaClipBoard } from "react-icons";
const Summary = () => {
  const data = [
    {
      icon: <FaUsers />,
      digits: 50,
      isMoney: false,
      title: "Users",
      color: "rgb(102, 108, 255)",
      bgColor: "rgba(102, 108, 255, 0.12)",
      percentage: 30,
    },
    {
      icon: <FaClipBoard />,
      digits: 70,
      isMoney: false,
      title: "Others",
      color: "rgb(38, 198, 249)",
      bgColor: "rgb(38, 198, 249, 0.12)",
      percentage: 20,
    },
    {
      icon: <FaChartBar />,
      digits: 500,
      isMoney: false,
      title: "Earnings",
      color: "rgb(253, 181, 40)",
      bgColor: "rgba(253, 181, 40, 0.12)",
      percentage: 60,
    },
  ];

  return <StyledSummary>Summary</StyledSummary>;
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
