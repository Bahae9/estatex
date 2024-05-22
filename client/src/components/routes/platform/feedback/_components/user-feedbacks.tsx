import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FeedbackProps } from "@/types/db";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Stars from "./stars";

const UserFeedbacks = ({ reviews }: { reviews: FeedbackProps[] }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-6 space-y-0">
        <div className="grid gap-2">
          <CardTitle>My Feedbacks</CardTitle>
          <CardDescription
            className="line-clamp-2"
            title="This table shows only three feedback entries that you have submitted."
          >
            This table shows only last three feedback entries that you have
            submitted.
          </CardDescription>
        </div>
        {reviews && (
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link to="my-feedbacks">
              See Details
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent className="grid gap-8">
        {reviews && reviews.length > 0 ? (
          <>
            <Table className="table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>Feedback</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className="text-right">Rates</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.slice(0, 3).map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell
                      className="text-wrap w-[50%]"
                      title={feedback.feedback}
                    >
                      <p className="line-clamp-2"> {feedback.feedback}</p>
                    </TableCell>
                    <TableCell>{feedback.createdAt}</TableCell>
                    <TableCell>{feedback.updatedAt}</TableCell>
                    <TableCell>
                      <div className="ml-auto w-fit">
                        <Stars rate={feedback.rate} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <p>
            We would like to hear your opinion! Please take a moment to share
            your feedback with us.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default UserFeedbacks;
