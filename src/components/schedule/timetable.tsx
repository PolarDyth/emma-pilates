"use client";
import { Button } from "@/components/ui/button";
import type { EventsByDate } from "@/lib/types/Schedule";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

const START_HOUR = 7; // 7 AM
const END_HOUR = 21;  // 9 PM
const HOUR_HEIGHT = 64; // px visual height per hour

function monthLabel(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', month: 'long', year: 'numeric' }).format(date);
}

function dayHeader(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', weekday: 'long' }).format(date);
}

function daySub(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'short' }).format(date);
}

function toISO(date: Date): string {
    return date.toISOString().slice(0, 10);
}

function isoToUTCDate(iso: string): Date {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(Date.UTC(y, (m || 1) - 1, d || 1));
}

function parseTimeLabel(label?: string): { minutesFromStart: number } | null {
    if (!label) return null;
    const trimmed = label.trim();
    // Support "09:00", "9:00", "6:30 PM"
    const ampmMatch = trimmed.match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
    const twentyFourMatch = trimmed.match(/^(\d{1,2}):(\d{2})$/);
    let hours = 0; let minutes = 0;
    if (ampmMatch) {
        hours = parseInt(ampmMatch[1], 10) % 12;
        minutes = parseInt(ampmMatch[2], 10);
        const isPM = ampmMatch[3].toUpperCase() === 'PM';
        if (isPM) hours += 12;
    } else if (twentyFourMatch) {
        hours = parseInt(twentyFourMatch[1], 10);
        minutes = parseInt(twentyFourMatch[2], 10);
    } else {
        return null;
    }
    const totalMinutes = hours * 60 + minutes;
    const startMinutes = START_HOUR * 60;
    return { minutesFromStart: Math.max(0, totalMinutes - startMinutes) };
}

function normalizeLevel(level?: string): string | undefined {
    if (!level) return undefined;
    const l = level.toLowerCase();
    if (/(beginner|level\s*1)/.test(l)) return 'beginner';
    if (/(intermediate|level\s*2)/.test(l)) return 'intermediate';
    if (/(advanced|level\s*3)/.test(l)) return 'advanced';
    if (/(all\s*levels|open|mixed)/.test(l)) return 'all-levels';
    return l;
}

function eventColor(title: string, level?: string): string {
    const t = title.toLowerCase();
    const isBeginner = /(beginner|basics|foundation|fundamentals|gentle|level\s*1\b)/.test(t);
    const isIntermediate = /(intermediate|mid[-\s]*level|level\s*2\b|workshop)/.test(t);
    const isAdvanced = /(advanced|power|challenge|practice|level\s*3\b)/.test(t);
    const isAllLevels = /(all\s*levels|all-levels|open\s*level|mixed|mixed\s*ability|all\s*abilities|flow(?!er))/i.test(t);

    const lv = normalizeLevel(level);

    if (lv === 'beginner' || isBeginner) return 'bg-green-50 border-green-200';
    if (lv === 'intermediate' || isIntermediate) return 'bg-blue-50 border-blue-200';
    if (lv === 'advanced' || isAdvanced) return 'bg-purple-50 border-purple-200';
    if (lv === 'all-levels' || isAllLevels) return 'bg-teal-50 border-teal-200';
    return 'bg-gray-50 border-gray-200';
}

