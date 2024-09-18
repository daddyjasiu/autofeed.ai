'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { customerPortalAction } from '@/lib/payments/actions';
import {useUser} from "@/lib/auth";
import Link from "next/link";

export function Settings() {
  const { user } = useUser();

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium mb-6">User Settings</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Subscription</CardTitle>
        </CardHeader>
        {user ? (
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <p className="font-medium">
                  Current Plan: {user.planName || 'Free'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user.subscriptionStatus === 'active'
                    ? 'Billed monthly'
                    : user.subscriptionStatus === 'trialing'
                      ? 'Trial period'
                      : 'No active subscription'}
                </p>
              </div>
              <form action={customerPortalAction}>
                <Button type="submit" variant="outline">
                  Manage Subscription
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
        ) : (
            <Button
                asChild
                className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
        )}
      </Card>
    </section>
  );
}
