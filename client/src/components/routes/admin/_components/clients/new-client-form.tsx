import {
  DEFAULT_SIGNUP_VALUES,
  SignupValues,
  signupSchema,
} from "@/components/routes/auth/data";
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
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { UserFullDataProps } from "@/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const NewClientForm = ({
  setIsOpen,
  setClients,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setClients: React.Dispatch<React.SetStateAction<UserFullDataProps[]>>;
}) => {
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: DEFAULT_SIGNUP_VALUES,
  });

  function onSubmit(data: SignupValues) {
    fetch("http://localhost:8080/auth/signup", {
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
                "Failed to create client. Please try again later."
            );
          });
        }
        return response.json();
      })
      .then((response) => {
        toast({
          description: "Client created successfully!",
          variant: "success",
        });
        setClients((prev) => [...prev, response]);
        form.reset();
        setIsOpen(false);
      })
      .catch((error) => {
        toast({
          description:
            error.message || "An error occurred while creating the client.",
          variant: "destructive",
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-3">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    className={cn(
                      form.getFieldState("fullName").error &&
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone Number{" "}
                  <span
                    className={cn(
                      "text-muted-foreground ml-1",
                      form.getFieldState("phoneNumber").error &&
                        "text-destructive/80"
                    )}
                  >
                    {`(Optional)`}
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    className={cn(
                      form.getFieldState("phoneNumber").error &&
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    className={cn(
                      form.getFieldState("email").error &&
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className={cn(
                      form.getFieldState("password").error &&
                        "border-destructive placeholder:text-destructive/60 text-destructive"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" type="submit">
            Add new client
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default NewClientForm;
