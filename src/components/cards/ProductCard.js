import React from "react";
import Button from "../common/button";
import "./ProductCard.scss";

const ProductCard = ({ title, description }) => {
  return (
    <div className="ProductCard">
      <div className="ProductCard__title">{title}</div>
      <p className="ProductCard__description">{description}</p>

      <Button>Subscribe Now</Button>
    </div>
  );
};

export default ProductCard;
