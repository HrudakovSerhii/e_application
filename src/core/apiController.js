export const get = async (url) => {
   try {
      const response = await fetch(url, {
         cache: process.env.NODE_ENV === "development" ? "force-cache" : "default",
         headers: {
            "Content-Type": "application/json"
         }
      });

      return {
         data: await response?.json(),
         errors: undefined
      };
   } catch (e) {
      return {
         data: undefined,
         errors: e
      };
   }
};
