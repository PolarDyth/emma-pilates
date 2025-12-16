import { getSchedules } from "@/lib/schedule-service";
import type { ScheduleDocument } from "@/lib/types/Schedule";
import { Suspense } from "react";
import CalendarClient from "@/components/schedule/calendar-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 3600; // build statically and revalidate hourly (webhook can also tag-revalidate)

export default async function TimetablePage() {
    const todayISO = new Date().toISOString().slice(0, 10);
    const schedules = await getSchedules();

    return (
        <main className="min-h-screen py-16 md:py-24">
            <div className="container mx-auto px-4">
                <CalendarNavigator initialWeekStartISO={todayISO} schedules={schedules} />

                {/* Class Level Info */}
                <section className="mt-12 md:mt-16">
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-xl border border-green-200 bg-green-50/70 p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                                <h3 className="text-lg font-semibold text-foreground">Beginner Classes</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Perfect for those new to Pilates. Focus on fundamentals, proper form, and building a foundation.
                            </p>
                        </div>

                        <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
                                <h3 className="text-lg font-semibold text-foreground">Intermediate Classes</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                For those with Pilates experience. More challenging exercises to build strength and control.
                            </p>
                        </div>

                        <div className="rounded-xl border border-purple-200 bg-purple-50/70 p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-block h-2.5 w-2.5 rounded-full bg-purple-500" />
                                <h3 className="text-lg font-semibold text-foreground">Advanced Classes</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                For experienced practitioners. Complex movements and sequences to challenge your practice.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Booking Information */}
                <section className="mt-12 md:mt-16 rounded-xl border bg-accent/20">
                    <div className="p-6 md:p-8">
                        <h3 className="text-xl font-semibold mb-6 text-foreground">Booking Information</h3>
                        <div className="grid gap-8 md:grid-cols-2">
                            <div>
                                <h4 className="text-base font-semibold mb-3">How to Book</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    To reserve your spot in any class, please contact Emma directly via phone, email, or the contact form.
                                </p>
                                <Link href="/#contact">
                                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Contact Emma</Button>
                                </Link>
                            </div>

                            <div>
                                <h4 className="text-base font-semibold mb-3">Important Notes</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-2">
                                    <li>Please arrive 10 minutes before class starts</li>
                                    <li>Wear comfortable clothing that allows movement</li>
                                    <li>Bring your own mat or use one provided</li>
                                    <li>24-hour cancellation policy applies</li>
                                </ul>

                                <div className="mt-6 rounded-lg border bg-muted/30 p-4">
                                    <p className="italic text-sm text-muted-foreground">&ldquo;Breathing is the first act of life and the last, our very life depends on it&rdquo;</p>
                                    <p className="mt-2 text-xs text-muted-foreground">— Joseph Pilates</p>
                                    <p className="mt-2 text-xs text-muted-foreground">Focus on your breath in every class for maximum benefit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

async function CalendarNavigator({ initialWeekStartISO, schedules }: { initialWeekStartISO: string; schedules: ScheduleDocument[] }) {
    // Server component wrapper that delegates to a client component for navigation
    return (
        <Suspense>
            <CalendarClient initialWeekStartISO={initialWeekStartISO} schedules={schedules} />
        </Suspense>
    );
}