export function CalendarWeek({
    weekStartISO,
    events,
    onPrev,
    onNext,
    viewMode = "weekly",
    onSetViewMode,
    selectedDayIndex = 0,
    onSelectDayIndex,
    hideViewToggle = false,
    hideTitle = false,
    hideFilter = false,
    titleAsH1 = false,
}: {
    weekStartISO: string;
    events: EventsByDate;
    onPrev: () => void;
    onNext: () => void;
    viewMode?: "weekly" | "daily";
    onSetViewMode?: (mode: "weekly" | "daily") => void;
    selectedDayIndex?: number;
    onSelectDayIndex?: (index: number) => void;
    hideViewToggle?: boolean;
    hideTitle?: boolean;
    hideFilter?: boolean;
    titleAsH1?: boolean;
}) {
    const weekStart = isoToUTCDate(weekStartISO);
    const days = Array.from({ length: 7 }, (_, i) => {
        const dt = new Date(weekStart);
        dt.setUTCDate(dt.getUTCDate() + i);
        return dt;
    });
    const containerHeight = (END_HOUR - START_HOUR) * HOUR_HEIGHT;

    const hours: string[] = [];
    for (let h = START_HOUR; h <= END_HOUR; h++) {
        hours.push(`${String(h).padStart(2, '0')}:00`);
    }

    const TitleTag = titleAsH1 ? 'h1' : 'h2';

    return (
        <section id="timetable" className="py-16 md:py-24">
            <div className="space-y-6">
                <div className={`flex items-center ${hideTitle ? 'justify-end' : 'justify-between'}`}>
                    {!hideTitle && (
                        <div className="space-y-1">
                            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Schedule</div>
                            <TitleTag className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">Class Timetable</TitleTag>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={onPrev} aria-label="Previous week">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={onNext} aria-label="Next week">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        {!hideFilter && (
                            <Button variant="outline" className="ml-2">
                                <SlidersHorizontal className="h-4 w-4 mr-2" /> Filter Classes
                            </Button>
                        )}
                    </div>
                </div>

                <div className="bg-card text-card-foreground rounded-xl border shadow-sm overflow-hidden">
                    <div className="px-4 py-3 flex items-center justify-between border-b">
                        <div className="text-lg font-semibold">{monthLabel(weekStart)}</div>
                        {!hideViewToggle && (
                            <div className="flex gap-2 text-sm">
                                <Button variant={viewMode === 'weekly' ? "default" : "outline"} onClick={() => onSetViewMode && onSetViewMode('weekly')}>Weekly View</Button>
                                <Button variant={viewMode === 'daily' ? "default" : "outline"} onClick={() => onSetViewMode && onSetViewMode('daily')}>Daily View</Button>
                            </div>
                        )}
                    </div>
                    {viewMode === 'daily' && (
                        <div className="px-4 py-2 border-b overflow-x-auto">
                            <div className="flex gap-2 min-w-max">
                                {days.map((d, idx) => (
                                    <button
                                        key={toISO(d)}
                                        onClick={() => onSelectDayIndex && onSelectDayIndex(idx)}
                                        className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                                            idx === selectedDayIndex
                                                ? 'bg-primary text-primary-foreground border-primary'
                                                : 'bg-muted/40 text-foreground hover:bg-muted/60 border-border'
                                        }`}
                                    >
                                        {new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', weekday: 'short' }).format(d)} {new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', day: '2-digit' }).format(d)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {viewMode === 'weekly' ? (
                        <div className="overflow-x-auto">
                            <div className="grid min-w-[900px]" style={{ gridTemplateColumns: '80px repeat(7, 1fr)' }}>
                        {/* Day headers */}
                                <div className="border-b bg-muted/50 p-3 text-sm text-muted-foreground">&nbsp;</div>
                                {days.map((d, idx) => (
                                    <div
                                        key={toISO(d)}
                                        className="border-b bg-muted/50 p-3 cursor-pointer hover:bg-muted/70"
                                        onClick={() => {
                                            if (onSetViewMode) onSetViewMode('daily');
                                            if (onSelectDayIndex) onSelectDayIndex(idx);
                                        }}
                                    >
                                        <div className="text-sm text-muted-foreground">{dayHeader(d)}</div>
                                        <div className="text-base font-medium">{daySub(d)}</div>
                                    </div>
                                ))}

                        {/* Time column */}
                                <div className="border-r">
                                    {hours.map((h, idx) => (
                                        <div key={idx} className="h-16 px-3 text-xs text-muted-foreground flex items-start justify-end pr-4">
                                            <span className="translate-y-[-0.5rem]">{h}</span>
                                        </div>
                                    ))}
                                </div>

                        {/* Day columns */}
                                {days.map((d) => {
                                    const key = toISO(d);
                                    const dayEvents = events[key] || [];
                                    return (
                                        <div key={key} className="relative border-l" style={{ height: `${containerHeight}px` }}>
                                            {/* hour lines */}
                                            {Array.from({ length: (END_HOUR - START_HOUR) + 1 }, (_, i) => (
                                                <div key={i} className="absolute left-0 right-0 border-t border-muted/40" style={{ top: `${i * HOUR_HEIGHT}px` }} />
                                            ))}

                                            {/* events */}
                                            {dayEvents.map((ev) => {
                                                const parsed = parseTimeLabel(ev.startTimeLabel);
                                                const top = parsed ? (parsed.minutesFromStart / 60) * HOUR_HEIGHT : 0;
                                                const height = HOUR_HEIGHT; // default 1 hour
                                                return (
                                                    <div
                                                        key={ev.id}
                                                        className={`absolute left-1 right-1 p-2 rounded-md border text-sm ${eventColor(ev.title, ev.level)} shadow-sm`}
                                                        style={{ top: `${top}px`, height: `${height}px` }}
                                                    >
                                                        <div className="font-medium truncate">{ev.title}</div>
                                                        <div className="text-xs text-muted-foreground">{ev.startTimeLabel || 'Time TBA'}{ev.location ? ` • ${ev.location}` : ''}</div>
                                                        {ev.instructorName && (
                                                            <div className="text-xs text-muted-foreground">Instructor: {ev.instructorName}</div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 space-y-4">
                            <div className="text-center text-xl font-semibold mb-2">{dayHeader(days[selectedDayIndex])}</div>
                            {(events[toISO(days[selectedDayIndex])] || []).length === 0 ? (
                                <div className="text-sm text-muted-foreground text-center">No classes scheduled.</div>
                            ) : (
                                (events[toISO(days[selectedDayIndex])] || []).map(ev => (
                                    <div key={ev.id} className={`rounded-lg border ${eventColor(ev.title, ev.level)} p-4`}> 
                                        <div className="flex items-center justify-between gap-2">
                                            <div>
                                                <div className="text-xs font-medium text-muted-foreground">{ev.level ? ev.level.charAt(0).toUpperCase() + ev.level.slice(1) : ''}</div>
                                                <div className="text-base font-semibold text-foreground">{ev.title}</div>
                                            </div>
                                            <div className="text-sm text-muted-foreground">{ev.startTimeLabel || 'Time TBA'}</div>
                                        </div>
                                        <div className="mt-1 text-xs text-muted-foreground flex flex-wrap gap-3">
                                            {ev.instructorName && <span>Instructor: {ev.instructorName}</span>}
                                            {ev.location && <span>Location: {ev.location}</span>}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}


