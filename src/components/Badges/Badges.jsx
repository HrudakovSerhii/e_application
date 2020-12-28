import React from "react";

import { Image } from "../Image/Image";

import s from "./styles/Badges.scss";

export const Badges = ({ data, hasDiff }) => {
   const urls = data.split("|");

   return urls?.length ? (
      <div className={`${s.badgeList} ${hasDiff ? s.hasDiff : ""}`}>
         {urls?.map((url, i) => (
            <Image key={url + i} path={url} style={s.badge} />
         ))}
      </div>
   ) : null;
};
