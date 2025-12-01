import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/home";
import Calculator from "@/pages/calculator";
import BudgetFinder from "@/pages/budget-finder";
import CountryInsights from "@/pages/country-insights";
import ApplicationResources from "@/pages/application-resources";
import Rankings from "@/pages/rankings";
import ArrivalGuide from "@/pages/arrival-guide";
import PRJobs from "@/pages/pr-jobs";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/budget" component={BudgetFinder} />
      <Route path="/insights/:country" component={CountryInsights} />
      <Route path="/resources" component={ApplicationResources} />
      <Route path="/rankings" component={Rankings} />
      <Route path="/arrival-guide" component={ArrivalGuide} />
      <Route path="/pr-jobs" component={PRJobs} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Toaster />
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
