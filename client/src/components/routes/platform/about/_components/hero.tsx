import { Package2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-12 min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-60px)] flex justify-center items-center">
      <div className="container max-w-6xl grid items-center justify-center gap-10 px-4 md:px-8">
        <div className="flex flex-col items-center text-center">
          <Package2 className="h-20 w-20" />
          <h1 className="text-5xl font-semibold">EstateX</h1>
          <div className="space-y-2 mt-4 text-lg">
            <p>
              Welcome to EstateX, your trusted partner in real estate
              management. Specializing in the sale and rental of properties, our
              agency is committed to offering customized services to meet all
              your real estate needs. Our experienced team is at your service to
              guide you through every step of your project, from finding the
              ideal property to successfully closing transactions. We ensure an
              exceptional customer experience focused on transparency and open
              communication.
            </p>
            <p>
              We emphasize transparency, trust, and open communication to build
              strong relationships with our clients. With our in-depth knowledge
              of the local market and personalized approach, we are able to
              offer you informed advice and strategies tailored to your goals.
            </p>
            <p>
              At EstateX, we invest in the latest technologies and innovative
              methods to guarantee effective solutions and an exceptional
              customer experience. Trust our expertise to achieve your real
              estate dreams and maximize your success. We are here to support
              you in your real estate projects, whether it is renting or
              selling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
