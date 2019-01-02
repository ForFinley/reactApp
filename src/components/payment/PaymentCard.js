import Card from "../common/cards/Card";
import React from "react";
import "./PaymentCard.scss";

const getCardIcon = brand => {
  switch (brand) {
    case "Visa":
      return <i class="fab fa-cc-visa" />;

    default:
      return null;
  }
};
const PaymentCard = ({ brand, expMonth, expYear, last4, onDelete }) => {
  return (
    <Card className="PaymentCard">
      <div className="PaymentCard__image">{getCardIcon(brand)}</div>
      <div className="PaymentCard__info">
        <div>
          {" "}
          <b>Last 4:</b>
          &nbsp;
          {last4}
        </div>
        <div>
          {" "}
          <b>Expires:</b>
          &nbsp; {expMonth}/{expYear}
        </div>
      </div>

      <div onClick={onDelete} className="PaymentCard__delete">
        <i class="far fa-trash-alt" />
      </div>
    </Card>
  );
};

export default PaymentCard;
