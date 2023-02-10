import * as React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PrimaryButton } from "./CommonStyled";

export default function EditProduct() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    TransformFile(file);
  };

  const TransformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      productCreate({
        name,
        brand,
        price,
        desc,
        image: productImg,
      })
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Edit onClick={handleClickOpen}>Edit</Edit>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <StyledEditProduct>
          <StyledForm onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/"
              onChange={handleProductImageUpload}
              required
            />
            <select onChange={(e) => setBrand(e.target.value)} required>
              <option value="">Select Brand</option>
              <option value="Iphone">Iphone</option>
              <option value="Samsung">Samsung</option>
              <option value="Nokia">Nokia</option>
              <option value="Tecno">Tecno</option>
              <option value="Infinix">Infinix</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Brief description"
              onChange={(e) => setDesc(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <PrimaryButton type="submit">Submit</PrimaryButton>
          </StyledForm>
          <ImagePreview>
            {productImg ? (
              <>
                <img src={productImg} alt="ProductImage" />
              </>
            ) : (
              <p>Image Preview will appear here!</p>
            )}{" "}
          </ImagePreview>
        </StyledEditProduct>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const Edit = styled.button`
  border: none;
  outline: none;
  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledEditProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;
