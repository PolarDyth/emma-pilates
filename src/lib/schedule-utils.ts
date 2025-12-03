import type { ScheduleDocument, EventsByDate, CalendarEvent } from "@/lib/types/Schedule";

export function toDateOnly(date: Date): string {
    return date.toISOString().slice(0, 10);
}

export function addDaysUTC(baseISO: string, days: number): string {
    const [y, m, d] = baseISO.split("-").map(Number);
    const dt = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
    dt.setUTCDate(dt.getUTCDate() + days);
    return dt.toISOString().slice(0, 10);
}

export function getStartOfWeekISO(anchorISO: string): string {
    const [y, m, d] = anchorISO.split("-").map(Number);
    const date = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
    const day = date.getUTCDay(); // 0=Sun .. 6=Sat
    const mondayOffset = (day + 6) % 7; // 0=Mon
    date.setUTCDate(date.getUTCDate() - mondayOffset);
    return toDateOnly(date);
}

const dayToIndex: Record<string, number> = {
    monday: 0,
    tuesday: 1,
    wednesday: 2,
    thursday: 3,
    friday: 4,
    saturday: 5,
    sunday: 6,
};

function formatOneTimeTime(dt: Date): string {
    const hours = String(dt.getUTCHours()).padStart(2, '0');
    const minutes = String(dt.getUTCMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function generateWeekEvents(
    schedules: ScheduleDocument[],
    weekAnchorISO: string
): { weekStartISO: string; events: EventsByDate } {
    const weekStartISO = getStartOfWeekISO(weekAnchorISO);
    const [y, m, d] = weekStartISO.split("-").map(Number);
    const weekStart = new Date(Date.UTC(y, (m || 1) - 1, d || 1));

    const dates: Date[] = Array.from({ length: 7 }, (_, i) => {
        const dt = new Date(weekStart);
        dt.setUTCDate(dt.getUTCDate() + i);
        return dt;
    });

    const events: EventsByDate = {};
    for (const dt of dates) {
        events[toDateOnly(dt)] = [];
    }

    for (const s of schedules) {
        if (s.isRecurring) {
            if (!s.daysOfWeek || !s.time) continue;
            for (const day of s.daysOfWeek) {
                const idx = dayToIndex[day];
                if (idx === undefined) continue;
                const dt = new Date(weekStart);
                dt.setUTCDate(dt.getUTCDate() + idx);
                const key = toDateOnly(dt);
                if (s.startDate && key < s.startDate) continue;
                if (s.endDate && key > s.endDate) continue;
                const event: CalendarEvent = {
                    id: `${s._id}-${key}`,
                    date: key,
                    startTimeLabel: s.time,
                    title: s.title || s.class?.title || "Class",
                    level: s.class?.level,
                    location: s.location,
                    instructorName: s.instructor?.name,
                };
                events[key].push(event);
            }
        } else if (s.oneTimeDate) {
            // include one-off if it falls within this week
            const dt = new Date(s.oneTimeDate);
            const key = toDateOnly(dt);
            if (events[key]) {
                const label = formatOneTimeTime(dt);
                const event: CalendarEvent = {
                    id: s._id,
                    date: key,
                    startTimeLabel: label,
                    title: s.title || s.class?.title || "Class",
                    level: s.class?.level,
                    location: s.location,
                    instructorName: s.instructor?.name,
                };
                events[key].push(event);
            }
        }
    }

    for (const key of Object.keys(events)) {
        events[key].sort((a, b) => (a.startTimeLabel || '').localeCompare(b.startTimeLabel || ''));
    }

    return { weekStartISO, events };
}


