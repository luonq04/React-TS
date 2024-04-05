// import { createContext, useContext, useReducer } from "react";

// const ProductContext = createContext();

// const initialState = {
//   newAttribute: null,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "cart/added":
//       return {
//         ...state,
//         newAttribute: action.payload,
//       };

//     default:
//       throw new Error("Unknown action type");
//   }
// }

// function ProductProvider({ children }) {
//   const [{ cart, discount }, dispatch] = useReducer(reducer, initialState);

//   function addItem(item) {
//     dispatch({ type: "cart/added", payload: item });
//   }

//   return (
//     <ProductContext.Provider
//       value={{
//         cart,
//         addItem,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// }

// function useProduct() {
//   const context = useContext(ProductContext);

//   if (context === undefined)
//     throw new Error("useProduct was outside the ProductContext");

//   return context;
// }

// export { ProductProvider, useProduct };
