import { Pagination, PaginationItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./PaginateStyles";

const Paginate = () => {
  const classes = useStyles();
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/?page${1}`} />
      )}
    />
  );
};

export default Paginate;
