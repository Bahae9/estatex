import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FeedbackProps } from "@/types/db";
import { useLoaderData } from "react-router-dom";
import FeedbackCard from "./_components/feedback-card";

const ClientsFeedbacks = () => {
  const { feedbacks } = useLoaderData() as {
    feedbacks: (FeedbackProps & { fullName: string })[];
  };
  return (
    <div>
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Our Client Feedback</CardTitle>
          <CardDescription>
            Discover the three most positive reviews from our clients that
            reflect our commitment to excellence and customer satisfaction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {feedbacks && feedbacks.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {feedbacks.map((el) => (
                <FeedbackCard key={el.id} {...el} />
              ))}
            </div>
          ) : (
            <p>
              No feedbacks are currently available. Feedbacks will display here
              once added.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsFeedbacks;
