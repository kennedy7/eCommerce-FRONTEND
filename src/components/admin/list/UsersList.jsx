import styled from "styled-components";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productDelete } from "../../../slices/productsSlice";
import EditProduct from "../EditProduct";
import { userDelete, usersFetch } from "../../../slices/usersSlice";

export default function UsersList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(userDelete(id));
  };

  const { list } = useSelector((state) => state.users);

  React.useEffect(() => {
    dispatch(usersFetch());
  }, [dispatch]);
  console.log("users:", list);

  const rows =
    list &&
    list.map((user) => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        Admin: user.isAdmin,
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },

    { field: "name", headerName: "Name", width: 130 },
    {
      field: "email",
      headerName: "User Email",
      width: 130,
    },
    {
      field: "Admin",
      headerName: "Admin Status",
      width: 130,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 170,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
            <EditProduct prodId={params.row.id} />
            <View onClick={() => navigate(`/user/${params.row.id}`)}>View</View>
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
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
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
