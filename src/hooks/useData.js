import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined)
    throw new Error("DataContext was used outside of the AuthProvider");
  return context
  }