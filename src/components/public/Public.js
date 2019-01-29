import React from "react";
import ProductCard from "../cards/ProductCard";
import "./Public.scss";

const Public = props => {
  return (
    <div className="Public">
      <div className="Public__callout">
        <h1 className="Public__heading">Welcome to our site!</h1>
        <p className="Public__paragraph">Amazing things are in store...</p>
      </div>

      <div className="Public__product-container">
        <ProductCard
          title="Basic Membership"
          description="You will love the basic membership.  It's the cheapest, and best way to get started!"
        />
        <ProductCard
          title="Premium Membership"
          description="You will love the premium membership.  You've tried basic, now you're ready for the next level!"
        />
        <ProductCard
          title="Gold Membership"
          description="You're a master of your craft, and you deserve the ultimate solution!"
        />
      </div>
    </div>
  );
};

export default Public;
