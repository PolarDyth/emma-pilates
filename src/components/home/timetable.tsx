"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CalendarClient from "@/components/schedule/calendar-client";
import type { ScheduleDocument } from "@/lib/types/Schedule";

interface HomeTimeTableProps {
  schedules: ScheduleDocument[];
}

export default function Timetable({ schedules }: HomeTimeTableProps) {
  const todayISO = new Date().toISOString().slice(0, 10);

  return (
    <section id="timetable" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
            Schedule
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            Class Timetable
          </h2>
          <p className="text-lg text-muted-foreground">
            Find a class that fits your schedule and experience level. Browse our daily schedule below.
          </p>
        </div>

        <div className="mb-8">
          <Suspense>
            <CalendarClient 
              initialWeekStartISO={todayISO} 
              schedules={schedules} 
              initialViewMode="daily"
              hideViewToggle={true}
              hideTitle={true}
              hideFilter={true}
            />
          </Suspense>
        </div>

        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Private 1-to-1 sessions are available by appointment. Please contact me to schedule.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="#contact">Contact for Booking</Link>
            </Button>
            <Button asChild>
              <Link href="/timetable">View Full Timetable</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
