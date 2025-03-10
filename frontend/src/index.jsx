import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  persistQueryClient,
  persistQueryClientRestore,
} from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "animate.css";
import "./index.scss";
import AppRoutes from "./routes";

let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours cache time
      retry: false,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const initializeApp = async () => {
  await persistQueryClientRestore({
    queryClient: queryClient,
    persister: persister,
  });

  persistQueryClient({
    queryClient: queryClient,
    persister: persister,
    maxAge: 1000 * 60 * 60 * 24, // 24 hours persistence
  });

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/*" element={<AppRoutes />} />
              </Routes>
            </BrowserRouter>
            <Toaster position="top-center" />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

initializeApp();
