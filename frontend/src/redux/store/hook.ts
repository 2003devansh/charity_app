import { useDispatch, useSelector, type TypedUseSelectorHook,  } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// ✅ Typed dispatch (so dispatch knows about asyncThunk)
export const useAppDispatch = () => useDispatch<AppDispatch>();

// ✅ Typed selector (so state.auth gets proper types)
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
