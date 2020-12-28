import React from "react";

import { Title } from "../Title/Title";
import { Badges } from "../Badges/Badges";

import s from "./styles/ValuesList.scss";

export const ValuesList = ({ productItem, propsList }) => {
   return (
      <div className={s.valuesList}>
         {propsList.map(({ propName, hasDiff }, i) => {
            if (propName === "badges") {
               return <Badges hasDiff={hasDiff} key={propName + i} data={productItem[propName]} />;
            } else {
               return (
                  <Title
                     key={propName + i}
                     title={productItem[propName]}
                     style={`${s.propertyItem} ${hasDiff ? s.hasDiff : ""}`}
                  />
               );
            }
         })}
      </div>
   );
};
