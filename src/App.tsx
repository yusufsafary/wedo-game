import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GameProvider } from "./context/GameContext";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CollectionPage from "./pages/CollectionPage";
import InfoPage from "./pages/InfoPage";

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-5xl mb-4">🌌</p>
        <p className="text-white text-lg font-bold">Page not found</p>
      </div>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#080318]">
      <TopBar />
      <main className="pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/collection" component={CollectionPage} />
        <Route path="/info" component={InfoPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameProvider>
        <WouterRouter base={""}>
          <Router />
        </WouterRouter>
      </GameProvider>
    </QueryClientProvider>
  );
}

export default App;
