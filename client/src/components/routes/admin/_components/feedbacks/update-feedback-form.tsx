import {
  FeedbackValues,
  feedbackSchema,
} from "@/components/routes/platform/data";
import Rating from "@/components/routes/platform/feedback/_components/rating";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AddedFeedbackProps } from "@/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const UpdateFeedbackForm = ({
  setIsOpen,
  setFeedbacks,
  defaultValues,
  id,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbacks: React.Dispatch<React.SetStateAction<AddedFeedbackProps[]>>;
  defaultValues: FeedbackValues;
  id: number;
}) => {
  const form = useForm<FeedbackValues>({
    resolver: zodResolver(feedbackSchema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  function onSubmit(data: FeedbackValues) {
    fetch(`http://localhost:8080/api/feedbacks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(
              error.message ||
                "Failed to update feedback. Please try again later."
            );
          });
        }
        return response.json();
      })
      .then((response) => {
        toast({
          description: "Feedback updated successfully!",
          variant: "success",
        });
        setFeedbacks((prev) =>
          prev.map((feedback) => (feedback.id === id ? response : feedback))
        );
        form.reset();
        setIsOpen(false);
      })
      .catch((error) => {
        toast({
          description:
            error.message || "An error occurred while updating the feedback.",
          variant: "destructive",
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-[1fr_300px] gap-4">
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormLabel>Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      autoComplete="off"
                      className={cn(
                        "h-[160px] md:h-[260px]",
                        form.getFieldState("feedback").error &&
                          "border-destructive placeholder:text-destructive/60 text-destructive"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Rating rate={field.value} setRate={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" type="submit">
            Update feedback
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default UpdateFeedbackForm;
