import { useAuth } from "@/components/contexts/auth-context";
import {
  ProfileValues,
  profileSchema,
} from "@/components/routes/platform/data";
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
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";

const UpdateClientForm = ({
  setIsOpen,
  setClients,
  defaultValues,
  id,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setClients: React.Dispatch<React.SetStateAction<UserFullDataProps[]>>;
  defaultValues: ProfileValues;
  id: number;
}) => {
  const { token, saveToken } = useAuth();
  const { id: userId } = jwtDecode(token as string) as {
    id: number;
  };
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  function onSubmit(data: ProfileValues) {
    fetch(`http://localhost:8080/api/users/${id}`, {
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
                "Failed to update client. Please try again later."
            );
          });
        }
        return response.json();
      })
      .then(async (response) => {
        toast({
          description: "Client updated successfully!",
          variant: "success",
        });
        if (id === userId) {
          saveToken(response.token, false);
          form.resetField("password");
        }
        setClients((prev) =>
          prev.map((client) =>
            client.id === id
              ? {
                  ...client,
                  fullName: data.fullName,
                  email: data.email,
                  phoneNumber: data.phoneNumber,
                }
              : client
          )
        );
        form.reset();
        setIsOpen(false);
      })
      .catch((error) => {
        toast({
          description:
            error.message || "An error occurred while updating the client.",
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
                    placeholder="••••••••"
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
            Update client
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default UpdateClientForm;
