import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card/50 py-8 px-4">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Leaf size={18} className="text-primary" />
        <span className="font-heading font-semibold text-sm text-foreground">
          Virtual Gardener AI
        </span>
      </div>
      <p className="text-xs text-muted-foreground">
        © 2026 Virtual Gardener AI. Grow smarter, live greener. 🌿
      </p>
    </div>
  </footer>
);

export default Footer;
