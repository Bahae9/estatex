import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RealEstateProps, UserDataProps } from "@/types/db";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const RealEstateCard = ({
  title,
  description,
  updatedAt,
  type,
  transactionType,
  id,
  fullName,
  price,
  imageUrls,
}: RealEstateProps & UserDataProps) => {
  return (
    <div className="grid sm:grid-cols-[2fr_3fr] gap-6 md:gap-8 text-lg">
      <div className="rounded-lg overflow-hidden flex justify-center items-center h-[260px]">
        <img
          alt=""
          className="w-full h-full object-cover"
          src={imageUrls.split(",")[0].split("@")[1]}
        />
      </div>
      <div className="h-full w-full flex flex-col gap-4 py-2 justify-center">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge>{type}</Badge>
            <Badge variant={transactionType === "SALE" ? "third" : "forth"}>
              {transactionType}
            </Badge>
          </div>
          <p className="text-lg">{updatedAt}</p>
        </div>
        <div className="grid gap-3 w-full">
          <h1 className="font-bold text-4xl line-clamp-1" title={title}>
            {title}
          </h1>
          <p title={description} className="line-clamp-1">
            {description}
          </p>
        </div>
        <div className="text-base w-full">
          <p>
            Article published by{" "}
            <span className="font-semibold capitalize">{fullName}</span>
          </p>
        </div>
        <div className="text-base w-full flex justify-between items-center">
          <p className="text-3xl font-bold">{price}DA</p>
          <Button asChild className="ml-auto gap-1">
            <Link to={`/real-estates/${id}`}>
              See Details
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RealEstateCard;
