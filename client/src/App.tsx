import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Loader2 } from "lucide-react";

const Home = lazy(() => import("@/pages/home"));
const Calculator = lazy(() => import("@/pages/calculator"));
const BudgetFinder = lazy(() => import("@/pages/budget-finder"));
const CountryInsights = lazy(() => import("@/pages/country-insights"));
const ApplicationResources = lazy(() => import("@/pages/application-resources"));
const Rankings = lazy(() => import("@/pages/rankings"));
const ArrivalGuide = lazy(() => import("@/pages/arrival-guide"));
const PRJobs = lazy(() => import("@/pages/pr-jobs"));
const Accreditation = lazy(() => import("@/pages/accreditation"));
const FieldSuggester = lazy(() => import("@/pages/field-suggester"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
}

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
      <Route path="/accreditation" component={Accreditation} />
      <Route path="/field-suggester" component={FieldSuggester} />
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
            <Suspense fallback={<PageLoader />}>
              <Router />
            </Suspense>
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
