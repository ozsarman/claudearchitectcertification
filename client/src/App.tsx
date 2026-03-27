import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ExamProvider } from "./contexts/ExamContext";
import Home from "./pages/Home";
import ExamPage from "./pages/ExamPage";
import TimedExamPage from "./pages/TimedExamPage";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/practice" component={ExamPage} />
      <Route path="/exam" component={TimedExamPage} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <ExamProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ExamProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
