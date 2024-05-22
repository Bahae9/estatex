import { buttonVariants } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex items-center py-8">
      <div className="w-full px-6 md:px-8 flex flex-col 2xl:flex-row-reverse items-center gap-8 text-center 2xl:text-start">
        <div className="flex-1 max-w-xl 2xl:max-w-max overflow-hidden object-cover flex justify-center items-center">
          <img alt="Hero" src="/backgrounds/hero.jpg" className="rounded-lg" />
        </div>
        <div className="flex flex-col gap-6 w-full flex-1">
          <div className="flex flex-col gap-6 items-center 2xl:items-start">
            <h1 className="max-w-[620px] text-5xl font-bold sm:text-5xl md:text-6xl">
              Your Real Estate Partner
            </h1>
            <p className="max-w-[760px] text-muted-foreground">
              Discover modern and efficient real estate management with EstateX.
              Simplify the management of your properties, maximize your
              transactions, and offer an exceptional client experience. Join us
              today for hassle-free real estate management.
            </p>
          </div>
          <div className="flex gap-2 mt-2 justify-center 2xl:justify-start">
            <Link className={buttonVariants()} to="/real-estates">
              View Real Estates
            </Link>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-2",
              })}
              to="/about"
            >
              About Us
              <MoveRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
