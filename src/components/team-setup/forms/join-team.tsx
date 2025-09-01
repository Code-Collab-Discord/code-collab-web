"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinTeamSchema, type JoinTeamInput } from "@/validations/team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

export function JoinTeamForm() {
  const form = useForm<JoinTeamInput>({
    resolver: zodResolver(joinTeamSchema),
    defaultValues: {
      inviteCode: "",
    },
  });

  const onSubmit = (data: JoinTeamInput) => {
    console.log("Joining team with code:", data.inviteCode);
    toast("Joining team...", {
      description: "Please wait while we add you to the team.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="inviteCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invite Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your invite code"
                  {...field}
                  className="font-mono tracking-wider"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Join Team
        </Button>
      </form>
    </Form>
  );
}