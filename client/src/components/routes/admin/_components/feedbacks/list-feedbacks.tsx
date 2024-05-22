import Stars from "@/components/routes/platform/feedback/_components/stars";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { AddedFeedbackProps } from "@/types/db";
import { format } from "date-fns";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import UpdateFeedbackForm from "./update-feedback-form";

const ListFeedbacks = ({
  feedbacks,
  setFeedbacks,
}: {
  feedbacks: AddedFeedbackProps[];
  setFeedbacks: React.Dispatch<React.SetStateAction<AddedFeedbackProps[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFeedback, setCurrentFeedback] =
    useState<null | AddedFeedbackProps>(null);
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
          <CardTitle>Feedbacks</CardTitle>
          <CardDescription>
            All feedbacks will be displayed in this table.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid gap-8">
        {feedbacks && feedbacks.length > 0 ? (
          <>
            <Table className="table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>Feedback Id</TableHead>
                  <TableHead>Client Id</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbacks.map(
                  ({ id, userId, feedback, rate, createdAt, updatedAt }) => (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{userId}</TableCell>
                      <TableCell className="w-[50%]" title={feedback}>
                        <p className="text-wrap line-clamp-2">{feedback}</p>
                      </TableCell>
                      <TableCell>
                        <Stars rate={rate} />
                      </TableCell>
                      <TableCell>{format(createdAt, "yyyy-MM-dd")}</TableCell>
                      <TableCell>{format(updatedAt, "yyyy-MM-dd")}</TableCell>
                      <TableCell>
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
                                id,
                                userId,
                                feedback,
                                rate,
                                createdAt,
                                updatedAt,
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
                key={currentFeedback.id}
              >
                <DialogContent className="max-w-4xl h-[90vh] md:h-fit">
                  <Card className="h-full border-0 flex flex-col justify-center w-full">
                    <CardHeader>
                      <CardTitle>Update Feedback</CardTitle>
                      <CardDescription>
                        To update feedback information, please fill out the form
                        with the following fields
                      </CardDescription>
                    </CardHeader>
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
                  </Card>
                </DialogContent>
              </Dialog>
            )}
          </>
        ) : (
          <p>
            No feedbacks are currently available. feedbacks will display here
            once added.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ListFeedbacks;
