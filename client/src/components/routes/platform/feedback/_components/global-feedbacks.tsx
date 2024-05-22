import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FeedbackProps } from "@/types/db";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import FeedbackCard from "./feedback-card";

const GlobalFeedbacks = ({
  reviews,
}: {
  reviews: (FeedbackProps & { fullName: string })[];
}) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Our Client Feedback</CardTitle>
        <CardDescription>
          Discover the three most positive reviews from our clients that reflect
          our commitment to excellence and customer satisfaction.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {reviews && reviews.length > 0 ? (
          <div className="grid gap-6">
            {reviews.slice(0, 3).map((el) => (
              <FeedbackCard key={el.id} {...el} />
            ))}
          </div>
        ) : reviews ? (
          <p>
            No feedback from other clients is currently available. Feedback will
            be displayed here once added.
          </p>
        ) : (
          <div className="grid gap-6">
            <Skeleton className="h-[98px] w-full" />
            <Skeleton className="h-[98px] w-full" />
            <Skeleton className="h-[98px] w-full" />
          </div>
        )}
      </CardContent>
      {reviews && reviews.length > 0 && (
        <CardFooter>
          <Button asChild size="sm" className="ml-auto gap-1 mt-2">
            <Link to="clients-feedbacks">
              See All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default GlobalFeedbacks;
