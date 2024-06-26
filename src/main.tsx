import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./sass/general.scss";
import "./sass/style.scss";
import "./sass/shop.scss";
import "./sass/cart.scss";
import "./sass/detail.scss";
import "./sass/checkout.scss";

import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/toaster.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
