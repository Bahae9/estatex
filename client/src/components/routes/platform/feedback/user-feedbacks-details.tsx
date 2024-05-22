import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddedFeedbackProps, FeedbackProps } from "@/types/db";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Stars from "./_components/stars";
import { toast } from "@/components/ui/use-toast";
import UpdateFeedbackForm from "../../admin/_components/feedbacks/update-feedback-form";
import { useAuth } from "@/components/contexts/auth-context";
import { jwtDecode } from "jwt-decode";

const UserFeedbacksDetails = () => {
  const { userFeedbacks } = useLoaderData() as {
    userFeedbacks: FeedbackProps[];
  };
  const { token } = useAuth();
  const currentUserId = token
    ? (jwtDecode(token) as { id: number })?.id || -1
    : -1;
  const [isOpen, setIsOpen] = useState(false);
  const [currentFeedback, setCurrentFeedback] =
    useState<null | AddedFeedbackProps>(null);

  const [feedbacks, setFeedbacks] = useState(
    userFeedbacks.map((el) => ({ ...el, userId: currentUserId }))
  );

  async function removeFeedback(id: number) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/feedbacks/${id}`,
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
        return { success: false, message: "Failed to delete feedback." };
      }
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row gap-6 space-y-0">
        <div className="grid gap-2">
          <CardTitle>My Feedbacks</CardTitle>
          <CardDescription
            className="line-clamp-2"
            title="This table shows feedback entries that you have submitted."
          >
            This table shows feedback entries that you have submitted.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-8">
        {feedbacks && feedbacks.length > 0 ? (
          <>
            <Table className="table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>Feedback</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead>Rates</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbacks.map(
                  ({ createdAt, feedback, id, rate, updatedAt }) => (
                    <TableRow key={id}>
                      <TableCell className="text-wrap w-[50%]" title={feedback}>
                        <p className="line-clamp-2"> {feedback}</p>
                      </TableCell>
                      <TableCell>{createdAt}</TableCell>
                      <TableCell>{updatedAt}</TableCell>
                      <TableCell>
                        <Stars rate={rate} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={async () => {
                              const result = await removeFeedback(id);
                              if (result.success) {
                                setFeedbacks(
                                  feedbacks.filter(
                                    (feedback) => feedback.id !== id
                                  )
                                );
                                toast({
                                  description: "Feedback removed successfully!",
                                  variant: "success",
                                });
                              } else {
                                toast({
                                  description:
                                    result.message ||
                                    "Failed to remove feedback. Please try again later.",
                                  variant: "destructive",
                                });
                              }
                            }}
                          >
                            <Trash size={20} className="text-destructive" />
                          </button>
                          <button
                            onClick={() => {
                              setIsOpen(true);
                              setCurrentFeedback({
                                createdAt,
                                feedback,
                                updatedAt,
                                rate,
                                userId: currentUserId,
                                id,
                              });
                            }}
                          >
                            <Edit size={20} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
            {currentFeedback && (
              <Dialog
                open={isOpen}
                onOpenChange={(e) => {
                  setIsOpen(e);
                }}
                key={currentFeedback?.id}
              >
                <DialogContent className="max-w-2xl h-[90vh] md:h-fit">
                  <UpdateFeedbackForm
                    setIsOpen={setIsOpen}
                    setFeedbacks={setFeedbacks}
                    defaultValues={{
                      feedback: currentFeedback.feedback,
                      rate: currentFeedback.rate,
                      userId: currentFeedback.userId.toString(),
                    }}
                    id={currentFeedback.id}
                  />
                </DialogContent>
              </Dialog>
            )}
          </>
        ) : feedbacks ? (
          <p>
            We would like to hear your opinion! Please take a moment to share
            your feedback with us.
          </p>
        ) : (
          <Skeleton className="w-full h-[267px]" />
        )}
      </CardContent>
    </Card>
  );
};

export default UserFeedbacksDetails;
