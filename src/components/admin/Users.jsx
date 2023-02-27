import styled from "styled-components";
import UsersList from "./list/UsersList";

const Users = () => {
  return (
    <>
      <Container></Container>

      <UsersList />
    </>
  );
};

export default Users;

const Container = styled.div`
  display: flex;
  padding: 15px 12px;
  border-radius: 5px;
  font-weight: 400;
  letter-spacing: 1.15px;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0.5rem 0;
`;
