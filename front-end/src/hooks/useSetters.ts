import { useContext } from "react";
import { SetterContext } from "../contexts/setterContext";


export function useSetters() {
    const context = useContext(SetterContext);

    if (!context) {
      // Optional: Add error handling if the hook is used outside a Provider
      throw new Error("useValueContext must be used within a ThemeProvider");
    }

    return context; 
}