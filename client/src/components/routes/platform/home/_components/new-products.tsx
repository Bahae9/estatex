import { useAuth } from "@/components/contexts/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RealEstateProps, UserDataProps } from "@/types/db";
import { jwtDecode } from "jwt-decode";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewProducts = ({
  realEstates,
}: {
  realEstates: (RealEstateProps & UserDataProps)[];
}) => {
  const { token } = useAuth();
  const currentUserId = token
    ? (jwtDecode(token) as { userId: number })?.userId || -1
    : -1;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="py-16 flex flex-col bg-muted">
      <div className="px-6 md:px-8 flex flex-col justify-center items-center gap-12 flex-1">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-4xl font-semibold sm:text-5xl">
            New Real Estate Listings
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
            Explore our latest added properties for modern and diverse options.
          </p>
        </div>
        {realEstates.length > 0 ? (
          <Carousel
            setApi={setApi}
            className="w-full max-w-[340px] sm:max-w-xl md:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl"
          >
            <CarouselContent>
              {realEstates.map(
                ({
                  id,
                  title,
                  description,
                  price,
                  updatedAt,
                  transactionType,
                  userId,
                  fullName,
                }) => (
                  <CarouselItem
                    className="basis-[85%] sm:basis-[85%] md:basis-[45%] 2xl:basis-[30%]"
                    key={id}
                  >
                    <Card className="w-full overflow-hidden">
                      <div className="relative">
                        <img
                          alt="Product Image 1"
                          className="w-full h-60 object-cover"
                          height={400}
                          src="/backgrounds/hero.jpg"
                          width={600}
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <Badge
                            variant={
                              transactionType === "SALE" ? "third" : "default"
                            }
                          >
                            {transactionType}
                          </Badge>
                          <p className="text-sm">{updatedAt}</p>
                        </div>
                        <div className="py-4 space-y-1">
                          <h3
                            className="text-xl font-semibold line-clamp-1"
                            title={title}
                          >
                            {title}
                          </h3>
                          <p
                            className="text-muted-foreground line-clamp-1"
                            title={description}
                          >
                            {description}
                          </p>
                        </div>
                        <p className="w-full mb-4 text-muted-foreground">
                          Added By{" "}
                          <span className="font-semibold">
                            {userId === currentUserId ? "you" : fullName}
                          </span>
                        </p>
                        <div className="flex items-center justify-between gap-6">
                          <span className="text-2xl font-bold">{price}DA</span>
                          <Button size="sm" className="gap-2" asChild>
                            <Link to={`/real-estates/${id}`}>
                              See Details <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                )
              )}
            </CarouselContent>
            <div className="relative flex justify-between gap-8 mt-4">
              <div className="flex gap-1">
                <CarouselPrevious className="relative inset-0 translate-y-0" />
                <CarouselNext className="relative inset-0 translate-y-0" />
              </div>
              <div className="py-2 text-center text-sm text-muted-foreground">
                Slide {current} of {count}
              </div>
            </div>
          </Carousel>
        ) : (
          <p>
            No real estates are currently available. Real Estates will display
            here once added.
          </p>
        )}
      </div>
    </section>
  );
};

export default NewProducts;
