import { Link } from "react-router-dom";
import {
  TrendingUp,
  Shield,
  BarChart3,
  Zap,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: TrendingUp,
    title: "Track Transactions",
    description:
      "Monitor every income and expense with detailed categorization and real-time updates.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "JWT authentication + hashed passwords keep your financial data safe.",
  },
  {
    icon: BarChart3,
    title: "Smart Insights",
    description:
      "Visualize spending patterns and gain actionable insights to grow savings.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Instant transaction logging with a clean responsive dashboard built for speed.",
  },
];

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-gray-50/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">
              FinTrack
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              to="/login"
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:bg-muted"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="gradient-primary rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-gray-900"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-4 sm:hidden animate-pulse">
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-muted"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="gradient-primary rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 relative overflow-hidden pt-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-green-500/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 font-bold text-4xl tracking-tight text-white sm:text-5xl lg:text-6xl animate-pulse">
              Take Control of Your{" "}
              <span className="text-gradient">Finances</span>
            </h1>
            <p
              className="mx-auto mb-10 max-w-2xl text-lg text-white/70 animate-pulse"
              style={{ animationDelay: "0.1s" }}
            >
              Track income, manage expenses, and gain powerful insights — all in
              one beautifully simple dashboard.
            </p>
            <div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-pulse"
              style={{ animationDelay: "0.2s" }}
            >
              <Link
                to="/register"
                className="gradient-primary inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105"
              >
                Start Free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="glass inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-medium text-white transition-colors hover:bg-white/10"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative h-16">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 64"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 32L60 37.3C120 43 240 53 360 53.3C480 53 600 43 720 37.3C840 32 960 32 1080 34.7C1200 37 1320 43 1380 45.3L1440 48V64H1380C1320 64 1200 64 1080 64C960 64 840 64 720 64C600 64 480 64 360 64C240 64 120 64 60 64H0V32Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-3xl text-gray-900 sm:text-4xl">
              Everything You Need
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500">
              Powerful tools to help you manage your money with confidence.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-4 inline-flex rounded-xl bg-gray-100 p-3 text-gray-800 transition-colors group-hover:gradient-primary group-hover:text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-bold text-lg text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-white/70">
              Join thousands of users already managing their finances smarter.
            </p>
            <Link
              to="/register"
              className="gradient-primary inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              Create Free Account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FinTrack. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
