import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { navigationConfig } from "#/modules/core/navigation.config";
import { Header } from "#/shared/components/Header";
import { SidePanelProvider } from "#/shared/components/SidePanelContext";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SidePanelProvider>
        <div className="min-h-screen flex flex-col">
          <Toaster />
          <Header />
          <main className="flex-1 p-4 flex flex-col">
            <Routes>
              {navigationConfig.map((route) => (
                <Route
                  key={route.href}
                  path={route.href}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </main>
        </div>
      </SidePanelProvider>
    </BrowserRouter>
  </StrictMode>
);
