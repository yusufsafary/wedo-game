import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { GameProvider } from "./context/GameContext";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import PacksPage from "./pages/PacksPage";
import SwapPage from "./pages/SwapPage";
import CollectionPage from "./pages/CollectionPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

function isLoggedIn(): boolean {
  return localStorage.getItem("wedo_username") !== null;
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  if (!isLoggedIn() && location !== "/login") {
    return <Redirect to="/login" />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route>
        <RequireAuth>
          <AppLayout>
            <Switch>
              <Route path="/" component={PacksPage} />
              <Route path="/swap/:packId" component={SwapPage} />
              <Route path="/swap" component={() => <Redirect to="/" />} />
              <Route path="/collection" component={CollectionPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/profile" component={ProfilePage} />
              <Route component={() => <Redirect to="/" />} />
            </Switch>
          </AppLayout>
        </RequireAuth>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppRoutes />
        </WouterRouter>
        <Toaster position="top-center" theme="dark" />
      </GameProvider>
    </QueryClientProvider>
  );
}

export default App;
