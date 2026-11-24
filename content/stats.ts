/**
 * Statistics. Dubai figures are INVENTED projections — REPLACE BEFORE LAUNCH.
 * `value` is the number rendered in server HTML; `display` formats it.
 */
import { totalProgrammes, schools } from './schools';

export interface Stat { value: number; prefix?: string; suffix?: string; label: string; labelAr: string; }

export const glance: Stat[] = [
  { value: totalProgrammes, label: 'Programmes', labelAr: 'برنامجًا' },
  { value: schools.length, label: 'Schools', labelAr: 'كليات' },
  { value: 2400, label: 'Student capacity', labelAr: 'طاقة استيعابية' },
  { value: 180, label: 'Academic staff', labelAr: 'عضو هيئة تدريس' },
  { value: 46, label: 'Nationalities', labelAr: 'جنسية' },
  { value: 94, suffix: '%', label: 'Graduate outcomes', labelAr: 'نتائج الخريجين' },
];

export const research: Stat[] = [
  { value: 22, label: 'Laboratories', labelAr: 'مختبرًا' },
  { value: 9, label: 'Funded projects', labelAr: 'مشاريع ممولة' },
  { value: 4, label: 'Research centres', labelAr: 'مراكز بحثية' },
  { value: 6, label: 'Patents filed', labelAr: 'براءات اختراع مقدمة' },
];

export const outcomes: Stat[] = [
  { value: 94, suffix: '%', label: 'In work or further study within six months', labelAr: 'في العمل أو الدراسة خلال ستة أشهر' },
  { value: 11500, prefix: 'AED ', label: 'Median monthly starting salary', labelAr: 'متوسط الراتب الأولي (شهريًا)' },
  { value: 68, suffix: '%', label: 'Retained by their placement host', labelAr: 'استبقتهم جهة التدريب' },
  { value: 310, label: 'Partner organisations', labelAr: 'جهة شريكة' },
];

export const facts = {
  societies: 31,
  laboratories: 22,
  doctoratePct: 61,
  industryPct: 44,
  sportsFacilities: 4,
};

export const formatStat = (s: Stat, n = s.value) => `${s.prefix ?? ''}${Math.round(n).toLocaleString('en-US')}${s.suffix ?? ''}`;
