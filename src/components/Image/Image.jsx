import React from "react";

import s from "../../styles/common.scss";

export const Image = ({ path, style }) => {
   const [loading, setLoading] = React.useState(true);
   const [isReady, setIsReady] = React.useState(false);

   return (
      <div className={`${s.image} ${style ? style : ""}`}>
         <div className={s.spacer} />
         <img
            onLoad={() => {
               setIsReady(true);
               setLoading(false);
            }}
            onError={() => {
               setLoading(false);
            }}
            src={path}
         />
         {loading ? (
            <div className={s.overlapContainer}>
               <span className={s.loading}>Loading</span>
            </div>
         ) : !isReady ? (
            <div className={s.overlapContainer}>
               <span className={s.noImage}>No Image</span>
            </div>
         ) : null}
      </div>
   );
};
