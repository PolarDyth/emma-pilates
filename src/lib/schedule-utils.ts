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

function getStartOfWeekDate(date: Date): Date {
    const d = new Date(date);
    const day = d.getUTCDay(); // 0=Sun .. 6=Sat
    const mondayOffset = (day + 6) % 7;
    d.setUTCDate(d.getUTCDate() - mondayOffset);
    return d;
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

/**
 * Check if a recurring event should show on a specific target date
 * based on its recurrence pattern
 */
function shouldShowRecurringEvent(schedule: ScheduleDocument, targetDate: Date): boolean {
    const rawPattern = schedule.recurrencePattern || 'weekly';
    const pattern = rawPattern.toLowerCase().replace('-', '');
    
    // Parse start date if available
    let startDate: Date | null = null;
    if (schedule.startDate) {
        const [y, m, d] = schedule.startDate.split("-").map(Number);
        startDate = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
    }
    
    switch (pattern) {
        case 'daily':
        case 'weekly':
            // Show on selected days every week
            return true;
        
        case 'biweekly': {
            // Show on selected days every 2 weeks from start date
            if (!startDate) return true; // No start date = show every week
            
            const startWeekStart = getStartOfWeekDate(startDate);
            const targetWeekStart = getStartOfWeekDate(targetDate);
            const weeksDiff = Math.round(
                (targetWeekStart.getTime() - startWeekStart.getTime()) / (7 * 24 * 60 * 60 * 1000)
            );
            
            // Show on even weeks (0, 2, 4, 6...)
            return weeksDiff >= 0 && weeksDiff % 2 === 0;
        }
        
        case 'monthly': {
            // Show on the Nth week of every month
            // Use Thursday of the target's calendar week to determine which month the week "belongs" to
            // This prevents splits when weeks span two months
            if (!startDate) {
                return true;
            }
            
            // Get Thursday of the target date's week (to determine which month this week belongs to)
            const getThursdayOfWeek = (date: Date): Date => {
                const d = new Date(date);
                const dayOfWeek = d.getUTCDay(); // 0=Sun, 1=Mon, ..., 4=Thu, 5=Fri, 6=Sat
                // Calculate offset to Thursday (positive = forward, negative = backward)
                let offset = 4 - dayOfWeek;
                if (dayOfWeek === 0) offset = -3; // Sunday -> go back 3 days to Thursday
                d.setUTCDate(d.getUTCDate() + offset);
                return d;
            };
            
            // Get which week of the month (1-5) based on Thursday's position
            const getWeekOfMonth = (date: Date): { month: number; week: number } => {
                const thursday = getThursdayOfWeek(date);
                const month = thursday.getUTCMonth();
                const dayOfMonth = thursday.getUTCDate();
                const week = Math.ceil(dayOfMonth / 7);
                return { month, week };
            };
            
            const startInfo = getWeekOfMonth(startDate);
            const targetInfo = getWeekOfMonth(targetDate);
            
            // Show if the target's week number matches the start's week number
            // (regardless of which month - we just care about the week number)
            return startInfo.week === targetInfo.week;
        }
        
        default:
            return true;
    }
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
                
                // Check date bounds
                if (s.startDate && key < s.startDate) continue;
                if (s.endDate && key > s.endDate) continue;
                
                // Check recurrence pattern (daily, weekly, biweekly, monthly)
                if (!shouldShowRecurringEvent(s, dt)) continue;
                
                // Check for exceptions (cancelled dates)
                const isException = s.exceptions?.some(ex => ex.date === key);
                if (isException) continue;
                
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


