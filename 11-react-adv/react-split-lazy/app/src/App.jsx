import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router";
import ErrorBoundary from "./components/ErrorBoundary";
import { PageSkeleton, CardSkeleton } from "./components/Skeleton";
import NetworkLog from "./components/NetworkLog";

// ============================================
// LEVEL 1 — Basic: lazy() + Suspense
// ============================================
// These dynamic imports tell Vite to split each page into its own chunk
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Admin = lazy(() => import("./pages/Admin"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));

// Home is NOT lazy — it's in the initial bundle (for comparison)
import Home from "./pages/Home";

// ============================================
// LEVEL 4 — Prefetch on hover + idle
// ============================================
// Store import functions for prefetching
const prefetchMap = {
  "/dashboard": () => import("./pages/Dashboard"),
  "/admin": () => import("./pages/Admin"),
  "/reports": () => import("./pages/Reports"),
  "/settings": () => import("./pages/Settings"),
};

function PrefetchLink({ to, children }) {
  const handleMouseEnter = useCallback(() => {
    // Prefetch the chunk when user hovers the link
    prefetchMap[to]?.();
  }, [to]);

  return (
    <NavLink
      to={to}
      onMouseEnter={handleMouseEnter}
      className={({ isActive }) =>
        `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? "bg-indigo-600 text-white shadow-sm"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

// ============================================
// LEVEL 4 — Prefetch on idle (requestIdleCallback)
// ============================================
function useIdlePrefetch() {
  useEffect(() => {
    if (!("requestIdleCallback" in window)) return;

    const id = requestIdleCallback(() => {
      // Prefetch dashboard during idle time — most likely next navigation
      import("./pages/Dashboard");
    });

    return () => cancelIdleCallback(id);
  }, []);
}

// ============================================
// Route change tracker (for training visibility)
// ============================================
function RouteTracker({ onNavigate }) {
  const location = useLocation();
  useEffect(() => {
    onNavigate(location.pathname);
  }, [location.pathname, onNavigate]);
  return null;
}

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [level, setLevel] = useState(1);
  const [history, setHistory] = useState(["/"]);

  useIdlePrefetch(); // Level 4

  const handleNavigate = useCallback((path) => {
    setHistory((prev) => {
      if (prev[prev.length - 1] === path) return prev;
      return [...prev.slice(-4), path];
    });
  }, []);

  return (
    <BrowserRouter>
      <RouteTracker onNavigate={handleNavigate} />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Code Splitting & Lazy Loading
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Navigate between pages — watch the Network tab for chunks
                </p>
              </div>

              {/* Level selector */}
              <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                {[1, 2, 3, 4, 5].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      level === l
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    L{l}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex gap-2 flex-wrap">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`
                }
              >
                Home (eager)
              </NavLink>
              <PrefetchLink to="/dashboard">Dashboard (lazy)</PrefetchLink>
              <PrefetchLink to="/admin">Admin (lazy)</PrefetchLink>
              <PrefetchLink to="/reports">Reports (lazy)</PrefetchLink>
              <PrefetchLink to="/settings">Settings (lazy)</PrefetchLink>
            </nav>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pages — 2/3 */}
            <div className="lg:col-span-2">
              {/* LEVEL 3 — ErrorBoundary wraps Suspense */}
              <ErrorBoundary>
                <Suspense
                  fallback={
                    level >= 3 ? (
                      <PageSkeleton />
                    ) : (
                      <div className="flex items-center gap-3 text-gray-500 py-12 justify-center">
                        <svg className="animate-spin h-5 w-5 text-indigo-500" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Loading page...
                      </div>
                    )
                  }
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Level info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Level {level} — {levelInfo[level].title}
                </h3>
                <ul className="space-y-2">
                  {levelInfo[level].points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-indigo-500 font-bold mt-0.5">›</span>
                      <span className="text-gray-600">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Navigation history */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Navigation History
                </h3>
                <div className="space-y-1">
                  {history.map((path, i) => (
                    <div key={i} className="text-sm font-mono flex items-center gap-2">
                      <span className="text-gray-400">{i + 1}.</span>
                      <span className="text-indigo-600">{path}</span>
                      {i === history.length - 1 && (
                        <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                          current
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Network log */}
              <NetworkLog />

              {/* Build command */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Verify Chunks
                </h3>
                <code className="block bg-gray-900 text-green-400 px-4 py-3 rounded-lg text-sm">
                  npm run build
                </code>
                <p className="text-xs text-gray-400 mt-2">
                  Check dist/assets/ for separate chunk files
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

const levelInfo = {
  1: {
    title: "Basic Lazy Loading",
    points: [
      "lazy(() => import('./Page')) creates a separate chunk",
      "Suspense shows fallback while chunk loads",
      "Home is eager-loaded (no lazy) — compare in Network tab",
      "Navigate to Dashboard — see the new .js file load",
    ],
  },
  2: {
    title: "Route-Based Splitting",
    points: [
      "Each route = separate bundle (chunk)",
      "Only the visited page's JS is downloaded",
      "Run npm run build → see multiple chunk files",
      "Initial load is smaller = faster startup",
    ],
  },
  3: {
    title: "Suspense Strategy & Error Boundary",
    points: [
      "Skeleton UI instead of plain 'Loading...' text",
      "ErrorBoundary catches lazy load failures",
      "Multiple Suspense boundaries = partial loading",
      "Progressive rendering > blank screen",
    ],
  },
  4: {
    title: "Prefetch & Priority Loading",
    points: [
      "Hover any nav link → chunk prefetches (check Network)",
      "requestIdleCallback prefetches Dashboard on idle",
      "preload = high priority NOW, prefetch = low priority LATER",
      "Result: navigation feels instant",
    ],
  },
  5: {
    title: "Production Architecture",
    points: [
      "Split by route + split by feature",
      "Hashed filenames enable long-term caching",
      "Critical path: Home (eager) → Dashboard (prefetched)",
      "Rare pages (Admin, Settings) → lazy only",
      "Measure with Lighthouse → split → lazy → prefetch → cache",
    ],
  },
};
