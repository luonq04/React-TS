import { createContext, useContext, useReducer } from "react";

const AttributeContext = createContext();

let completeVariation;

let newVariationArray;

const renderSelects = (dataArrays, currentIndex = 0, combination = []) => {
  const resultArrays = []; // Biến lưu trữ các mảng kết quả

  const loopArrays = (currentIndex, combination) => {
    if (currentIndex === dataArrays.length) {
      resultArrays.push(combination); // Thêm mảng vào biến lưu trữ
      return;
    }

    const currentArray = dataArrays[currentIndex];
    currentArray.forEach((item) => {
      loopArrays(currentIndex + 1, [...combination, item]); // Đệ quy lặp qua các mảng
    });
  };

  loopArrays(currentIndex, combination); // Bắt đầu vòng lặp

  return resultArrays; // Trả về biến lưu trữ các mảng
};

const initialState = {
  attributesStore: [],
  variationsStore: [],
  variationArray: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ATTRIBUTE":
      // console.log("PAYLOAD: ", action.payload);
      return {
        ...state,
        attributesStore: [...state.attributesStore, action.payload],
      };

    case "ADD_VARIATION":
      return {
        ...state,
        variationsStore: [...state.variationsStore, action.payload],
      };

    case "COMPLETE_VARIATION":
      completeVariation = renderSelects(state.variationsStore);

      return {
        ...state,
        variationArray: [completeVariation],
      };

    case "DELETE_VARIATION":
      // console.log("DELETE VARIATION: ", state.variationArray);
      // // console.log("DELETE VARIATION[0]: ", state.variationArray[0]);
      // // console.log("PAYLOAD: ", action.payload);

      // newVariationArray = state.variationArray.map((item) => {
      //   // console.log("ITEM: ", item);
      //   return item.splice(item.indexOf(action.payload), 1);
      // });

      const data = state.variationArray.map((item) =>
        item.filter((i) => i !== action.payload)
      );

      console.log("VARIATION-ARRAY-BEFORE: ", state.variationArray);
      console.log("VARIATION-ARRAY-AFTER: ", data);

      return {
        ...state,
        variationArray: data,
      };

    default:
      return state;
  }
}

function AttributeProvider({ children }) {
  const [{ attributesStore, variationsStore, variationArray }, dispatch] =
    useReducer(reducer, initialState);

  function addAttribute(attribute) {
    dispatch({ type: "ADD_ATTRIBUTE", payload: attribute });
  }

  function addVariation(variation) {
    dispatch({ type: "ADD_VARIATION", payload: variation });
  }

  function completeVariation() {
    dispatch({ type: "COMPLETE_VARIATION" });
  }

  function deleteVariation(variation) {
    dispatch({ type: "DELETE_VARIATION", payload: variation });
  }

  return (
    <AttributeContext.Provider
      value={{
        attributesStore,
        variationsStore,
        variationArray,
        addAttribute,
        addVariation,
        completeVariation,
        deleteVariation,
      }}
    >
      {children}
    </AttributeContext.Provider>
  );
}

function useAttributes() {
  const context = useContext(AttributeContext);

  if (context === undefined)
    throw new Error("AttributeContext was outside the AttributeProvider");

  return context;
}

export { AttributeProvider, useAttributes };
