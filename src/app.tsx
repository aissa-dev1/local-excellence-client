import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { onMount, Suspense } from "solid-js";
import "./app.css";
import Title from "./components/reusable/title";
import axios from "axios";
import { getApiUrl } from "./utils/get-api-url";
import { feature } from "./feature";
import { Toaster } from "./components/reusable/toaster";
import AppProviders from "./components/providers/app-providers";

export default function App() {
  onMount(async () => {
    feature.init();
    await axios.get(getApiUrl("root"));
  });

  return (
    <Router
      root={(props) => (
        <AppProviders>
          <Title.Self />
          <Suspense>{props.children}</Suspense>
          <Toaster />
        </AppProviders>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
