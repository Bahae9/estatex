import {
  DEFAULT_FEEDBACK_VALUES,
  FeedbackValues,
  feedbackSchema,
} from "@/components/routes/platform/data";
import { RatesProps } from "@/components/routes/platform/feedback";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AddedFeedbackProps, FeedbackProps } from "@/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type NewFeedbackFormProps = {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setFeedbacks:
    | React.Dispatch<React.SetStateAction<FeedbackProps[]>>
    | React.Dispatch<React.SetStateAction<AddedFeedbackProps[]>>;
  setRates?: React.Dispatch<React.SetStateAction<RatesProps[]>>;
  userId?: string;
  usersIds?: string[];
};

const NewFeedbackForm = ({
  setFeedbacks,
  setIsOpen,
  setRates,
  userId,
  usersIds,
}: NewFeedbackFormProps) => {
  const form = useForm<FeedbackValues>({
    resolver: zodResolver(feedbackSchema),
    mode: "onChange",
    defaultValues: userId
      ? { ...DEFAULT_FEEDBACK_VALUES, userId }
      : DEFAULT_FEEDBACK_VALUES,
  });
  function onSubmit(data: FeedbackValues) {
    fetch("http://localhost:8080/api/feedbacks", {
      method: "POST",
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
                "Failed to create feedback. Please try again later."
            );
          });
        }
        return response.json();
      })
      .then((response) => {
        toast({
          description: "Feedback created successfully!",
          variant: "success",
        });
        setFeedbacks((prev: any) =>
          userId ? [response, ...prev].slice(0, 3) : [...prev, response]
        );
        if (setRates) {
          setRates((prev) => [
            ...prev,
            { id: response.id, rate: response.rate },
          ]);
        }
        form.reset();
        if (setIsOpen) {
          console.log("err");
          setIsOpen(false);
        }
      })
      .catch((error) => {
        toast({
          description:
            error.message || "An error occurred while creating the feedback.",
          variant: "destructive",
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-3">
          {usersIds && usersIds.length > 0 && (
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Id</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          "w-full mt-2",
                          form.getFieldState("userId").error &&
                            "border-destructive placeholder:text-destructive/60 text-destructive"
                        )}
                      >
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {usersIds.map((userId) => (
                          <SelectItem value={userId} key={userId}>
                            {userId}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
            Add new feedback
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default NewFeedbackForm;
