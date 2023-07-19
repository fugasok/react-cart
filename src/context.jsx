import { useContext, useReducer, useEffect, createContext } from "react";
import reducer from "./reducer";
import cartItems from "./data";
import { getTotal } from "./utils";
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

	const { totalAmount, totalCost } = getTotal(state.cart);

	const clearCart = () => {
		dispatch({ type: CLEAR_CART });
	};
	const removeItem = (id) => {
		dispatch({ type: REMOVE_ITEM, payload: { id } });
	};
	const increase = (id) => {
		dispatch({ type: INCREASE, payload: { id } });
	};
	const decrease = (id) => {
		dispatch({ type: DECREASE, payload: { id } });
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				clearCart,
				removeItem,
				increase,
				decrease,
				totalAmount,
				totalCost,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};
