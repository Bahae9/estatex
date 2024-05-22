import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { RateRange } from "@/types/helper";
import { calculateRatePercentage, getTheMiddleRate } from "@/utils/calculate";
import { useMemo } from "react";
import { RateProgressProps, RatesProps } from "..";
import Stars, { Star } from "./stars";

const RatingCard = ({
  rates,
  rateProgress,
}: {
  rates: RatesProps[] | null;
  rateProgress: RateProgressProps;
}) => {
  const theMiddleRate = useMemo(
    () => getTheMiddleRate(rateProgress, rates?.length),
    [rates, rateProgress]
  );
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Rate our service</CardTitle>
        <CardDescription>
          How do you rate your experience with our service?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[196px]">
          {rates ? (
            <div className="h-full flex flex-col gap-4 justify-between">
              <div className="flex gap-4 items-center">
                <Stars rate={theMiddleRate} />
                <p className="font-medium leading-none text-sm mt-[2.5px]">
                  {rates.length === 0
                    ? "No ratings yet"
                    : `Based on ${rates.length} rating${
                        rates.length > 1 ? "s" : ""
                      }`}
                </p>
              </div>
              <div className="space-y-2">
                {Object.keys(rateProgress).map((el) => (
                  <div key={el} className="flex gap-3 items-center">
                    <p className="font-medium mt-[2px] w-3 flex items-center justify-center">
                      {el}
                    </p>
                    <Star isActive={true} scale={2.2} />
                    <Progress
                      value={calculateRatePercentage(
                        rateProgress,
                        +el as RateRange,
                        rates?.length
                      )}
                      className="flex-1 border h-3"
                    />
                    <p className="flex items-center justify-end w-16 flex-shrink-0">
                      {`${calculateRatePercentage(
                        rateProgress,
                        +el as RateRange,
                        rates?.length
                      )}%`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Skeleton className="h-full w-full" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingCard;
