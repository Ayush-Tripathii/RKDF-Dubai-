/**
 * Partner organisations and student testimonials.
 * ALL FICTIONAL — REPLACE BEFORE LAUNCH. Never substitute a real company name
 * without a signed agreement.
 */
import type { PortraitKey } from './media';

export const partners = [
  'Meridian Gulf Logistics', 'Nakhla Capital', 'Orbit Health Group', 'Falcon Systems',
  'Deira TechWorks', 'Zahra Energy', 'Khaleej Build', 'Arcadia Retail Group',
  'Jumeirah Analytics', 'Sahab Cloud', 'Nawras Legal', 'Emirates Design Collective',
];

export interface Testimonial { quote: string; name: string; programme: string; country: string; year: string; portrait: PortraitKey; }

export const testimonials: Testimonial[] = [
  { quote: 'I came for the Dubai placement year and stayed for the people who taught me.', name: 'Yusuf Rahman', programme: 'BSc Computer Science (AI)', country: 'Pakistan', year: 'Class of 2031', portrait: 'yusuf' },
  { quote: 'Thirty students in my cohort. The dean knows my name. That was the whole point.', name: 'Lina Haddad', programme: 'MBA Executive', country: 'Jordan', year: 'Class of 2028', portrait: 'lina' },
  { quote: 'The semester in Bhopal changed how I think about engineering for real constraints.', name: 'Chidi Okonkwo', programme: 'BEng Civil Engineering', country: 'Nigeria', year: 'Class of 2031', portrait: 'chidi' },
  { quote: 'Every fee on one page, in dirhams, before I applied. No surprises afterwards.', name: 'Ananya Pillai', programme: 'BBA Business Administration', country: 'India', year: 'Class of 2030', portrait: 'ananya' },
];

export const downloads = [
  { title: 'Prospectus 2027', file: '/downloads/rkdf-dubai-prospectus-2027.pdf', size: 'PDF', group: 'Prospectus' },
  { title: 'Programme fee schedule 2027/28', file: '/downloads/rkdf-dubai-fee-schedule-2027.pdf', size: 'PDF', group: 'Admissions' },
  { title: 'Application document checklist', file: '/downloads/rkdf-dubai-document-checklist.pdf', size: 'PDF', group: 'Admissions' },
  { title: 'Scholarship application form', file: '/downloads/rkdf-dubai-scholarship-form.pdf', size: 'PDF', group: 'Admissions' },
  { title: 'Academic regulations (summary)', file: '/downloads/rkdf-dubai-academic-regulations.pdf', size: 'PDF', group: 'Policies' },
  { title: 'Refund and withdrawal policy', file: '/downloads/rkdf-dubai-refund-policy.pdf', size: 'PDF', group: 'Policies' },
  { title: 'Student code of conduct', file: '/downloads/rkdf-dubai-code-of-conduct.pdf', size: 'PDF', group: 'Policies' },
  { title: 'Complaints and appeals procedure', file: '/downloads/rkdf-dubai-complaints-procedure.pdf', size: 'PDF', group: 'Policies' },
];
