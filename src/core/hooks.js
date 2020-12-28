import React from "react";

import { get } from "./apiController";

import { PRODUCT_ALL_URL } from "../../app.config";

import { sortByAlphabet } from "./utils";

const EXCLUDE_PROP_NAMES = [
   "salePrice",
   "manufacturerName",
   "grossPrice",
   "BUP_UOM",
   "BUP_Value",
   "uom",
   "productImage",
   "BUP_Conversion",
   "minQuantity",
   "manufacturerImage",
   "name",
   "sku",
   "listPrice",
   "channel",
   "display",
   "atp"
];

/*
   Function return list of property names that are common for all products in argument
   @param {array} products Product list
 * @return {array} array of property names that are common for all provided products
 */
export const getCommonPropNames = (products) => {
   const props = {};
   const commonProps = [];

   products?.forEach((p) =>
      Object.keys(p).map((propName) => {
         if (!props[propName]) props[propName] = 1;
         else if (props[propName]) props[propName] += 1;
      })
   );

   Object.keys(props).forEach((p) => {
      if (products.length === props[p]) commonProps.push(p);
   });

   return commonProps;
};

/*
   Function return list of property names where values related to prop.name at all
   products not equal
   @param {array} compareProducts list of products to compare
   @param {array} comparePropNames list of props names to compare
 * @return {array} list of property names where values on products has diff
 */
export const getPropNamesWithValueDiff = (products, propNames) => {
   const propNamesWithValueDiff = [];

   propNames.forEach((propName) => {
      let hasDiff = false;
      let prevValue = "";

      products.forEach((product) => {
         if (!prevValue) prevValue = product[propName];
         else hasDiff = prevValue !== product[propName];
      });

      propNamesWithValueDiff.push({ propName, hasDiff });
   });

   return propNamesWithValueDiff;
};

export const useProducts = () => {
   const [loading, setLoading] = React.useState(false);
   const [products, setProducts] = React.useState([]);

   const [propsList, setPropsList] = React.useState([]);

   const [compareList, setCompareList] = React.useState([]);

   const [errors, setErrors] = React.useState();

   const fetchAllProducts = async () => {
      setLoading(true);

      const { data, errors } = await get(PRODUCT_ALL_URL);

      if (errors) {
         setErrors(errors);
      } else {
         const newProducts = data?.products;

         const commonPropsList = getCommonPropNames(newProducts);
         const newCompareList = data?.products.reduce(
            (acc, current) => [...acc, { id: current["Artikelnummer"], name: current["name"], isActive: true }],
            []
         );

         setProducts(newProducts);
         setCompareList(newCompareList);

         const filteredPropsList = commonPropsList.filter((productProp) => !EXCLUDE_PROP_NAMES.includes(productProp));

         updatePropList(newProducts, filteredPropsList);
      }

      setLoading(false);
   };

   const updatePropList = (products, propNames) => {
      const diffProductsList = getPropNamesWithValueDiff(products, propNames);

      const sortedPropsList = sortByAlphabet(diffProductsList, "propName");

      sortedPropsList.sort((a) => (a["propName"] === "badges" ? -1 : 0));

      setPropsList(sortedPropsList);
   };

   const removeProduct = (id) => {
      const newCompareList = compareList.filter((p) => p.id !== id);
      const newProducts = products.filter((p) => p["Artikelnummer"] !== id);

      setProducts(newProducts);
      setCompareList(newCompareList);

      updatePropList(products, propsList);
   };

   const updateCompareList = (id, isActive) => {
      const newCompareList = compareList.map((p) => (p.id === id ? { ...p, isActive } : p));

      setCompareList(newCompareList);

      updatePropList(products, propsList);
   };

   React.useEffect(() => {
      fetchAllProducts();
   }, []);

   return {
      visibleProducts: products.filter((product) =>
         compareList.find((p) => p.isActive && p.id === product["Artikelnummer"])
      ),
      propsList,
      compareList,
      errors,
      loading,
      refetch: fetchAllProducts,
      removeProduct,
      updateCompareList
   };
};
