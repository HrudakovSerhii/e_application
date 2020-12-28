import React from "react";

import s from "../../styles/common.scss";

export const Title = ({ title, style = "" }) => {
   return (
      <div className={`${s.title} ${style}`}>
         <label>{title}</label>
      </div>
   );
};
