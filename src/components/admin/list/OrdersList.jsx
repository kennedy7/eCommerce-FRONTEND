import styled from "styled-components";

const OrdersList = () => {
  return <></>;
};

export default OrdersList;

const DispatchBtn = styled.div`
  backgound-color: rgba(38, 198, 249);
`;
const DeliveryBtn = styled.div`
  backgound-color: rgba(102, 108, 255);
`;

const View = styled.button`
  backgound-color: rgb(114, 225, 40);
`;
const Pending = styled.div`
  color: rgb(253, 181, 40);
  backgound-color: rgba(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  backgound-color: rgba(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Delivered = styled.div`
  color: rgb(102, 108, 255);
  backgound-color: rgba(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
