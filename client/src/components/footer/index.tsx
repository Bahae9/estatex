import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="bg-muted/40 border-t border-foreground/15 h-fit sm:h-[70px] flex items-center py-4">
      <div className="flex h-full w-full flex-col md:flex-row gap-1 items-center justify-center md:justify-between px-6 md:px-8">
        <p className="text-center sm:text-start font-semibold">
          © 2024 EstateX. All rights reserved.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 pt-0.5">
          <Button asChild variant={"link"}>
            <Link to="/privacy">Privacy Policy</Link>
          </Button>
          <Button asChild variant={"link"}>
            <Link to="/terms">Terms of Use</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
