import { useContext } from "react";
import { ValueContext } from "../contexts/valueContext";

export function useValue() {
    const context = useContext(ValueContext);

    if (!context) {
      // Optional: Add error handling if the hook is used outside a Provider
      throw new Error("useValueContext must be used within a ThemeProvider");
    }

    return context; 
}