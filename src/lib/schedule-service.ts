import { client } from "@/sanity/client";
import { allSchedulesQuery } from "@/sanity/queries";
import type { ScheduleDocument, WeeklyScheduleItem, EventsByDate, CalendarEvent } from "@/lib/types/Schedule";

const weekdayOrder: string[] = [
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
	"sunday",
];

function formatTimeLabel(time: string | undefined): string {
	if (!time) return "";
	return time;
}

export async function getSchedules(): Promise<ScheduleDocument[]> {
	try {
        const schedules: ScheduleDocument[] = await client.fetch(
            allSchedulesQuery,
            {},
            { cache: 'force-cache', next: { tags: ['schedule'] } }
        );
		return schedules;
	} catch (error) {
		console.error("Error fetching schedules:", error);
		return [];
	}
}

export async function getWeeklyTimetable(): Promise<Record<string, WeeklyScheduleItem[]>> {
	const schedules = await getSchedules();
	const grouped: Record<string, WeeklyScheduleItem[]> = Object.create(null);

	for (const weekday of weekdayOrder) {
		grouped[weekday] = [];
	}

	for (const s of schedules) {
		if (s.isRecurring && Array.isArray(s.daysOfWeek)) {
			for (const day of s.daysOfWeek) {
				const item: WeeklyScheduleItem = {
					id: s._id,
					weekday: day,
					startTimeLabel: formatTimeLabel(s.time),
					classTitle: s.title || s.class?.title || "Class",
					location: s.location,
					instructorName: s.instructor?.name,
				};
				grouped[day] = grouped[day] || [];
				grouped[day].push(item);
			}
		}
		// One-time events could be mapped to their actual date; for now we skip in weekly view
	}

	// Sort each day by start time if provided (simple lexicographic works for HH:mm)
	for (const day of Object.keys(grouped)) {
		grouped[day].sort((a, b) => (a.startTimeLabel || "").localeCompare(b.startTimeLabel || ""));
	}

	return grouped;
}

function toDateOnly(date: Date): string {
	return date.toISOString().slice(0, 10);
}

function addDays(base: Date, days: number): Date {
	const d = new Date(base);
	d.setDate(d.getDate() + days);
	return d;
}

function getStartOfWeek(date: Date): Date {
	const day = date.getDay(); // 0=Sun .. 6=Sat
	const mondayOffset = (day + 6) % 7; // convert to 0=Mon
	return addDays(new Date(date.getFullYear(), date.getMonth(), date.getDate()), -mondayOffset);
}

const dayToIndex: Record<string, number> = {
	"monday": 0,
	"tuesday": 1,
	"wednesday": 2,
	"thursday": 3,
	"friday": 4,
	"saturday": 5,
	"sunday": 6,
};

function shouldShowRecurringEvent(schedule: ScheduleDocument, targetDate: Date): boolean {
	const rawPattern = schedule.recurrencePattern || 'weekly';
	const pattern = rawPattern.toLowerCase().replace('-', '');
	const startDate = schedule.startDate ? new Date(schedule.startDate) : null;
	
	// If no start date set, default to today
	const effectiveStartDate = startDate || new Date();

	// Calculate weeks since start date
	const startWeekStart = getStartOfWeek(effectiveStartDate);
	const targetWeekStart = getStartOfWeek(targetDate);
	const weeksDiff = Math.round((targetWeekStart.getTime() - startWeekStart.getTime()) / (7 * 24 * 60 * 60 * 1000));
	
	switch (pattern) {
		case 'daily':
		case 'weekly':
			return true;
		
		case 'biweekly':
			return weeksDiff >= 0 && weeksDiff % 2 === 0;
		
		case 'monthly':
			const startDayOfMonth = effectiveStartDate.getDate();
			const targetDayOfMonth = targetDate.getDate();
			const startWeekOfMonth = Math.ceil(startDayOfMonth / 7);
			const targetWeekOfMonth = Math.ceil(targetDayOfMonth / 7);
			return startWeekOfMonth === targetWeekOfMonth;
		
		default:
			return true;
	}
}

export async function getCalendarWeek(weekAnchorISO: string): Promise<{ weekStartISO: string; events: EventsByDate }> {
	const schedules = await getSchedules();
	const anchor = new Date(weekAnchorISO);
	const weekStart = getStartOfWeek(anchor);
	const dates: Date[] = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
	const events: EventsByDate = {};

	for (const d of dates) {
		events[toDateOnly(d)] = [];
	}

	for (const s of schedules) {
		if (s.isRecurring) {
			if (!s.daysOfWeek || !s.time) continue;
			
			// Check if event lands within this week
			for (const day of s.daysOfWeek) {
				const idx = dayToIndex[day];
				if (idx === undefined) continue;
				const date = addDays(weekStart, idx);
				
				// Respect startDate/endDate bounds
				if (s.startDate && toDateOnly(date) < s.startDate) continue;
				if (s.endDate && toDateOnly(date) > s.endDate) continue;
				
				// Check if this occurrence should be shown based on recurrence pattern
				if (!shouldShowRecurringEvent(s, date)) continue;
				
				// Check for exceptions (cancelled dates)
				const dateStr = toDateOnly(date);
				const isException = s.exceptions?.some(ex => ex.date === dateStr);
				if (isException) continue;
				
                const event: CalendarEvent = {
					id: `${s._id}-${dateStr}`,
					date: dateStr,
					startTimeLabel: s.time,
					title: s.title || s.class?.title || "Class",
                    level: s.class?.level,
					location: s.location,
					instructorName: s.instructor?.name,
				};
				events[event.date].push(event);
			}
		} else if (s.oneTimeDate) {
			const dt = new Date(s.oneTimeDate);
			const key = toDateOnly(dt);
			if (events[key]) {
				const time = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const event: CalendarEvent = {
					id: s._id,
					date: key,
					startTimeLabel: time,
					title: s.title || s.class?.title || "Class",
                    level: s.class?.level,
					location: s.location,
					instructorName: s.instructor?.name,
				};
				events[key].push(event);
			}
		}
	}

	// Sort events by time label
	for (const key of Object.keys(events)) {
		events[key].sort((a, b) => (a.startTimeLabel || '').localeCompare(b.startTimeLabel || ''));
	}

	return { weekStartISO: toDateOnly(weekStart), events };
}


