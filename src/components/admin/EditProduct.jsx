import * as React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "./CommonStyled";
import { productUpdate } from "../../slices/productsSlice";

export default function EditProduct({ prodId }) {
  const dispatch = useDispatch();
  const { items, updateStatus } = useSelector((state) => state.products);

  const [open, setOpen] = useState(false);
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [currentProd, setCurrentProd] = useState({});
  const [previewImg, setPreviewImg] = useState("");

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
        setPreviewImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      productUpdate({
        productImg,
        product: {
          ...currentProd,
          name: name,
          brand: brand,
          price: price,
          desc: desc,
          category: category,
        },
      })
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
    let selectedProd = items.filter((item) => item._id === prodId);
    selectedProd = selectedProd[0];
    setCurrentProd(selectedProd);
    setName(selectedProd.name);
    setBrand(selectedProd.brand);
    setPrice(selectedProd.price);
    setDesc(selectedProd.desc);
    setCategory(selectedProd.category);
    setPreviewImg(selectedProd.image.url);
    setProductImg("");
    // console.log( selectedProd)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Edit onClick={handleClickOpen}>Edit</Edit>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <StyledEditProduct>
            <StyledForm onSubmit={handleSubmit}>
              <input
                type="file"
                accept="image/"
                onChange={handleProductImageUpload}
              />
              <select
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                required
              >
                <option value="">Select Brand</option>
                <option value="Iphone">Iphone</option>
                <option value="Samsung">Samsung</option>
                <option value="Nokia">Nokia</option>
                <option value="Tecno">Tecno</option>
                <option value="Infinix">Infinix</option>
                <option value="oraimo">Oraimo</option>
                <option value="hp">Hp</option>
                <option value="dell">Dell</option>
                <option value="Zealot">Zealot</option>
                <option value="Mac">Macbook</option>
                <option value="Speakers">Speaker</option>
                <option value="Hisense">Hisense</option>
                <option value="Asus">Asus</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Brief description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                required
              >
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Phones">Phones</option>
                <option value="Laptops">Laptops</option>
                <option value="Bags">Bags</option>
                <option value="Furnitures">Furnitures</option>
              </select>
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <PrimaryButton type="submit">
                {updateStatus === "pending" ? "updating..." : "Submit"}
              </PrimaryButton>
            </StyledForm>
            <ImagePreview>
              {previewImg ? (
                <>
                  <img src={previewImg} alt="ProductImage" />
                </>
              ) : (
                <p>Image Preview will appear here!</p>
              )}{" "}
            </ImagePreview>
          </StyledEditProduct>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
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
