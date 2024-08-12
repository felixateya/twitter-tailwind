import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { DataProvider } from "./contexts/DataContext.jsx";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>
);
