import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { DemoModeProvider } from "./contexts/DemoModeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Loader2 } from "lucide-react";
import NotFound from "./pages/NotFound";

const Index = lazy(() => import("./pages/Index"));
const ProductLab = lazy(() => import("./pages/ProductLab"));
const Login = lazy(() => import("./pages/Login"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DemoModeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Index />} />
                <Route path="/product-lab" element={<ProductLab />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </HashRouter>
        </TooltipProvider>
      </DemoModeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
