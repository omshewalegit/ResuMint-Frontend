import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const isBuilder = location.pathname === "/builder";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-inner">
        {/* Brand */}
        <Link to="/" className="nav-brand">
          <div className="nav-logo-mark">R</div>
          <span>Resu<span className="nav-brand-accent">Mint</span></span>
        </Link>

        {/* Right */}
        <div className="nav-right">
          {!isBuilder && (
            <>
              <a href="#how" className="nav-link">
                How it works
              </a>
              <a href="#features" className="nav-link">
                Features
              </a>
            </>
          )}
          <Link
            to={isBuilder ? "/" : "/builder"}
            className="btn btn-primary btn-sm"
          >
            <span>{isBuilder ? "Home" : "Get started"}</span>
            <span className="btn-icon">
              {isBuilder ? (
                <Home size={13} strokeWidth={2.5} />
              ) : (
                <ArrowRight size={13} strokeWidth={2.5} />
              )}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
