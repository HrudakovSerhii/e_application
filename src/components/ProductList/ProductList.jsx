import React from "react";

import { ProductListItem } from "../ProductListItem/ProductListItem";

import s from "./styles/ProductList.scss";

export const ProductList = ({ products, propsList, removeProduct }) => (
   <div className={s.productList}>
      {products.map((product) => (
         <ProductListItem
            key={product["Artikelnummer"]}
            productItem={product}
            propsList={propsList}
            disableRemove={products.length <= 2}
            onItemRemove={removeProduct}
         />
      ))}
   </div>
);
