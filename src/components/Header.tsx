import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, LayoutDashboard, FileText, Menu, X, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  const navLinks = [
    { path: "/", label: "Home", icon: null },
    { path: "/report", label: "Report Issue", icon: AlertTriangle },
    { path: "/track", label: "Track Issues", icon: FileText },
    ...(isAdmin ? [{ path: "/dashboard", label: "Dashboard", icon: LayoutDashboard }] : []),
  ];

  const handleAuthClick = async () => {
    if (user) {
      await signOut();
      toast.success("Signed out");
      navigate("/");
    } else {
      navigate("/auth");
    }
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero">
            <AlertTriangle className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            CivicReport
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button
                variant={isActive(link.path) ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Button>
            </Link>
          ))}
          <Button variant="outline" size="sm" className="gap-2 ml-2" onClick={handleAuthClick}>
            {user ? <><LogOut className="h-4 w-4" /> Sign Out</> : <><LogIn className="h-4 w-4" /> Admin Login</>}
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-card p-4 animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive(link.path) ? "default" : "ghost"}
                  className="w-full justify-start gap-2"
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </Button>
              </Link>
            ))}
            <Button variant="outline" className="w-full justify-start gap-2 mt-2" onClick={handleAuthClick}>
              {user ? <><LogOut className="h-4 w-4" /> Sign Out</> : <><LogIn className="h-4 w-4" /> Admin Login</>}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
