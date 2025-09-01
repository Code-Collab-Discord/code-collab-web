"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateTeamForm } from "@/components/team-setup/forms/create-team";
import { JoinTeamForm } from "@/components/team-setup/forms/join-team";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function TeamSetupPage() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <div>Unauthorized. Please sign in to continue.</div>;
  }

  return (
    <div className="container max-w-2xl py-12">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Welcome to CodeCollab</CardTitle>
          <CardDescription>
            Get started by creating a new team or joining an existing one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create Team</TabsTrigger>
              <TabsTrigger value="join">Join Team</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="pt-6">
              <CreateTeamForm />
            </TabsContent>
            
            <TabsContent value="join" className="pt-6">
              <JoinTeamForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}