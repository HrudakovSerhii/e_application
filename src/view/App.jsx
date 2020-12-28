import React from "react";

import { useProducts } from "../core/hooks";

import { Title } from "../components/Title/Title";
import { ProductList } from "../components/ProductList/ProductList";
import { CompareList } from "../components/CompareList/CompareList";
import { PropertyList } from "../components/PropertyList/PropertyList";

import s from "../styles/app.scss";

export const App = () => {
   const { loading, visibleProducts, propsList, compareList, removeProduct, updateCompareList } = useProducts();

   return (
      <div className={s.appContainer}>
         <div className={s.centerContainer}>
            {loading ? (
               <div className={s.overlapContainer}>
                  <span className={s.loading}>Loading</span>
               </div>
            ) : (
               <>
                  <Title title={`${compareList?.length} Producten Vergelijken`} style={s.headerTitle} />
                  <div className={s.mainContainer}>
                     <div className={s.compareOptionsContainer}>
                        <CompareList compareList={compareList} updateCompareList={updateCompareList} />
                        <PropertyList propsList={propsList} />
                     </div>
                     <ProductList products={visibleProducts} propsList={propsList} removeProduct={removeProduct} />
                  </div>
               </>
            )}
         </div>
      </div>
   );
};
