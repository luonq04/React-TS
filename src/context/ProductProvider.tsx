// import { ReactNode, createContext, useEffect, useReducer } from "react";
// import { IProduct } from "../interface/product";
// import axios from "axios";

// const initialState = {
//   value: [] as IProduct[],
//   isLoading: false,
// };
// function reducer(state, action) {
//   switch (action.type) {
//     case "LOADING":
//       return { ...state, isLoading: true };

//     case "SET_PRODUCTS":
//       return {
//         ...state,
//         value: action.payload,
//         isLoading: false,
//       };

//     case "DELETE_PPRODUCT":
//       return {
//         ...state,
//         value: state.value.filter(
//           (product: IProduct) => product._id !== action.payload
//         ),
//       };

//     case "ADD_PRODUCT":
//       return {
//         ...state,
//         value: [...state.value, action.payload],
//       };

//     case "EDIT_PRODUCT":
//       return {
//         ...state,
//         value: state.value.map((pro) =>
//           pro.id === action.payload._id ? action.payload : pro
//         ),
//       };

//     default:
//       throw new Error("Unknown action type");
//   }

//   return state;
// }

// export const ProductContext = createContext({} as any);

// const ProductContextProvider = ({ children }: { children: ReactNode }) => {
//   const [products, dispatch] = useReducer(reducer, initialState);

//   useEffect(function () {
//     (async () => {
//       dispatch({ type: "LOADING" });
//       try {
//         const { data } = await axios.get("http://localhost:8080/api/products");

//         dispatch({ type: "SET_PRODUCTS", payload: data });
//       } catch (error) {
//         console.log(error);
//       }
//     })();
//   }, []);

//   function deleteProduct(id: string) {
//     dispatch({ type: "DELETE_PPRODUCT", payload: id });
//   }

//   function addProduct(product: IProduct) {
//     dispatch({ type: "ADD_PRODUCT", payload: product });
//   }

//   function editProduct(product: IProduct) {
//     dispatch({ type: "EDIT_PRODUCT", payload: product });
//   }

//   return (
//     <ProductContext.Provider
//       value={{ products, deleteProduct, addProduct, editProduct, dispatch }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export default ProductContextProvider;
