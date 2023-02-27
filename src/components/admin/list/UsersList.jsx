import styled from "styled-components";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDelete, usersFetch } from "../../../slices/usersSlice";

export default function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list } = useSelector((state) => state.users);

  React.useEffect(() => {
    dispatch(usersFetch());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(userDelete(id));
  };

  const rows =
    list &&
    list.map((user) => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },

    { field: "name", headerName: "Name", width: 130 },
    {
      field: "email",
      headerName: "Email Address",
      width: 130,
    },
    {
      field: "isAdmin",
      headerName: "Role",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.isAdmin ? (
              <Admin>Admin</Admin>
            ) : (
              <Customer>Customer</Customer>
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Actions>
            <View onClick={() => navigate(`/user/${params.row.id}`)}>View</View>
            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
            {/* <EditProduct prodId={params.row.id} /> */}
          </Actions>
        );
      },
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // rowsPerPageOptions={[5, 10, 20, 30, 50]}
        checkboxSelection
        disableSelectionOnClick
        autoHeight={true}
      />
    </div>
  );
}

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;
const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;

const View = styled.button`
  background-color: rgb(80, 200, 40);
`;

const Customer = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Admin = styled.div`
color: rgb(253, 181, 40);
background-color: rgb(253, 181, 40, 0.12);
padding: 3px 5px;
border-radius: 3px
font-size: 14px;
`;
