import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { onMount, Suspense } from "solid-js";
import "./app.css";
import Title from "./components/reusable/title";
import axios from "axios";
import { getApiUrl } from "./utils/get-api-url";
import { feature } from "./feature";
import { MetaProvider } from "@solidjs/meta";
import { Toaster } from "./components/reusable/toaster";

export default function App() {
  onMount(async () => {
    feature.appearance.initTheme();
    await axios.get(getApiUrl("root"));
  });

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title.Self />
          <Suspense>{props.children}</Suspense>
          <Toaster />
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
