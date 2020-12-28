import React from "react";

import { Image } from "../Image/Image";
import { Title } from "../Title/Title";
import { ValuesList } from "../ValuesList/ValuesList";

import s from "./styles/ProductListItem.scss";

export const ProductListItem = ({ productItem, propsList, onItemRemove, disableRemove }) => (
   <div className={s.productItem}>
      <div className={s.header}>
         <div className={`${s.removeItemContainer} ${disableRemove ? s.disableRemove : ""}`}>
            <div
               className={s.removeIcon}
               onClick={() => !disableRemove && onItemRemove(productItem["Artikelnummer"])}
            />
         </div>
         <div className={s.imageContainer}>
            <Image path={productItem["productImage"]} />
         </div>
         <Title title={productItem["name"]} style={s.productItemTitle} />
         <div className={s.priceContainer}>
            <Title title={productItem["grossPrice"]} style={s.productItemPrice} />
            <span>per stuck/ excl. btw</span>
         </div>
      </div>
      <ValuesList productItem={productItem} propsList={propsList} />
   </div>
);
