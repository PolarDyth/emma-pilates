export type RecurrencePattern = 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'custom';

export interface ScheduleException {
	date: string;
	reason?: string;
}

export interface ScheduleDocument {
	_id: string;
	title?: string;
	isRecurring: boolean;
	oneTimeDate?: string; // ISO datetime
	startDate?: string;   // ISO date
	endDate?: string;     // ISO date
	recurrencePattern?: RecurrencePattern;
	daysOfWeek?: string[]; // monday..sunday
	time?: string; // "09:00" or "6:30 PM"
	customInterval?: number;
	customIntervalUnit?: 'days' | 'weeks' | 'months';
	location?: string;
	specialPrice?: number;
	maxParticipants?: number;
	notes?: string;
	exceptions?: ScheduleException[];
	class?: {
		_id: string;
		title?: string;
		level?: 'beginner' | 'intermediate' | 'advanced' | 'all-levels' | string;
	};
	instructor?: {
		name?: string;
		image?: { asset?: { url?: string } };
	};
}

export interface WeeklyScheduleItem {
	id: string;
	weekday: string; // monday..sunday
	startTimeLabel: string; // formatted time
	classTitle: string;
	levelLabel?: string;
	location?: string;
	instructorName?: string;
	spotsAvailable?: number;
}

export interface CalendarEvent {
	id: string;
	date: string; // YYYY-MM-DD
	startTimeLabel: string;
	title: string;
	level?: string;
	location?: string;
	instructorName?: string;
}

export type EventsByDate = Record<string, CalendarEvent[]>;

