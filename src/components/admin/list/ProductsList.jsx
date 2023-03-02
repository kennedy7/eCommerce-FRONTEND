import styled from "styled-components";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productDelete } from "../../../slices/productsSlice";
import EditProduct from "../EditProduct";

export default function ProductsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(productDelete(id));
  };

  const { items } = useSelector((state) => state.products);
  // const items = data.items;
  const rows =
    items &&
    items.map((item) => {
      return {
        id: item._id,
        imageUrl: item.image.url,
        pName: item.name,
        pDesc: item.desc,
        price: item.price.toLocaleString(),
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: "image",
      width: 80,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt="" />
          </ImageContainer>
        );
      },
    },
    { field: "pName", headerName: "Name", width: 130 },
    {
      field: "pDesc",
      headerName: "Description",
      width: 130,
    },
    {
      field: "price",
      headerName: "Price",
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
            <View onClick={() => navigate(`/items/product/${params.row.id}`)}>
              View
            </View>
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

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;

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
