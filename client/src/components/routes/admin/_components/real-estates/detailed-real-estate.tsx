import { useAuth } from "@/components/contexts/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  AgentProps,
  RealEstateProps,
  TransactionProps,
  UserDataProps,
} from "@/types/db";
import { jwtDecode } from "jwt-decode";
import { Grid2X2, MapPin } from "lucide-react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const DetailedRealEstate = ({ isAdmin }: { isAdmin: boolean }) => {
  const { token } = useAuth();
  const currentUserId = token
    ? (jwtDecode(token) as { id: number })?.id || -1
    : -1;

  const { realEstate, agents, transactions } = useLoaderData() as {
    realEstate: RealEstateProps & UserDataProps;
    agents: AgentProps[];
    transactions: TransactionProps[];
  };

  const {
    title,
    id,
    description,
    price,
    transactionType,
    type,
    updatedAt,
    location,
    size,
    fullName,
    email,
    imageUrls,
    userId,
  } = realEstate;
  const [activeImage, setActiveImage] = useState(0);
  const IMAGES = imageUrls.split(",").map((el) => el.split("@")[1]);

  const [isBuyed, setIdBuyed] = useState(
    transactions.length > 0
      ? transactions.map((el) => el.realEstateId).includes(id)
      : false
  );

  return (
    <div className="grid 2xl:grid-cols-[2fr_3fr] gap-6 md:gap-8 text-lg">
      <div className="flex flex-col gap-4">
        <div className="rounded-lg overflow-hidden flex justify-center items-center h-[500px] object-cover bg-accent">
          <img alt="" className="w-fit h-fit" src={IMAGES[activeImage]} />
        </div>
        <div className="flex h-fit gap-4 flex-shrink-0 flex-wrap">
          {IMAGES.length > 1 &&
            IMAGES.map((el, index) => (
              <div
                key={el}
                className={cn(
                  "rounded-lg w-[100px] h-[100px] overflow-hidden cursor-pointer flex-shrink-0",
                  activeImage !== index && "opacity-80 grayscale"
                )}
                onClick={() => {
                  setActiveImage(index);
                }}
              >
                <img src={el} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
        </div>
      </div>
      <div className="space-y-6">
        <div
          className="
        flex items-center justify-between gap-4"
        >
          <div className="flex flex-wrap gap-2">
            <Badge className="px-5 py-2 text-sm">{type}</Badge>
            <Badge
              className="px-5 py-2 text-sm"
              variant={transactionType === "SALE" ? "third" : "forth"}
            >
              {transactionType}
            </Badge>
          </div>
          <p className="text-lg">{updatedAt}</p>
        </div>
        <div className="grid gap-4">
          <h1 className="font-bold text-5xl line-clamp-2" title={title}>
            {title}
          </h1>
          <p title={description} className="line-clamp-4">
            {description}
          </p>
        </div>
        <div className="flex gap-16 items-center">
          <div className="flex gap-[9px] items-center text-lg font-semibold">
            <MapPin size={28} /> <p className="capitalize">{location}</p>
          </div>
          <div className="flex gap-2.5 items-center text-lg font-semibold">
            <Grid2X2 size={28} /> <p className="pt-0.5">{`${size} m²`}</p>
          </div>
        </div>
        <p className="text-4xl font-bold ml-auto">{price}DA</p>
        <div className="text-base">
          <p>
            Article published by{" "}
            <span className="font-semibold capitalize">{fullName}</span> on our
            website. If you wish to get in touch with the author, please send an
            email to:
          </p>
          <Button
            asChild
            variant={"link"}
            className="text-base"
            onClick={(e) => {
              window.location.href = `mailto:${email}`;
              e.preventDefault();
            }}
          >
            <Link to={`mailto:${email}`}>{email}</Link>
          </Button>
        </div>
        {isBuyed && (
          <>
            {transactions.length > 0 &&
            transactions.map((el) => el.realEstateId).includes(id) ? (
              <p className="text-destructive">This real estate was bought.</p>
            ) : (
              <p className="text-green-700">
                Thank you for purchasing this real estate through our website!
                We appreciate your business and hope you enjoy your new
                property.
              </p>
            )}
          </>
        )}
        {!isAdmin &&
          currentUserId !== userId &&
          currentUserId !== -1 &&
          !isBuyed && (
            <Button
              size={"lg"}
              onClick={async () => {
                if (agents.length < 1) {
                  toast({
                    description:
                      "Sorry, Can't Buying this real estate right now.",
                    variant: "destructive",
                  });
                  return;
                }
                try {
                  const response = await fetch(
                    "http://localhost:8080/api/transactions",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        agentId: agents.map((el) => el.id)[
                          Math.floor(Math.random() * agents.length)
                        ],
                        buyerId: userId,
                        realEstateId: id,
                      }),
                    }
                  );
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                  setIdBuyed(true);
                } catch (error: any) {
                  toast({
                    description:
                      error?.message || "An error occurred while Buying.",
                    variant: "destructive",
                  });
                }
              }}
            >
              Buy Now
            </Button>
          )}
        {!isAdmin && currentUserId === -1 && !isBuyed && (
          <Button size={"lg"} asChild>
            <Link to={"/login"}>Login for Buy</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default DetailedRealEstate;
