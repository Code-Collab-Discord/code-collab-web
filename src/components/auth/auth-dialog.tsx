'use client';

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function AuthDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Get Started</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sign in to CodeCollab</DialogTitle>
                    <DialogDescription>
                        Welcome back! Please sign in to Continue
                    </DialogDescription>
                </DialogHeader>
                <div className="pt-2">
                    <Button
                        size="lg"
                        onClick={() => signIn("discord")}
                        className="w-full bg-[#5865F2] hover:bg-[#4752c4] text-white"
                    >
                        Continue with Discord
                    </Button>
                </div> 
            </DialogContent>
        </Dialog>
    )
}
