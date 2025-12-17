"use client";

import { useState, useTransition, useEffect } from "react";
import { CalendarWeek } from "@/components/schedule/timetable";
import type { EventsByDate, ScheduleDocument } from "@/lib/types/Schedule";
import { generateWeekEvents } from "@/lib/schedule-utils";

export default function CalendarClient({ 
    initialWeekStartISO, 
    schedules,
    initialViewMode = "weekly",
    hideViewToggle = false,
    hideTitle = false,
    hideFilter = false,
    titleAsH1 = false,
}: { 
    initialWeekStartISO: string; 
    schedules: ScheduleDocument[];
    initialViewMode?: "weekly" | "daily";
    hideViewToggle?: boolean;
    hideTitle?: boolean;
    hideFilter?: boolean;
    titleAsH1?: boolean;
}) {
    const initial = generateWeekEvents(schedules, initialWeekStartISO);
    const [weekStartISO, setWeekStartISO] = useState(initial.weekStartISO);
    const [events, setEvents] = useState<EventsByDate>(initial.events);
    const [viewMode, setViewMode] = useState<"weekly" | "daily">(initialViewMode);
    const [selectedDayIndex, setSelectedDayIndex] = useState(() => {
        // Map initial date (today) to day index in the computed week
        const [y, m, d] = initialWeekStartISO.split("-").map(Number);
        const today = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
        const [wy, wm, wd] = initial.weekStartISO.split("-").map(Number);
        const weekStart = new Date(Date.UTC(wy, (wm || 1) - 1, wd || 1));
        const diffMs = today.getTime() - weekStart.getTime();
        const idx = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        return Math.max(0, Math.min(6, idx));
    });
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        // Default to daily view on mobile devices (< 768px)
        if (window.innerWidth < 768) {
            setViewMode("daily");
        }
    }, []);

    const addDays = (iso: string, days: number): string => {
        const [y, m, d] = iso.split("-").map(Number);
        const dt = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
        dt.setUTCDate(dt.getUTCDate() + days);
        return dt.toISOString().slice(0, 10);
    };

    const navigateWeek = (deltaDays: number) => {
        const targetISO = addDays(weekStartISO, deltaDays);
        startTransition(() => {
            const { weekStartISO: newStart, events: newEvents } = generateWeekEvents(schedules, targetISO);
            setWeekStartISO(newStart);
            setEvents(newEvents);
        });
    };

    const navigateDay = (delta: number) => {
        startTransition(() => {
            let nextIndex = selectedDayIndex + delta;
            if (nextIndex < 0) {
                // go to previous week
                const prevISO = addDays(weekStartISO, -7);
                const { weekStartISO: newStart, events: newEvents } = generateWeekEvents(schedules, prevISO);
                setWeekStartISO(newStart);
                setEvents(newEvents);
                nextIndex = 6;
            } else if (nextIndex > 6) {
                // go to next week
                const nextISO = addDays(weekStartISO, 7);
                const { weekStartISO: newStart, events: newEvents } = generateWeekEvents(schedules, nextISO);
                setWeekStartISO(newStart);
                setEvents(newEvents);
                nextIndex = 0;
            }
            setSelectedDayIndex(nextIndex);
        });
    };

    const handlePrev = () => {
        if (viewMode === "daily") navigateDay(-1);
        else navigateWeek(-7);
    };

    const handleNext = () => {
        if (viewMode === "daily") navigateDay(1);
        else navigateWeek(7);
    };

    return (
        <div className={isPending ? 'opacity-70 transition-opacity' : undefined}>
            <CalendarWeek
                weekStartISO={weekStartISO}
                events={events}
                onPrev={handlePrev}
                onNext={handleNext}
                viewMode={viewMode}
                onSetViewMode={setViewMode}
                selectedDayIndex={selectedDayIndex}
                onSelectDayIndex={setSelectedDayIndex}
                hideViewToggle={hideViewToggle}
                hideTitle={hideTitle}
                hideFilter={hideFilter}
                titleAsH1={titleAsH1}
            />
        </div>
    );
}


