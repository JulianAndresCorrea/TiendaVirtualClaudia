import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const LOCAL_KEY = "tv_cart_v1";

function sumTotals(items) {
  const count = items.reduce((s, it) => s + it.qty, 0);
  const total = items.reduce((s, it) => s + it.qty * (it.price || 0), 0);
  return { count, total };
}

function cartReducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      const items = action.payload || [];
      const totals = sumTotals(items);
      return { ...state, items, ...totals };
    }
    case "ADD": {
      const item = action.payload;
      const exists = state.items.find((i) => i.productId === item.productId);
      let items;
      if (exists) {
        items = state.items.map((i) =>
          i.productId === item.productId
            ? { ...i, qty: i.qty + (item.qty || 1) }
            : i,
        );
      } else {
        items = [...state.items, { ...item, qty: item.qty || 1 }];
      }
      const totals = sumTotals(items);
      return {
        ...state,
        items,
        ...totals,
        lastAdded: { productId: item.productId, ts: Date.now() },
      };
    }
    case "REMOVE": {
      const items = state.items.filter((i) => i.productId !== action.payload);
      const totals = sumTotals(items);
      return { ...state, items, ...totals };
    }
    case "UPDATE_QTY": {
      const { productId, qty } = action.payload;
      let items = state.items.map((i) =>
        i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i,
      );
      items = items.filter((i) => i.qty > 0);
      const totals = sumTotals(items);
      return { ...state, items, ...totals };
    }
    case "CLEAR":
      return { items: [], count: 0, total: 0 };
    case "TOGGLE_DRAWER":
      return { ...state, drawerOpen: !state.drawerOpen };
    case "SET_DRAWER":
      return { ...state, drawerOpen: !!action.payload };
    default:
      throw new Error("Unknown action " + action.type);
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    count: 0,
    total: 0,
    drawerOpen: false,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) {
        const items = JSON.parse(raw);
        dispatch({ type: "HYDRATE", payload: items });
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state.items));
    } catch (e) {}
  }, [state.items]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}

export function useCart() {
  const state = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);
  if (state === undefined || dispatch === undefined)
    throw new Error("useCart must be used within CartProvider");

  const addItem = (product, qty = 1) => {
    const payload = {
      productId: product.id ?? product.productId,
      name: product.name,
      price: product.price,
      image: product.image,
      qty,
    };
    dispatch({ type: "ADD", payload });
  };
  const removeItem = (productId) =>
    dispatch({ type: "REMOVE", payload: productId });
  const updateQty = (productId, qty) =>
    dispatch({ type: "UPDATE_QTY", payload: { productId, qty } });
  const clear = () => dispatch({ type: "CLEAR" });
  const toggleDrawer = () => dispatch({ type: "TOGGLE_DRAWER" });
  const setDrawer = (v) => dispatch({ type: "SET_DRAWER", payload: v });

  return {
    state,
    addItem,
    removeItem,
    updateQty,
    clear,
    toggleDrawer,
    setDrawer,
  };
}

export default CartProvider;
