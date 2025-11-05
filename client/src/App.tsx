import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import About from "@/pages/about";
import Services from "@/pages/services";
import Donate from "@/pages/donate";
import Contact from "@/pages/contact";
import Gallery from "@/pages/gallery";
import ClassRegistration from "@/pages/class-registration";
import GearDropoff from "@/pages/gear-dropoff";
import GearPickup from "@/pages/gear-pickup";
import EndowmentProgress from "@/pages/endowment-progress";
import ScholarshipEndowment from "@/pages/scholarship-endowment";
import Admin from "@/pages/admin";
import AdminEditor from "@/pages/admin-editor";
import SimpleImageTest from "@/components/simple-image-test";
import ImageDebug from "@/pages/image-debug";
import TestHero from "@/pages/test-hero";
import TestVideo from "@/pages/test-video";
import VideoTest from "@/pages/video-test";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/donate" component={Donate} />
      <Route path="/contact" component={Contact} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/test-images" component={SimpleImageTest} />
      <Route path="/debug-images" component={ImageDebug} />
      <Route path="/test-hero" component={TestHero} />
      <Route path="/test-video" component={TestVideo} />
      <Route path="/video-test" component={VideoTest} />
      <Route path="/register" component={ClassRegistration} />
      <Route path="/gear-dropoff" component={GearDropoff} />
      <Route path="/gear-pickup" component={GearPickup} />
      <Route path="/endowment" component={EndowmentProgress} />
      <Route path="/scholarship-endowment" component={ScholarshipEndowment} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/editor" component={AdminEditor} />
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
