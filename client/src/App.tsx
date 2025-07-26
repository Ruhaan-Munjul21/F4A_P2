import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Marketplace from "@/pages/marketplace";
import About from "@/pages/about";
import Services from "@/pages/services";
import Donate from "@/pages/donate";
import Contact from "@/pages/contact";
import Gallery from "@/pages/gallery";
import ClassRegistration from "@/pages/class-registration";
import GearDropoff from "@/pages/gear-dropoff";
import GearPickup from "@/pages/gear-pickup";
import EndowmentProgress from "@/pages/endowment-progress";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/donate" component={Donate} />
      <Route path="/contact" component={Contact} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/register" component={ClassRegistration} />
      <Route path="/gear-dropoff" component={GearDropoff} />
      <Route path="/gear-pickup" component={GearPickup} />
      <Route path="/endowment" component={EndowmentProgress} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
