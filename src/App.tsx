
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import China from "./pages/China";
import Bali from "./pages/Bali";
import Vietnam from "./pages/Vietnam";
import DebtCheck from "./pages/DebtCheck";
import Admin from "./pages/Admin";
import SouthKorea from "./pages/SouthKorea";
import Zanzibar from "./pages/Zanzibar";
import Mauritius from "./pages/Mauritius";
import Boracay from "./pages/Boracay";
import Maldives from "./pages/Maldives";
import Egypt from "./pages/Egypt";
import Cuba from "./pages/Cuba";
import Bahrain from "./pages/Bahrain";
import UAE from "./pages/UAE";
import Singapore from "./pages/Singapore";
import Malaysia from "./pages/Malaysia";
import Cambodia from "./pages/Cambodia";
import Dominicana from "./pages/Dominicana";
import Tunisia from "./pages/Tunisia";
import Thailand from "./pages/Thailand";
import Seychelles from "./pages/Seychelles";
import Japan from "./pages/Japan";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/china" element={<China />} />
          <Route path="/bali" element={<Bali />} />
          <Route path="/vietnam" element={<Vietnam />} />
          <Route path="/debt-check" element={<DebtCheck />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/south-korea" element={<SouthKorea />} />
          <Route path="/zanzibar" element={<Zanzibar />} />
          <Route path="/mauritius" element={<Mauritius />} />
          <Route path="/boracay" element={<Boracay />} />
          <Route path="/maldives" element={<Maldives />} />
          <Route path="/egypt" element={<Egypt />} />
          <Route path="/cuba" element={<Cuba />} />
          <Route path="/bahrain" element={<Bahrain />} />
          <Route path="/uae" element={<UAE />} />
          <Route path="/singapore" element={<Singapore />} />
          <Route path="/malaysia" element={<Malaysia />} />
          <Route path="/cambodia" element={<Cambodia />} />
          <Route path="/dominicana" element={<Dominicana />} />
          <Route path="/tunisia" element={<Tunisia />} />
          <Route path="/thailand" element={<Thailand />} />
          <Route path="/seychelles" element={<Seychelles />} />
          <Route path="/japan" element={<Japan />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;