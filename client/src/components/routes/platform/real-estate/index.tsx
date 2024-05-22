import RealEstateCard from "@/components/shared/cards/real-estate-card";
import { RealEstateProps, UserDataProps } from "@/types/db";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Filters from "./_components/filters";
import FiltersMobile from "./_components/filters-mobile";

const RealEstate = () => {
  const { realEstates: REAL_ESTATES } = useLoaderData() as {
    realEstates: (RealEstateProps & UserDataProps)[];
  };
  const [realEstates, setRealEstates] = useState(REAL_ESTATES);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section>
      <div className="grid grid-cols-1 2xl:grid-cols-[1fr_400px] gap-6 md:gap-8 justify-center">
        <FiltersMobile
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setRealEstates={setRealEstates}
        />
        {realEstates.length > 0 ? (
          <div className="flex flex-col gap-8 sm:gap-6">
            {realEstates.map((card) => (
              <RealEstateCard key={card.id} {...card} />
            ))}
          </div>
        ) : (
          <p>
            Oops! No real estate found with these filters. Try adjusting them or
            reach out for assistance!
          </p>
        )}

        <Filters className="hidden 2xl:flex" setRealEstates={setRealEstates} />
      </div>
    </section>
  );
};

export default RealEstate;
