import { useAuth } from "@/components/contexts/auth-context";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FeedbackProps, UserDataProps } from "@/types/db";
import { RateRange } from "@/types/helper";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import NewFeedbackForm from "../../admin/_components/feedbacks/new-feedback-form";
import UserFeedbacks from "./_components/user-feedbacks";
import GlobalFeedbacks from "./_components/global-feedbacks";
import RatingCard from "./_components/rating-card";
import { initialRateProgress } from "../data";

export type RatesProps = {
  rate: number;
  id: number;
};

export type GlobalReviewProps = ReviewProps & UserDataProps;

export type ReviewProps = {
  id: number;
  feedback: string;
  date: string;
} & RatesProps;

export type RateProgressProps = { [key in RateRange]: number };

const Feedback = () => {
  const { userFeedbacks, topUsersFeedbacks, feedbacks } = useLoaderData() as {
    userFeedbacks: FeedbackProps[];
    topUsersFeedbacks: (FeedbackProps & { fullName: string })[];
    feedbacks: RatesProps[];
  };
  const { token } = useAuth();
  const currentUserId = token
    ? (jwtDecode(token) as { id: number })?.id || -1
    : -1;
  const [rates, setRates] = useState(feedbacks);
  const [rateProgress, setRateProgress] =
    useState<RateProgressProps>(initialRateProgress);
  const [userReviews, setUserReviews] = useState(userFeedbacks);

  useEffect(() => {
    if (rates && rates.length > 0) {
      setRateProgress({
        5: rates.filter((el) => el.rate === 5).length,
        4: rates.filter((el) => el.rate === 4).length,
        3: rates.filter((el) => el.rate === 3).length,
        2: rates.filter((el) => el.rate === 2).length,
        1: rates.filter((el) => el.rate === 1).length,
      });
    }
  }, [rates]);

  return (
    <section>
      <div className="grid 2xl:grid-cols-[1fr_400px] gap-4">
        <div className="flex flex-col gap-4">
          <Card className={cn("h-fit")}>
            <CardHeader>
              <CardTitle>Add new Feedback</CardTitle>
              <CardDescription>
                To add a new feedback, fill out the form with the following
                fields
              </CardDescription>
            </CardHeader>
            <NewFeedbackForm
              setFeedbacks={setUserReviews}
              userId={currentUserId.toString()}
              setRates={setRates}
            />
          </Card>
          <UserFeedbacks reviews={userReviews} />
        </div>
        <div>
          <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-4">
            <RatingCard rates={rates} rateProgress={rateProgress} />
            <GlobalFeedbacks reviews={topUsersFeedbacks} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
