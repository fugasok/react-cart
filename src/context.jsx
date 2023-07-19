import { useContext, useReducer, useEffect, createContext } from "react";
import reducer from "./reducer";
import cartItems from "./data";
import {
	CLEAR_CART,
	REMOVE_ITEM,
	INCREASE,
	DECREASE,
	LOADING,
	DISPLAY_ITEMS,
} from "./actions";

const AppContext = createContext();

const initialState = {
	loading: false,
	cart: new Map(cartItems.map((item) => [item.id, item])),
};
3;

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const clearCart = () => {
		dispatch({ type: CLEAR_CART });
	};

	return (
		<AppContext.Provider value={{ ...state, clearCart }}>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};
