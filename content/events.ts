/** Events. ALL INVENTED — REPLACE BEFORE LAUNCH. Past events are hidden automatically. */

export interface EventItem {
  slug: string;
  date: string; // ISO
  start: string; // HH:MM GST
  end: string;
  title: string;
  format: 'On campus' | 'Online';
  location: string;
  description: string;
}

export const events: EventItem[] = [
  {
    slug: 'online-information-session-december-2026',
    date: '2026-12-03', start: '18:00', end: '19:30',
    title: 'Online Information Session',
    format: 'Online',
    location: 'Online — joining link sent on registration',
    description: 'An introduction to the university, its programmes and the admissions process, followed by questions to the admissions team.',
  },
  {
    slug: 'open-day-december-2026',
    date: '2026-12-12', start: '10:00', end: '15:00',
    title: 'Open Day',
    format: 'On campus',
    location: 'Block 11, Dubai International Academic City',
    description: 'Tour the campus and laboratories, meet academic staff from all seven schools, and speak to admissions, scholarships and visa advisers.',
  },
  {
    slug: 'open-day-january-2027',
    date: '2027-01-17', start: '10:00', end: '15:00',
    title: 'Open Day',
    format: 'On campus',
    location: 'Block 11, Dubai International Academic City',
    description: 'Our first Open Day with students on campus. Attend sample lectures and meet the founding cohort.',
  },
];

/** Events on or after the reference date (defaults to today). */
export const upcomingEvents = (ref: Date = new Date()) => {
  const today = ref.toISOString().slice(0, 10);
  return events.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
};
