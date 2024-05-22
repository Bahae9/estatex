import Footer from "@/components/footer";
import Hero from "./_components/hero";
import NewProducts from "./_components/new-products";
import Statics from "./_components/statics";
import Testimonials from "./_components/testimonials";
import LogoClouds from "./_components/logo-clouds";
import { useLoaderData } from "react-router-dom";
import { FeedbackProps, RealEstateProps, UserDataProps } from "@/types/db";

const Home = () => {
  const { counts, realEstates, feedbacks } = useLoaderData() as {
    counts: {
      userCount: number;
      agentCount: number;
      feedbackCount: number;
      realEstateCount: number;
    };
    realEstates: (RealEstateProps & UserDataProps)[];
    feedbacks: (FeedbackProps & { fullName: string })[];
  };
  return (
    <>
      <div className="min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-60px)] flex flex-col justify-center pb-8">
        <Hero />
        <Statics counts={counts} />
      </div>
      <NewProducts realEstates={realEstates} />
      <Testimonials feedbacks={feedbacks} />
      <LogoClouds />
      <Footer />
    </>
  );
};

export default Home;
