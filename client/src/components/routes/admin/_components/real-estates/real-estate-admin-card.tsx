import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { RealEstateProps, UserDataProps } from "@/types/db";
import { ArrowUpRight, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const RealEstateAdminCard = ({
  realEstate,
  setRealEstates,
  setIsOpen,
  setCurrentRealEstate,
}: {
  setRealEstates:
    | React.Dispatch<React.SetStateAction<(RealEstateProps & UserDataProps)[]>>
    | React.Dispatch<React.SetStateAction<RealEstateProps[]>>;
  setCurrentRealEstate: React.Dispatch<
    React.SetStateAction<RealEstateProps | null>
  >;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  realEstate: (RealEstateProps & UserDataProps) | RealEstateProps;
}) => {
  const [isHover, setIsHover] = useState(false);
  const {
    id,
    title,
    description,
    price,
    imageUrls,
    type,
    transactionType,
    updatedAt,
  } = realEstate;
  const fullName = (realEstate as RealEstateProps & UserDataProps)?.fullName;
  async function removeRealEstate(id: number) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/realEstates/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, message: "Failed to delete real estate." };
      }
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
  return (
    <div
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <div className="relative">
        <img
          alt=""
          className="w-full h-[240px] object-cover rounded-t-lg flex-shrink-0"
          src={imageUrls.split(",")[0].split("@")[1]}
        />
        {isHover && (
          <div className="flex gap-2 absolute top-3 right-3">
            <Button
              variant={"destructive"}
              size={"icon"}
              onClick={async () => {
                const result = await removeRealEstate(id);
                if (result.success) {
                  setRealEstates((prev: any) =>
                    prev.filter((realEstate: any) => realEstate.id !== id)
                  );
                  toast({
                    description: "Real Estate removed successfully!",
                    variant: "success",
                  });
                } else {
                  toast({
                    description:
                      result.message ||
                      "Failed to remove real estate. Please try again later.",
                    variant: "destructive",
                  });
                }
              }}
            >
              <Trash size={18} />
            </Button>
            <Button
              size={"icon"}
              className="bg-green-600 hover:bg-green-600/90 text-white"
              onClick={() => {
                setIsOpen(true);
                setCurrentRealEstate(realEstate);
              }}
            >
              <Edit size={18} />
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-6 flex-1 p-4 pt-6 rounded-b-lg border border-t-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge className="text-sm">{type}</Badge>
            <Badge
              className="text-sm"
              variant={transactionType === "SALE" ? "third" : "forth"}
            >
              {transactionType}
            </Badge>
          </div>
          <p className="text-base">{updatedAt}</p>
        </div>
        <div className="grid gap-4">
          <h2
            className="font-bold text-4xl line-clamp-1 capitalize"
            title={title}
          >
            {title}
          </h2>
          <div>
            <p className="line-clamp-1 w-full break-words" title={description}>
              {description}
            </p>
          </div>
          {fullName && (
            <p
              className="w-full text-sm line-clamp-1"
              title={"Article published by " + fullName}
            >
              Article published by{" "}
              <span className="font-semibold capitalize">{fullName}</span>
            </p>
          )}
        </div>
        <div className="text-base flex justify-between items-center">
          <p className="text-3xl font-bold">{price}DA</p>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link
              to={fullName ? `/admin/real-estates/${id}` : `/dashboard/${id}`}
            >
              See Details
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RealEstateAdminCard;
