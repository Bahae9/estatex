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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DEFAULT_NEW_AGENT_VALUES, AgentValues, agentSchema } from "./data";
import { toast } from "@/components/ui/use-toast";
import { AgentProps } from "@/types/db";

const NewAgentForm = ({
  setIsOpen,
  setAgents,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAgents: React.Dispatch<React.SetStateAction<AgentProps[]>>;
}) => {
  const form = useForm<AgentValues>({
    resolver: zodResolver(agentSchema),
    mode: "onChange",
    defaultValues: DEFAULT_NEW_AGENT_VALUES,
  });

  function onSubmit(data: AgentValues) {
    fetch("http://localhost:8080/api/agents", {
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
              error.message || "Failed to create agent. Please try again later."
            );
          });
        }
        return response.json();
      })
      .then((response) => {
        toast({
          description: "Agent created successfully!",
          variant: "success",
        });
        setAgents((prev) => [...prev, response]);
        form.reset();
        setIsOpen(false);
      })
      .catch((error) => {
        toast({
          description:
            error.message || "An error occurred while creating the agent.",
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
                <FormLabel>Phone Number</FormLabel>
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
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" type="submit">
            Add new agent
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default NewAgentForm;
