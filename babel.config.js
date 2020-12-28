module.exports = function (api) {
   api.cache(true);

   const devMode = process.env.NODE_ENV === "development";

   let presets = [];

   if (devMode) {
      presets = [["@babel/preset-env"], ["@babel/preset-react"]];
   } else {
      presets = [
         ["@babel/preset-react"],
         [
            "@babel/preset-env",
            {
               targets: {
                  ie: "11"
               }
            }
         ]
      ];
   }

   const plugins = [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-syntax-dynamic-import"
   ];

   return {
      presets,
      plugins
   };
};
