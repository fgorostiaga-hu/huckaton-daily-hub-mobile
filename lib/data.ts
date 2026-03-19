import { CalendarEvent, Task, Person, AbsentPerson, Shift } from './types';

// Current user
export const currentUser: Person = {
  id: 'santiago',
  name: 'Santiago Passerini',
  role: 'Ingeniero de Software',
  avatar: 'SP',
};

// People - expanded for a real company feel
export const people: Record<string, Person> = {
  valentina: { id: 'valentina', name: 'Valentina Rios', role: 'Team Lead', avatar: 'VR' },
  carlos: { id: 'carlos', name: 'Carlos López', role: 'Product Manager', avatar: 'CL' },
  sofia: { id: 'sofia', name: 'Sofia Herrera', role: 'Designer', avatar: 'SH' },
  martin: { id: 'martin', name: 'Martin Sosa', role: 'Engineering Manager', avatar: 'MS' },
  luis: { id: 'luis', name: 'Luis Fernandez', role: 'Backend Developer', avatar: 'LF' },
  ana: { id: 'ana', name: 'Ana Morales', role: 'QA Engineer', avatar: 'AM' },
  pedro: { id: 'pedro', name: 'Pedro Ibáñez', role: 'DevOps', avatar: 'PI' },
  camila: { id: 'camila', name: 'Camila Torres', role: 'Frontend Developer', avatar: 'CT' },
  maria: { id: 'maria', name: 'Maria Garcia', role: 'HR Specialist', avatar: 'MG' },
  juan: { id: 'juan', name: 'Juan Perez', role: 'Senior Developer', avatar: 'JP' },
  lara: { id: 'lara', name: 'Lara Rodríguez', role: 'Data Analyst', avatar: 'LR' },
  roberto: { id: 'roberto', name: 'Roberto Méndez', role: 'Architect', avatar: 'RM' },
  diego: { id: 'diego', name: 'Diego Suárez', role: 'Mobile Developer', avatar: 'DS' },
  elena: { id: 'elena', name: 'Elena Martinez', role: 'Scrum Master', avatar: 'EM' },
  pablo: { id: 'pablo', name: 'Pablo Gimenez', role: 'Tech Lead', avatar: 'PG' },
  lucia: { id: 'lucia', name: 'Lucia Romero', role: 'UX Researcher', avatar: 'LU' },
  fernando: { id: 'fernando', name: 'Fernando Castro', role: 'Backend Developer', avatar: 'FC' },
  rrhh: { id: 'rrhh', name: 'RRHH', role: 'Recursos Humanos', avatar: 'RH' },
  humand: { id: 'humand', name: 'Humand', role: 'Sistema', avatar: 'HU' },
  bienestar: { id: 'bienestar', name: 'Bienestar', role: 'Equipo de Bienestar', avatar: 'BI' },
  sustentabilidad: { id: 'sustentabilidad', name: 'Sustentabilidad', role: 'Equipo de Sustentabilidad', avatar: 'SU' },
};

// Helper to create dates
const date = (month: number, day: number, year = 2026) => new Date(year, month - 1, day);

// ========================================
// MASSIVE MOCK DATA - March & April 2026
// Simulating a real company like Rapanui
// Each workday has 5-8 events
// ========================================

export const events: CalendarEvent[] = [
  // ============ MARCH 2026 ============
  
  // Week 1: March 2-6
  // March 2 (Monday)
  { id: 'm2-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(3, 2), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  
  { id: 'm2-2', title: 'Capacitación Comunicación Efectiva', category: 'training', startDate: date(3, 2), endDate: date(3, 6), isAllDay: true },
  { id: 'm2-3', title: 'Sprint Planning Q1', category: 'videocall', startDate: date(3, 2), isAllDay: false, startTime: '10:00', endTime: '11:30', organizer: people.carlos },
  { id: 'm2-4', title: 'Sync con Producto', category: 'videocall', startDate: date(3, 2), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.carlos },
  { id: 'm2-5', title: 'Code Review Session', category: 'videocall', startDate: date(3, 2), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.roberto },
  
  // March 3 (Tuesday)
  { id: 'm3-1', title: 'Cumpleaños Maria Garcia', category: 'birthday', startDate: date(3, 3), isAllDay: true, person: people.maria },
  { id: 'm3-2', title: 'Daily Standup', category: 'videocall', startDate: date(3, 3), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'm3-3', title: '1:1 con Martin', category: 'videocall', startDate: date(3, 3), isAllDay: false, startTime: '10:00', endTime: '10:30', organizer: people.martin },
  { id: 'm3-4', title: 'Tech Debt Review', category: 'videocall', startDate: date(3, 3), isAllDay: false, startTime: '11:00', endTime: '12:00', organizer: people.pablo },
  { id: 'm3-5', title: 'Design Sync', category: 'videocall', startDate: date(3, 3), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.sofia },
  { id: 'm3-6', title: 'API Integration Review', category: 'videocall', startDate: date(3, 3), isAllDay: false, startTime: '16:30', endTime: '17:00', organizer: people.fernando },
  
  // March 4 (Wednesday)
  { id: 'm4-1', title: 'Daily Standup', category: 'videocall', startDate: date(3, 4), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'm4-2', title: '1:1 con Valentina', category: 'videocall', startDate: date(3, 4), isAllDay: false, startTime: '11:00', endTime: '11:30', organizer: people.valentina },
  { id: 'm4-3', title: 'Grooming Session', category: 'videocall', startDate: date(3, 4), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.carlos },
  { id: 'm4-4', title: 'Security Review', category: 'videocall', startDate: date(3, 4), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.pedro },
  { id: 'm4-5', title: 'UX Research Findings', category: 'videocall', startDate: date(3, 4), isAllDay: false, startTime: '17:00', endTime: '17:30', organizer: people.lucia },
  
  // March 5 (Thursday)
  { id: 'm5-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(3, 5), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  
  { id: 'm5-2', title: 'Evaluación de desempeño — ABRE', category: 'performance', startDate: date(3, 5), isAllDay: true },
  { id: 'm5-3', title: 'Architecture Discussion', category: 'videocall', startDate: date(3, 5), isAllDay: false, startTime: '10:30', endTime: '11:30', organizer: people.roberto },
  { id: 'm5-4', title: 'QA Sync', category: 'videocall', startDate: date(3, 5), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.ana },
  { id: 'm5-5', title: 'Mobile Team Sync', category: 'videocall', startDate: date(3, 5), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.diego },
  { id: 'm5-6', title: 'Demo Prep', category: 'videocall', startDate: date(3, 5), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.valentina },
  
  // March 6 (Friday)
  { id: 'm6-1', title: 'Daily Standup', category: 'videocall', startDate: date(3, 6), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'm6-2', title: 'Demo Friday', category: 'videocall', startDate: date(3, 6), isAllDay: false, startTime: '17:00', endTime: '18:00', organizer: people.valentina },
  { id: 'm6-3', title: 'Team Retrospective', category: 'videocall', startDate: date(3, 6), isAllDay: false, startTime: '15:00', endTime: '16:00', organizer: people.elena },
  { id: 'm6-4', title: 'Happy Hour Virtual', category: 'company-event', startDate: date(3, 6), isAllDay: false, startTime: '18:00', endTime: '19:00' },
  
  // March 7 (Saturday) - Company Event
  { id: 'm7-1', title: 'Team Building: Escape Room', category: 'company-event', startDate: date(3, 7), isAllDay: true },
  
  // Week 2: March 9-13
  // March 9 (Monday)
  { id: 'm9-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(3, 9), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  
  { id: 'm9-2', title: 'Sprint Planning', category: 'videocall', startDate: date(3, 9), isAllDay: false, startTime: '10:00', endTime: '11:30', organizer: people.carlos },
  { id: 'm9-3', title: '1:1 con Roberto', category: 'videocall', startDate: date(3, 9), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.roberto },
  { id: 'm9-4', title: 'Backend Sync', category: 'videocall', startDate: date(3, 9), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.luis },
  { id: 'm9-5', title: 'Code Review', category: 'videocall', startDate: date(3, 9), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.juan },
  
  // March 10 (Tuesday)
  { id: 'm10-1', title: 'Daily Standup', category: 'videocall', startDate: date(3, 10), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'm10-2', title: 'Q1 Business Review', category: 'company-event', startDate: date(3, 10), isAllDay: false, startTime: '10:00', endTime: '11:30' },
  { id: 'm10-3', title: 'Luis Fernandez — Vacaciones', category: 'vacation', startDate: date(3, 10), endDate: date(3, 22), isAllDay: true, person: people.luis },
  { id: 'm10-4', title: 'Data Sync', category: 'videocall', startDate: date(3, 10), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.lara },
  { id: 'm10-5', title: 'Frontend Sync', category: 'videocall', startDate: date(3, 10), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.camila },
  { id: 'm10-6', title: 'Security Training', category: 'training', startDate: date(3, 10), isAllDay: false, startTime: '16:00', endTime: '17:00' },
  
  // March 11 (Wednesday)
  { id: 'm11-1', title: 'Daily Standup', category: 'videocall', startDate: date(3, 11), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'm11-2', title: '1:1 con Valentina', category: 'videocall', startDate: date(3, 11), isAllDay: false, startTime: '11:00', endTime: '11:30', organizer: people.valentina },
  { id: 'm11-3', title: 'Grooming Session', category: 'videocall', startDate: date(3, 11), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.carlos },
  { id: 'm11-4', title: 'Design Review', category: 'videocall', startDate: date(3, 11), isAllDay: false, startTime: '15:30', endTime: '16:00', organizer: people.sofia },
  { id: 'm11-5', title: 'DevOps Sync', category: 'videocall', startDate: date(3, 11), isAllDay: false, startTime: '16:30', endTime: '17:00', organizer: people.pedro },
  
  // March 12 (Thursday)
  { id: 'm12-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(3, 12), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  
  { id: 'm12-2', title: 'Architecture Review', category: 'videocall', startDate: date(3, 12), isAllDay: false, startTime: '10:30', endTime: '11:30', organizer: people.roberto },
  { id: 'm12-3', title: 'QA Planning', category: 'videocall', startDate: date(3, 12), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.ana },
  { id: 'm12-4', title: 'Product Demo Prep', category: 'videocall', startDate: date(3, 12), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.carlos },
  { id: 'm12-5', title: 'Team Sync', category: 'videocall', startDate: date(3, 12), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.valentina },
  
  // March 13 (Friday)
  { id: 'm13-1', title: 'Daily Standup', category: 'videocall', startDate: date(3, 13), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'm13-2', title: 'Encuesta de clima — ABRE', category: 'survey', startDate: date(3, 13), isAllDay: true },
  { id: 'm13-3', title: 'Demo Friday', category: 'videocall', startDate: date(3, 13), isAllDay: false, startTime: '17:00', endTime: '18:00', organizer: people.valentina },
  { id: 'm13-4', title: 'Retrospective', category: 'videocall', startDate: date(3, 13), isAllDay: false, startTime: '15:00', endTime: '16:00', organizer: people.elena },
  { id: 'm13-5', title: 'Knowledge Sharing', category: 'videocall', startDate: date(3, 13), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.pablo },
  
  // March 14 (Saturday) - Communication
  { id: 'm14-1', title: 'Cerramos Q1 con record!', category: 'communication', startDate: date(3, 14), isAllDay: true, organizer: currentUser },
  
  // Week 3: March 16-20
  // March 15 (Sunday)
  { id: 'm15-1', title: '3 años en Humand', category: 'anniversary', startDate: date(3, 15), isAllDay: true, person: people.juan, yearsInCompany: 3 },
  { id: 'm15-2', title: 'Ana Morales — Vacaciones', category: 'vacation', startDate: date(3, 15), endDate: date(3, 22), isAllDay: true, person: people.ana },
  
  // March 16 (Monday)
  { id: 'm16-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(3, 16), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  
  { id: 'm16-2', title: 'Sprint Planning', category: 'videocall', startDate: date(3, 16), isAllDay: false, startTime: '10:00', endTime: '11:30', organizer: people.carlos },
  { id: 'm16-3', title: 'Tech Lead Sync', category: 'videocall', startDate: date(3, 16), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.pablo },
  { id: 'm16-4', title: 'Backend Review', category: 'videocall', startDate: date(3, 16), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.fernando },
  { id: 'm16-5', title: 'Code Review', category: 'videocall', startDate: date(3, 16), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.roberto },
  
  // March 17 (Tuesday)
  { id: 'm17-1', title: 'Daily Standup', category: 'videocall', startDate: date(3, 17), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'm17-2', title: 'Cumpleaños Sofia Herrera', category: 'birthday', startDate: date(3, 17), isAllDay: true, person: people.sofia },
  { id: 'm17-3', title: 'Camila Torres — Vacaciones', category: 'vacation', startDate: date(3, 17), endDate: date(3, 21), isAllDay: true, person: people.camila },
  { id: 'm17-4', title: '1:1 con Martin', category: 'videocall', startDate: date(3, 17), isAllDay: false, startTime: '10:00', endTime: '10:30', organizer: people.martin },
  { id: 'm17-5', title: 'Product Sync', category: 'videocall', startDate: date(3, 17), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.carlos },
  { id: 'm17-6', title: 'Design Sync', category: 'videocall', startDate: date(3, 17), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.sofia },
  
  // March 18 (Wednesday)
  { id: 'm18-1', title: 'Daily Standup', category: 'videocall', startDate: date(3, 18), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'm18-2', title: 'Pedro Ibáñez — Licencia médica', category: 'medical-leave', startDate: date(3, 18), endDate: date(3, 25), isAllDay: true, person: people.pedro },
  { id: 'm18-3', title: '1:1 con Valentina', category: 'videocall', startDate: date(3, 18), isAllDay: false, startTime: '11:00', endTime: '11:30', organizer: people.valentina },
  { id: 'm18-4', title: 'Grooming Session', category: 'videocall', startDate: date(3, 18), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.carlos },
  { id: 'm18-5', title: 'UX Review', category: 'videocall', startDate: date(3, 18), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.lucia },
  
  // ============ TODAY - March 19 (Thursday) ============
  // 2 birthdays + 1 anniversary TODAY
  { id: 't-bd1', title: 'Cumpleaños Lara Rodríguez', category: 'birthday', startDate: date(3, 19), isAllDay: true, person: people.lara },
  { id: 't-bd2', title: 'Cumpleaños Fernando Castro', category: 'birthday', startDate: date(3, 19), isAllDay: true, person: people.fernando },
  { id: 't-aniv', title: '2 años en Humand', category: 'anniversary', startDate: date(3, 19), isAllDay: true, person: people.elena, yearsInCompany: 2 },
  
  // Videocalls today
  { id: 't-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(3, 19), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  { id: 't-2', title: '1:1 con Valentina Rios', category: 'videocall', startDate: date(3, 19), isAllDay: false, startTime: '11:00', endTime: '11:30', organizer: people.valentina },
  { id: 't-3', title: 'Sprint Planning', category: 'videocall', startDate: date(3, 19), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.carlos },
  { id: 't-4', title: 'Architecture Review', category: 'videocall', startDate: date(3, 19), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.roberto },
  
  // Survey today
  { id: 't-5', title: 'Encuesta de clima — CIERRA', category: 'survey', startDate: date(3, 19), isAllDay: true },
  
  // Onboarding tasks today
  { id: 't-6', title: 'Meet Your Buddy', category: 'onboarding', startDate: date(3, 19), isAllDay: true },
  { id: 't-7', title: 'Firma de declaracion jurada de domicilio', category: 'onboarding', startDate: date(3, 19), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.valentina },
  { id: 't-8', title: 'Configurar accesos VPN', category: 'onboarding', startDate: date(3, 19), isAllDay: true },
  
  // Training today
  { id: 't-training1', title: 'Capacitación: Seguridad de la información', category: 'training', startDate: date(3, 19), isAllDay: false, startTime: '10:00', endTime: '11:30' },

  // Performance period open today
  { id: 't-perf1', title: 'Evaluación de desempeño — Cierra el 31/3', category: 'performance', startDate: date(3, 19), isAllDay: true },

  // Company event today
  { id: 't-company1', title: 'All Hands Q1 — Mañana a las 10hs', category: 'company-event', startDate: date(3, 19), isAllDay: true },

  // Communication today
  { id: 't-9', title: 'Recordatorio: completa la encuesta hoy', category: 'communication', startDate: date(3, 19), isAllDay: true, organizer: people.rrhh },
  { id: 't-10', title: 'Nuevo post: Tips para home office efectivo', category: 'communication', startDate: date(3, 19), isAllDay: true, organizer: people.bienestar },
  { id: 't-11', title: 'Noticia: Resultados del Q1 superan expectativas', category: 'communication', startDate: date(3, 19), isAllDay: true, organizer: people.carlos },
  { id: 't-12', title: 'Aviso: Mantenimiento del sistema sábado', category: 'communication', startDate: date(3, 19), isAllDay: true, organizer: people.humand },
  
  // March 20 (Friday)
  { id: 'm20-1', title: 'Daily Standup', category: 'videocall', startDate: date(3, 20), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'm20-2', title: 'All Hands Meeting', category: 'company-event', startDate: date(3, 20), isAllDay: false, startTime: '10:00', endTime: '11:30' },
  { id: 'm20-3', title: 'Demo Friday', category: 'videocall', startDate: date(3, 20), isAllDay: false, startTime: '17:00', endTime: '18:00', organizer: people.valentina },
  { id: 'm20-4', title: 'Retrospective', category: 'videocall', startDate: date(3, 20), isAllDay: false, startTime: '15:00', endTime: '16:00', organizer: people.elena },
  { id: 'm20-5', title: 'Design Review', category: 'videocall', startDate: date(3, 20), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.sofia },
  { id: 'm20-6', title: 'Capacitación herramientas internas', category: 'onboarding', startDate: date(3, 20), isAllDay: false, startTime: '10:00', endTime: '11:00' },
  
  // Week 4: March 23-27
  // March 21 (Saturday) - Communications
  { id: 'm21-1', title: 'Nuevo beneficio: viernes cortos en julio', category: 'communication', startDate: date(3, 21), isAllDay: true, organizer: people.rrhh },
  { id: 'm21-2', title: 'Noticia: Ganamos premio a mejor lugar para trabajar', category: 'communication', startDate: date(3, 21), isAllDay: true, organizer: people.humand },
  
  // March 22 (Sunday)
  { id: 'm22-1', title: 'Cumpleaños Carlos López', category: 'birthday', startDate: date(3, 22), isAllDay: true, person: people.carlos },
  
  // March 23 (Monday)
  { id: 'm23-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(3, 23), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  { id: 'm23-2', title: 'Sprint Planning', category: 'videocall', startDate: date(3, 23), isAllDay: false, startTime: '10:00', endTime: '11:30', organizer: people.carlos },
  { id: 'm23-3', title: 'Tech Debt Discussion', category: 'videocall', startDate: date(3, 23), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.pablo },
  { id: 'm23-4', title: 'Code Review', category: 'videocall', startDate: date(3, 23), isAllDay: false, startTime: '15:30', endTime: '16:00', organizer: people.roberto },
  { id: 'm23-5', title: 'QA Sync', category: 'videocall', startDate: date(3, 23), isAllDay: false, startTime: '16:30', endTime: '17:00', organizer: people.ana },
  
  // March 24 (Tuesday) - HOLIDAY
  { id: 'm24-1', title: 'Día de la Memoria', category: 'holiday', startDate: date(3, 24), isAllDay: true, description: 'Feriado nacional — Día de la Memoria por la Verdad y la Justicia' },
  
  // March 25 (Wednesday)
  { id: 'm25-1', title: 'Daily Standup', category: 'videocall', startDate: date(3, 25), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'm25-2', title: 'Cumpleaños Lucía Romero', category: 'birthday', startDate: date(3, 25), isAllDay: true, person: people.lucia },
  { id: 'm25-3', title: '1:1 con Valentina', category: 'videocall', startDate: date(3, 25), isAllDay: false, startTime: '11:00', endTime: '11:30', organizer: people.valentina },
  { id: 'm25-4', title: 'Grooming Session', category: 'videocall', startDate: date(3, 25), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.carlos },
  { id: 'm25-5', title: 'Code Review Session', category: 'videocall', startDate: date(3, 25), isAllDay: false, startTime: '15:30', endTime: '16:00', organizer: people.juan },
  { id: 'm25-6', title: 'Design Sync', category: 'videocall', startDate: date(3, 25), isAllDay: false, startTime: '16:30', endTime: '17:00', organizer: people.sofia },
  
  // March 26 (Thursday)
  { id: 'm26-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(3, 26), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  { id: 'm26-2', title: 'Architecture Review', category: 'videocall', startDate: date(3, 26), isAllDay: false, startTime: '10:30', endTime: '11:30', organizer: people.roberto },
  { id: 'm26-3', title: 'QA Planning', category: 'videocall', startDate: date(3, 26), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.ana },
  { id: 'm26-4', title: 'Product Sync', category: 'videocall', startDate: date(3, 26), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.carlos },
  { id: 'm26-5', title: 'Mobile Sync', category: 'videocall', startDate: date(3, 26), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.diego },
  
  // March 27 (Friday)
  { id: 'm27-1', title: 'Daily Standup', category: 'videocall', startDate: date(3, 27), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'm27-comm1', title: 'Post: Resultados encuesta de clima Q1', category: 'communication', startDate: date(3, 27), isAllDay: true, organizer: people.rrhh },
  { id: 'm27-2', title: 'Retrospectiva fin de Q1', category: 'company-event', startDate: date(3, 27), isAllDay: false, startTime: '15:00', endTime: '16:00' },
  { id: 'm27-3', title: 'Demo Friday', category: 'videocall', startDate: date(3, 27), isAllDay: false, startTime: '17:00', endTime: '18:00', organizer: people.valentina },
  { id: 'm27-4', title: 'Knowledge Sharing', category: 'videocall', startDate: date(3, 27), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.pablo },
  
  // Week 5: March 30-31
  // March 30 (Monday)
  { id: 'm30-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(3, 30), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  { id: 'm30-2', title: 'Q2 Planning Kickoff', category: 'videocall', startDate: date(3, 30), isAllDay: false, startTime: '10:00', endTime: '12:00', organizer: people.carlos },
  { id: 'm30-3', title: 'Tech Lead Sync', category: 'videocall', startDate: date(3, 30), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.pablo },
  { id: 'm30-4', title: 'Backend Review', category: 'videocall', startDate: date(3, 30), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.fernando },
  { id: 'm30-5', title: 'Security Review', category: 'videocall', startDate: date(3, 30), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.pedro },
  
  // March 31 (Tuesday)
  { id: 'm31-1', title: 'Daily Standup', category: 'videocall', startDate: date(3, 31), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'm31-2', title: 'Evaluación de desempeño — CIERRA', category: 'performance', startDate: date(3, 31), isAllDay: true },
  { id: 'm31-3', title: '1:1 con Martin', category: 'videocall', startDate: date(3, 31), isAllDay: false, startTime: '10:00', endTime: '10:30', organizer: people.martin },
  { id: 'm31-4', title: 'Product Sync', category: 'videocall', startDate: date(3, 31), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.carlos },
  { id: 'm31-5', title: 'Design Review', category: 'videocall', startDate: date(3, 31), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.sofia },
  { id: 'm31-6', title: 'End of Q1 Celebration', category: 'company-event', startDate: date(3, 31), isAllDay: false, startTime: '18:00', endTime: '19:00' },
  
  // ============ APRIL 2026 ============
  
  // April 1 (Wednesday)
  { id: 'a1-1', title: 'Daily Standup', category: 'videocall', startDate: date(4, 1), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'a1-2', title: 'Martin Sosa — Vacaciones', category: 'vacation', startDate: date(4, 1), endDate: date(4, 5), isAllDay: true, person: people.martin },
  { id: 'a1-3', title: '1:1 con Valentina', category: 'videocall', startDate: date(4, 1), isAllDay: false, startTime: '11:00', endTime: '11:30', organizer: people.valentina },
  { id: 'a1-4', title: 'Q2 OKRs Review', category: 'videocall', startDate: date(4, 1), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.carlos },
  { id: 'a1-5', title: 'Code Review', category: 'videocall', startDate: date(4, 1), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.roberto },
  
  // April 2 (Thursday) - HOLIDAY
  { id: 'a2-1', title: 'Día del Veterano de Malvinas', category: 'holiday', startDate: date(4, 2), isAllDay: true, description: 'Feriado nacional — Día del Veterano y de los Caídos en la Guerra de Malvinas' },
  
  // April 3 (Friday) - HOLIDAY
  { id: 'a3-1', title: 'Viernes Santo', category: 'holiday', startDate: date(4, 3), isAllDay: true, description: 'Feriado nacional — Viernes Santo' },
  
  // April 6 (Monday)
  { id: 'a6-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(4, 6), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  { id: 'a6-comm1', title: 'Post: Bienvenidos de vuelta! Objetivos Q2', category: 'communication', startDate: date(4, 6), isAllDay: true, organizer: people.carlos },
  { id: 'a6-2', title: 'Sprint Planning Q2', category: 'videocall', startDate: date(4, 6), isAllDay: false, startTime: '10:00', endTime: '11:30', organizer: people.carlos },
  { id: 'a6-3', title: 'Tech Debt Discussion', category: 'videocall', startDate: date(4, 6), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.pablo },
  { id: 'a6-4', title: 'Backend Sync', category: 'videocall', startDate: date(4, 6), isAllDay: false, startTime: '15:30', endTime: '16:00', organizer: people.fernando },
  { id: 'a6-5', title: 'Security Review', category: 'videocall', startDate: date(4, 6), isAllDay: false, startTime: '16:30', endTime: '17:00', organizer: people.pedro },
  
  // April 7 (Tuesday)
  { id: 'a7-1', title: 'Daily Standup', category: 'videocall', startDate: date(4, 7), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'a7-2', title: 'Wellness Day — Dia Mundial de la Salud', category: 'company-event', startDate: date(4, 7), isAllDay: true },
  { id: 'a7-3', title: 'Kickoff Wellness Day', category: 'company-event', startDate: date(4, 7), isAllDay: false, startTime: '10:00', endTime: '11:00' },
  { id: 'a7-4', title: 'Día de la salud: actividades de hoy', category: 'communication', startDate: date(4, 7), isAllDay: true, organizer: people.bienestar },
  { id: 'a7-5', title: 'Yoga Session', category: 'company-event', startDate: date(4, 7), isAllDay: false, startTime: '12:00', endTime: '13:00' },
  { id: 'a7-6', title: 'Mindfulness Workshop', category: 'training', startDate: date(4, 7), isAllDay: false, startTime: '15:00', endTime: '16:00' },
  
  // April 8 (Wednesday)
  { id: 'a8-1', title: 'Daily Standup', category: 'videocall', startDate: date(4, 8), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'a8-2', title: '1:1 con Valentina', category: 'videocall', startDate: date(4, 8), isAllDay: false, startTime: '11:00', endTime: '11:30', organizer: people.valentina },
  { id: 'a8-3', title: 'Grooming Session', category: 'videocall', startDate: date(4, 8), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.carlos },
  { id: 'a8-4', title: 'Architecture Review', category: 'videocall', startDate: date(4, 8), isAllDay: false, startTime: '15:30', endTime: '16:30', organizer: people.roberto },
  { id: 'a8-5', title: 'Design Review', category: 'videocall', startDate: date(4, 8), isAllDay: false, startTime: '17:00', endTime: '17:30', organizer: people.sofia },
  
  // April 9 (Thursday)
  { id: 'a9-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(4, 9), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  { id: 'a9-2', title: 'Cumpleaños Roberto Méndez', category: 'birthday', startDate: date(4, 9), isAllDay: true, person: people.roberto },
  { id: 'a9-3', title: 'QA Planning', category: 'videocall', startDate: date(4, 9), isAllDay: false, startTime: '10:30', endTime: '11:00', organizer: people.ana },
  { id: 'a9-4', title: 'Product Roadmap', category: 'videocall', startDate: date(4, 9), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.carlos },
  { id: 'a9-5', title: 'Mobile Sync', category: 'videocall', startDate: date(4, 9), isAllDay: false, startTime: '15:30', endTime: '16:00', organizer: people.diego },
  { id: 'a9-6', title: 'Demo Prep', category: 'videocall', startDate: date(4, 9), isAllDay: false, startTime: '16:30', endTime: '17:00', organizer: people.valentina },
  
  // April 10 (Friday)
  { id: 'a10-1', title: 'Daily Standup', category: 'videocall', startDate: date(4, 10), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'a10-2', title: 'Evaluación de desempeño — CIERRA', category: 'performance', startDate: date(4, 10), isAllDay: true },
  { id: 'a10-3', title: 'Sprint Retro', category: 'videocall', startDate: date(4, 10), isAllDay: false, startTime: '15:00', endTime: '16:00', organizer: people.elena },
  { id: 'a10-4', title: 'Demo Friday', category: 'videocall', startDate: date(4, 10), isAllDay: false, startTime: '17:00', endTime: '18:00', organizer: people.valentina },
  { id: 'a10-5', title: 'Knowledge Sharing', category: 'videocall', startDate: date(4, 10), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.pablo },
  
  // Efemeride: Company Anniversary in April
  { id: 'efem-1', title: 'Aniversario de la Empresa - 8 años', category: 'company-event', startDate: date(4, 12), isAllDay: true, description: 'Celebramos 8 años de Humand' },
  { id: 'efem-1-comm', title: '¡Hoy cumplimos 8 años! Gracias por ser parte', category: 'communication', startDate: date(4, 12), isAllDay: true, organizer: people.humand },
  { id: 'efem-1-party', title: 'Fiesta Aniversario Empresa', category: 'company-event', startDate: date(4, 12), isAllDay: false, startTime: '18:00', endTime: '20:00' },

  // April 13-17 Week
  { id: 'a13-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(4, 13), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  { id: 'a13-2', title: 'Sprint Planning', category: 'videocall', startDate: date(4, 13), isAllDay: false, startTime: '10:00', endTime: '11:30', organizer: people.carlos },
  { id: 'a13-3', title: 'Tech Lead Sync', category: 'videocall', startDate: date(4, 13), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.pablo },
  { id: 'a13-4', title: 'Code Review', category: 'videocall', startDate: date(4, 13), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.roberto },
  { id: 'a13-5', title: 'Data Sync', category: 'videocall', startDate: date(4, 13), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.lara },
  
  { id: 'a14-1', title: 'Daily Standup', category: 'videocall', startDate: date(4, 14), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'a14-2', title: 'Encuesta Q2 Pulse — ABRE', category: 'survey', startDate: date(4, 14), isAllDay: true },
  { id: 'a14-3', title: '1:1 con Martin', category: 'videocall', startDate: date(4, 14), isAllDay: false, startTime: '10:00', endTime: '10:30', organizer: people.martin },
  { id: 'a14-4', title: 'Product Sync', category: 'videocall', startDate: date(4, 14), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.carlos },
  { id: 'a14-5', title: 'Frontend Sync', category: 'videocall', startDate: date(4, 14), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.camila },
  
  { id: 'a15-1', title: 'Daily Standup', category: 'videocall', startDate: date(4, 15), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'a15-2', title: 'Capacitación Agile para equipos', category: 'training', startDate: date(4, 15), endDate: date(4, 25), isAllDay: true },
  { id: 'a15-3', title: '1:1 con Valentina', category: 'videocall', startDate: date(4, 15), isAllDay: false, startTime: '11:00', endTime: '11:30', organizer: people.valentina },
  { id: 'a15-4', title: 'Grooming Session', category: 'videocall', startDate: date(4, 15), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.carlos },
  { id: 'a15-5', title: 'UX Research', category: 'videocall', startDate: date(4, 15), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.lucia },
  
  { id: 'a16-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(4, 16), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  { id: 'a16-2', title: 'Q2 Kickoff All Hands', category: 'company-event', startDate: date(4, 16), isAllDay: false, startTime: '10:00', endTime: '11:30' },
  { id: 'a16-3', title: 'Architecture Discussion', category: 'videocall', startDate: date(4, 16), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.roberto },
  { id: 'a16-4', title: 'QA Sync', category: 'videocall', startDate: date(4, 16), isAllDay: false, startTime: '15:30', endTime: '16:00', organizer: people.ana },
  { id: 'a16-5', title: 'Demo Prep', category: 'videocall', startDate: date(4, 16), isAllDay: false, startTime: '16:30', endTime: '17:00', organizer: people.valentina },
  
  { id: 'a17-1', title: 'Daily Standup', category: 'videocall', startDate: date(4, 17), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'a17-2', title: '5 años en Humand', category: 'anniversary', startDate: date(4, 17), isAllDay: true, person: people.valentina, yearsInCompany: 5 },
  { id: 'a17-3', title: 'Product Roadmap Review', category: 'videocall', startDate: date(4, 17), isAllDay: false, startTime: '10:00', endTime: '11:00', organizer: people.carlos },
  { id: 'a17-4', title: 'Sprint Retro', category: 'videocall', startDate: date(4, 17), isAllDay: false, startTime: '15:00', endTime: '16:00', organizer: people.elena },
  { id: 'a17-5', title: 'Demo Friday', category: 'videocall', startDate: date(4, 17), isAllDay: false, startTime: '17:00', endTime: '18:00', organizer: people.valentina },
  
  // April 20-24 Week
  { id: 'a20-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(4, 20), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  { id: 'a20-2', title: 'Sprint Planning', category: 'videocall', startDate: date(4, 20), isAllDay: false, startTime: '10:00', endTime: '11:30', organizer: people.carlos },
  { id: 'a20-3', title: 'Tech Lead Sync', category: 'videocall', startDate: date(4, 20), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.pablo },
  { id: 'a20-4', title: 'Backend Review', category: 'videocall', startDate: date(4, 20), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.fernando },
  { id: 'a20-5', title: 'Security Review', category: 'videocall', startDate: date(4, 20), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.pedro },
  
  { id: 'a21-1', title: 'Daily Standup', category: 'videocall', startDate: date(4, 21), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'a21-2', title: '1:1 con Martin', category: 'videocall', startDate: date(4, 21), isAllDay: false, startTime: '10:00', endTime: '10:30', organizer: people.martin },
  { id: 'a21-3', title: 'Product Sync', category: 'videocall', startDate: date(4, 21), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.carlos },
  { id: 'a21-4', title: 'Design Review', category: 'videocall', startDate: date(4, 21), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.sofia },
  { id: 'a21-5', title: 'Data Sync', category: 'videocall', startDate: date(4, 21), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.lara },
  
  { id: 'a22-1', title: 'Daily Standup', category: 'videocall', startDate: date(4, 22), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'a22-2', title: 'Celebramos el Día de la Tierra', category: 'communication', startDate: date(4, 22), isAllDay: true, organizer: people.sustentabilidad },
  { id: 'a22-3', title: 'Evento Día de la Tierra', category: 'company-event', startDate: date(4, 22), isAllDay: true },
  { id: 'a22-4', title: '1:1 con Valentina', category: 'videocall', startDate: date(4, 22), isAllDay: false, startTime: '11:00', endTime: '11:30', organizer: people.valentina },
  { id: 'a22-5', title: 'Workshop Día de la Tierra', category: 'company-event', startDate: date(4, 22), isAllDay: false, startTime: '15:00', endTime: '16:00' },
  { id: 'a22-6', title: 'Grooming Session', category: 'videocall', startDate: date(4, 22), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.carlos },
  
  { id: 'a23-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(4, 23), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  { id: 'a23-2', title: 'Cumpleaños Diego Suárez', category: 'birthday', startDate: date(4, 23), isAllDay: true, person: people.diego },
  { id: 'a23-3', title: 'Architecture Review', category: 'videocall', startDate: date(4, 23), isAllDay: false, startTime: '10:30', endTime: '11:30', organizer: people.roberto },
  { id: 'a23-4', title: 'QA Planning', category: 'videocall', startDate: date(4, 23), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.ana },
  { id: 'a23-5', title: 'Mobile Sync', category: 'videocall', startDate: date(4, 23), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.diego },
  { id: 'a23-6', title: 'Demo Prep', category: 'videocall', startDate: date(4, 23), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.valentina },
  
  { id: 'a24-1', title: 'Daily Standup', category: 'videocall', startDate: date(4, 24), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'a24-2', title: 'Sprint Retro', category: 'videocall', startDate: date(4, 24), isAllDay: false, startTime: '15:00', endTime: '16:00', organizer: people.elena },
  { id: 'a24-3', title: 'Demo Friday', category: 'videocall', startDate: date(4, 24), isAllDay: false, startTime: '17:00', endTime: '18:00', organizer: people.valentina },
  { id: 'a24-4', title: 'Knowledge Sharing', category: 'videocall', startDate: date(4, 24), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.pablo },
  
  // April 27-30 Week
  { id: 'a27-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(4, 27), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  { id: 'a27-2', title: 'Sprint Planning', category: 'videocall', startDate: date(4, 27), isAllDay: false, startTime: '10:00', endTime: '11:30', organizer: people.carlos },
  { id: 'a27-3', title: 'Tech Lead Sync', category: 'videocall', startDate: date(4, 27), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.pablo },
  { id: 'a27-4', title: 'Code Review', category: 'videocall', startDate: date(4, 27), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.roberto },
  { id: 'a27-5', title: 'Frontend Sync', category: 'videocall', startDate: date(4, 27), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.camila },
  
  { id: 'a28-1', title: 'Daily Standup', category: 'videocall', startDate: date(4, 28), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'a28-2', title: 'Encuesta Q2 Pulse — CIERRA', category: 'survey', startDate: date(4, 28), isAllDay: true },
  { id: 'a28-3', title: '1:1 con Martin', category: 'videocall', startDate: date(4, 28), isAllDay: false, startTime: '10:00', endTime: '10:30', organizer: people.martin },
  { id: 'a28-4', title: 'Product Sync', category: 'videocall', startDate: date(4, 28), isAllDay: false, startTime: '14:00', endTime: '14:30', organizer: people.carlos },
  { id: 'a28-5', title: 'Design Review', category: 'videocall', startDate: date(4, 28), isAllDay: false, startTime: '15:00', endTime: '15:30', organizer: people.sofia },
  
  { id: 'a29-1', title: 'Daily Standup', category: 'videocall', startDate: date(4, 29), isAllDay: false, startTime: '09:00', endTime: '09:15', organizer: people.elena },
  { id: 'a29-2', title: '1:1 con Valentina', category: 'videocall', startDate: date(4, 29), isAllDay: false, startTime: '11:00', endTime: '11:30', organizer: people.valentina },
  { id: 'a29-3', title: 'Grooming Session', category: 'videocall', startDate: date(4, 29), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.carlos },
  { id: 'a29-4', title: 'UX Research Findings', category: 'videocall', startDate: date(4, 29), isAllDay: false, startTime: '16:00', endTime: '16:30', organizer: people.lucia },
  
  { id: 'a30-1', title: 'Weekly: Dragon Squad', category: 'videocall', startDate: date(4, 30), isAllDay: false, startTime: '09:00', endTime: '09:30', organizer: people.valentina },
  { id: 'a30-2', title: 'All Hands Mensual', category: 'company-event', startDate: date(4, 30), isAllDay: false, startTime: '10:00', endTime: '11:30' },
  { id: 'a30-3', title: 'Architecture Review', category: 'videocall', startDate: date(4, 30), isAllDay: false, startTime: '14:00', endTime: '15:00', organizer: people.roberto },
  { id: 'a30-4', title: 'QA Sync', category: 'videocall', startDate: date(4, 30), isAllDay: false, startTime: '15:30', endTime: '16:00', organizer: people.ana },
  { id: 'a30-5', title: 'End of Month Celebration', category: 'company-event', startDate: date(4, 30), isAllDay: false, startTime: '18:00', endTime: '19:00' },

  // ============ VARIETY ADDITIONS — MARZO ============

  // March 2 (Mon)
  { id: 'm2-x1', title: 'Cumpleaños Pablo Gimenez', category: 'birthday', startDate: date(3, 2), isAllDay: true, person: people.pablo },
  { id: 'm2-x2', title: 'Post: Comienza la semana — tips de productividad', category: 'communication', startDate: date(3, 2), isAllDay: true, organizer: people.bienestar },
  { id: 'm2-x3', title: 'Capacitación: Git avanzado y estrategias de branching', category: 'training', startDate: date(3, 2), isAllDay: false, startTime: '12:00', endTime: '13:00' },

  // March 3 (Tue)
  { id: 'm3-x1', title: 'Juan Perez — Vacaciones', category: 'vacation', startDate: date(3, 3), endDate: date(3, 8), isAllDay: true, person: people.juan },
  { id: 'm3-x2', title: 'Post: Resultados Q4 ya disponibles en el portal', category: 'communication', startDate: date(3, 3), isAllDay: true, organizer: people.carlos },

  // March 4 (Wed)
  { id: 'm4-x1', title: 'Post: Recordatorio beneficios de salud — vence el 15/3', category: 'communication', startDate: date(3, 4), isAllDay: true, organizer: people.rrhh },
  { id: 'm4-x2', title: 'Workshop: Comunicación efectiva en equipos remotos', category: 'training', startDate: date(3, 4), isAllDay: false, startTime: '12:30', endTime: '13:30' },
  { id: 'm4-x3', title: '1 año en Humand — Lucia Romero', category: 'anniversary', startDate: date(3, 4), isAllDay: true, person: people.lucia, yearsInCompany: 1 },

  // March 5 (Thu)
  { id: 'm5-x1', title: 'Post: Nuevas funciones de la plataforma — v2.3', category: 'communication', startDate: date(3, 5), isAllDay: true, organizer: people.humand },
  { id: 'm5-x2', title: 'Capacitación: Seguridad en la nube AWS', category: 'training', startDate: date(3, 5), isAllDay: false, startTime: '12:30', endTime: '13:30' },

  // March 6 (Fri)
  { id: 'm6-x1', title: 'Cumpleaños Luis Fernandez', category: 'birthday', startDate: date(3, 6), isAllDay: true, person: people.luis },
  { id: 'm6-x2', title: 'Post: Cierre de sprint — logros de la semana', category: 'communication', startDate: date(3, 6), isAllDay: true, organizer: people.elena },
  { id: 'm6-x3', title: 'Capacitación: Presentaciones efectivas con datos', category: 'training', startDate: date(3, 6), isAllDay: false, startTime: '12:00', endTime: '13:00' },
  { id: 'm6-x4', title: 'Pablo Gimenez — Vacaciones', category: 'vacation', startDate: date(3, 6), endDate: date(3, 10), isAllDay: true, person: people.pablo },

  // March 9 (Mon)
  { id: 'm9-x1', title: 'Post: Inicio de semana — foco en entregables de Q1', category: 'communication', startDate: date(3, 9), isAllDay: true, organizer: people.carlos },
  { id: 'm9-x2', title: 'Inducción: Primeros pasos en la plataforma', category: 'onboarding', startDate: date(3, 9), isAllDay: true },
  { id: 'm9-x3', title: '1 año en Humand — Lara Rodríguez', category: 'anniversary', startDate: date(3, 9), isAllDay: true, person: people.lara, yearsInCompany: 1 },

  // March 10 (Tue)
  { id: 'm10-x1', title: 'Post: Resultados encuesta de bienestar disponibles', category: 'communication', startDate: date(3, 10), isAllDay: true, organizer: people.bienestar },
  { id: 'm10-x2', title: '4 años en Humand — Camila Torres', category: 'anniversary', startDate: date(3, 10), isAllDay: true, person: people.camila, yearsInCompany: 4 },

  // March 11 (Wed)
  { id: 'm11-x1', title: 'Cumpleaños Juan Perez', category: 'birthday', startDate: date(3, 11), isAllDay: true, person: people.juan },
  { id: 'm11-x2', title: 'Post: Lanzamos nuevo módulo de reconocimientos', category: 'communication', startDate: date(3, 11), isAllDay: true, organizer: people.humand },
  { id: 'm11-x3', title: 'Almuerzo de equipo — Dragon Squad', category: 'company-event', startDate: date(3, 11), isAllDay: false, startTime: '13:00', endTime: '14:00' },

  // March 12 (Thu)
  { id: 'm12-x1', title: 'Post: Tips para el home office esta semana', category: 'communication', startDate: date(3, 12), isAllDay: true, organizer: people.bienestar },
  { id: 'm12-x2', title: 'Taller: Figma para desarrolladores', category: 'training', startDate: date(3, 12), isAllDay: false, startTime: '12:30', endTime: '13:30' },
  { id: 'm12-x3', title: 'Cumpleaños Valentina Rios', category: 'birthday', startDate: date(3, 12), isAllDay: true, person: people.valentina },

  // March 13 (Fri)
  { id: 'm13-x1', title: 'Post: Resumen semanal — sprint cerrado con éxito', category: 'communication', startDate: date(3, 13), isAllDay: true, organizer: people.rrhh },
  { id: 'm13-x2', title: 'Taller: Excel y Google Sheets para reportes', category: 'training', startDate: date(3, 13), isAllDay: false, startTime: '12:00', endTime: '13:00' },
  { id: 'm13-x3', title: 'After Office virtual — cierre de sprint', category: 'company-event', startDate: date(3, 13), isAllDay: false, startTime: '18:00', endTime: '19:00' },

  // March 16 (Mon)
  { id: 'm16-x1', title: 'Post: Novedades de política de vacaciones 2026', category: 'communication', startDate: date(3, 16), isAllDay: true, organizer: people.rrhh },
  { id: 'm16-x2', title: 'Capacitación: SQL para análisis de datos de producto', category: 'training', startDate: date(3, 16), isAllDay: false, startTime: '12:30', endTime: '13:30' },
  { id: 'm16-x3', title: 'Cumpleaños Ana Morales', category: 'birthday', startDate: date(3, 16), isAllDay: true, person: people.ana },

  // March 17 (Tue)
  { id: 'm17-x1', title: 'Post: Testimonios de colaboradores — sección Cultura', category: 'communication', startDate: date(3, 17), isAllDay: true, organizer: people.humand },
  { id: 'm17-x2', title: 'Onboarding: Firma de acuerdo de confidencialidad', category: 'onboarding', startDate: date(3, 17), isAllDay: true },

  // March 18 (Wed)
  { id: 'm18-x1', title: 'Post: Actualizar datos de contacto de emergencia', category: 'communication', startDate: date(3, 18), isAllDay: true, organizer: people.rrhh },
  { id: 'm18-x2', title: 'Taller: Comunicación no violenta', category: 'training', startDate: date(3, 18), isAllDay: false, startTime: '12:30', endTime: '13:30' },
  { id: 'm18-x3', title: 'Almuerzo de bienvenida — nuevos ingresos', category: 'company-event', startDate: date(3, 18), isAllDay: false, startTime: '13:00', endTime: '14:00' },

  // March 20 (Fri)
  { id: 'm20-x1', title: 'Cumpleaños Martin Sosa', category: 'birthday', startDate: date(3, 20), isAllDay: true, person: people.martin },
  { id: 'm20-x2', title: 'Post: Slide deck del All Hands disponible', category: 'communication', startDate: date(3, 20), isAllDay: true, organizer: people.carlos },

  // March 23 (Mon) — current week, sin performance/survey
  { id: 'm23-x1', title: 'Post: Arranca la última semana completa de marzo', category: 'communication', startDate: date(3, 23), isAllDay: true, organizer: people.carlos },
  { id: 'm23-x2', title: 'Onboarding: Configuración de herramientas del equipo', category: 'onboarding', startDate: date(3, 23), isAllDay: true },
  { id: 'm23-x3', title: 'Cumpleaños Pedro Ibáñez', category: 'birthday', startDate: date(3, 23), isAllDay: true, person: people.pedro },

  // March 25 (Wed)
  { id: 'm25-x1', title: 'Post: Nueva política de trabajo remoto publicada', category: 'communication', startDate: date(3, 25), isAllDay: true, organizer: people.rrhh },
  { id: 'm25-x2', title: 'Taller: Jira y Confluence para gestión de proyectos', category: 'training', startDate: date(3, 25), isAllDay: false, startTime: '12:00', endTime: '13:00' },

  // March 26 (Thu)
  { id: 'm26-x1', title: 'Post: Resultados de feedback de pares próximamente', category: 'communication', startDate: date(3, 26), isAllDay: true, organizer: people.humand },
  { id: 'm26-x2', title: 'Taller: Design Thinking aplicado', category: 'training', startDate: date(3, 26), isAllDay: false, startTime: '13:00', endTime: '14:30' },
  { id: 'm26-x3', title: 'Fernando Castro — Vacaciones', category: 'vacation', startDate: date(3, 26), endDate: date(3, 31), isAllDay: true, person: people.fernando },

  // March 27 (Fri)
  { id: 'm27-x1', title: '3 años en Humand — Elena Martinez', category: 'anniversary', startDate: date(3, 27), isAllDay: true, person: people.elena, yearsInCompany: 3 },
  { id: 'm27-x2', title: 'Post: Gracias por completar la evaluación', category: 'communication', startDate: date(3, 27), isAllDay: true, organizer: people.rrhh },
  { id: 'm27-x3', title: 'Happy Hour de fin de mes', category: 'company-event', startDate: date(3, 27), isAllDay: false, startTime: '18:00', endTime: '19:30' },

  // March 30 (Mon)
  { id: 'm30-x1', title: 'Post: Cierre de Q1 — balance del trimestre', category: 'communication', startDate: date(3, 30), isAllDay: true, organizer: people.carlos },
  { id: 'm30-x2', title: 'Onboarding: Revisión de objetivos del primer mes', category: 'onboarding', startDate: date(3, 30), isAllDay: true },
  { id: 'm30-x3', title: 'Cumpleaños Roberto Méndez', category: 'birthday', startDate: date(3, 30), isAllDay: true, person: people.roberto },

  // March 31 (Tue)
  { id: 'm31-x1', title: 'Post: ¡Cerramos Q1! Gracias a todo el equipo', category: 'communication', startDate: date(3, 31), isAllDay: true, organizer: people.humand },
  { id: 'm31-x2', title: '6 años en Humand — Martin Sosa', category: 'anniversary', startDate: date(3, 31), isAllDay: true, person: people.martin, yearsInCompany: 6 },

  // ============ VARIETY ADDITIONS — ABRIL ============

  // April 1 (Wed)
  { id: 'a1-x1', title: 'Cumpleaños Camila Torres', category: 'birthday', startDate: date(4, 1), isAllDay: true, person: people.camila },
  { id: 'a1-x2', title: 'Post: Bienvenidos a Q2 — prioridades y objetivos', category: 'communication', startDate: date(4, 1), isAllDay: true, organizer: people.carlos },
  { id: 'a1-x3', title: 'Capacitación: TypeScript avanzado — tipos y generics', category: 'training', startDate: date(4, 1), isAllDay: false, startTime: '12:30', endTime: '13:30' },

  // April 6 (Mon)
  { id: 'a6-x1', title: 'Cumpleaños Juan Perez', category: 'birthday', startDate: date(4, 6), isAllDay: true, person: people.juan },
  { id: 'a6-x2', title: 'Capacitación: Observabilidad y monitoreo de APIs', category: 'training', startDate: date(4, 6), isAllDay: false, startTime: '12:30', endTime: '13:30' },

  // April 7 (Tue)
  { id: 'a7-x1', title: '2 años en Humand — Diego Suárez', category: 'anniversary', startDate: date(4, 7), isAllDay: true, person: people.diego, yearsInCompany: 2 },
  { id: 'a7-x2', title: 'Onboarding: Acceso al portal de beneficios', category: 'onboarding', startDate: date(4, 7), isAllDay: true },

  // April 8 (Wed)
  { id: 'a8-x1', title: 'Post: Recordatorio — renovar credenciales de acceso', category: 'communication', startDate: date(4, 8), isAllDay: true, organizer: people.humand },
  { id: 'a8-x2', title: 'Cumpleaños Luis Fernandez', category: 'birthday', startDate: date(4, 8), isAllDay: true, person: people.luis },
  { id: 'a8-x3', title: 'Onboarding: Reunión de bienvenida con RRHH', category: 'onboarding', startDate: date(4, 8), isAllDay: false, startTime: '12:00', endTime: '12:30', organizer: people.rrhh },

  // April 9 (Thu)
  { id: 'a9-x1', title: 'Post: Resultados encuesta de clima Q1 publicados', category: 'communication', startDate: date(4, 9), isAllDay: true, organizer: people.rrhh },
  { id: 'a9-x2', title: 'Capacitación: Arquitectura de microservicios', category: 'training', startDate: date(4, 9), isAllDay: false, startTime: '12:00', endTime: '13:00' },

  // April 10 (Fri)
  { id: 'a10-x1', title: 'Post: Tips de bienestar — desconexión digital', category: 'communication', startDate: date(4, 10), isAllDay: true, organizer: people.bienestar },
  { id: 'a10-x2', title: 'Cumpleaños Maria Garcia', category: 'birthday', startDate: date(4, 10), isAllDay: true, person: people.maria },
  { id: 'a10-x3', title: 'Asado virtual del equipo — fin de sprint', category: 'company-event', startDate: date(4, 10), isAllDay: false, startTime: '18:00', endTime: '19:00' },

  // April 13 (Mon)
  { id: 'a13-x1', title: 'Post: Novedades de la plataforma — versión 2.4', category: 'communication', startDate: date(4, 13), isAllDay: true, organizer: people.humand },
  { id: 'a13-x2', title: 'Cumpleaños Elena Martinez', category: 'birthday', startDate: date(4, 13), isAllDay: true, person: people.elena },
  { id: 'a13-x3', title: 'Capacitación: Testing automatizado con Jest y Cypress', category: 'training', startDate: date(4, 13), isAllDay: false, startTime: '12:30', endTime: '13:30' },

  // April 14 (Tue)
  { id: 'a14-x1', title: 'Post: Encuesta Q2 abierta — completá antes del 28', category: 'communication', startDate: date(4, 14), isAllDay: true, organizer: people.rrhh },
  { id: 'a14-x2', title: 'Cumpleaños Pablo Gimenez', category: 'birthday', startDate: date(4, 14), isAllDay: true, person: people.pablo },
  { id: 'a14-x3', title: 'Onboarding: Revisión de los primeros 30 días', category: 'onboarding', startDate: date(4, 14), isAllDay: true },

  // April 15 (Wed) — training all-day ya existente
  { id: 'a15-x1', title: 'Post: Nuevo beneficio — día de cumpleaños libre', category: 'communication', startDate: date(4, 15), isAllDay: true, organizer: people.rrhh },
  { id: 'a15-x2', title: 'Cumpleaños Pedro Ibáñez', category: 'birthday', startDate: date(4, 15), isAllDay: true, person: people.pedro },

  // April 16 (Thu)
  { id: 'a16-x1', title: 'Post: Resumen del All Hands — slide deck compartido', category: 'communication', startDate: date(4, 16), isAllDay: true, organizer: people.carlos },
  { id: 'a16-x2', title: 'Cumpleaños Ana Morales', category: 'birthday', startDate: date(4, 16), isAllDay: true, person: people.ana },
  { id: 'a16-x3', title: 'Taller: Liderazgo ágil para tech leads', category: 'training', startDate: date(4, 16), isAllDay: false, startTime: '12:00', endTime: '13:30' },

  // April 17 (Fri)
  { id: 'a17-x1', title: 'Post: ¡Feliz aniversario Valentina! 5 años con nosotros', category: 'communication', startDate: date(4, 17), isAllDay: true, organizer: people.humand },
  { id: 'a17-x2', title: 'Cumpleaños Carlos López', category: 'birthday', startDate: date(4, 17), isAllDay: true, person: people.carlos },
  { id: 'a17-x3', title: 'Trivia virtual Q2 — edición tech', category: 'company-event', startDate: date(4, 17), isAllDay: false, startTime: '18:00', endTime: '19:00' },

  // April 20 (Mon)
  { id: 'a20-x1', title: 'Post: Arrancan capacitaciones Q2 — calendario adjunto', category: 'communication', startDate: date(4, 20), isAllDay: true, organizer: people.rrhh },
  { id: 'a20-x2', title: 'Cumpleaños Fernando Castro', category: 'birthday', startDate: date(4, 20), isAllDay: true, person: people.fernando },
  { id: 'a20-x3', title: 'Onboarding: Check-in de 60 días con tu líder', category: 'onboarding', startDate: date(4, 20), isAllDay: true },

  // April 21 (Tue)
  { id: 'a21-x1', title: 'Post: Tips de bienestar — pausas activas', category: 'communication', startDate: date(4, 21), isAllDay: true, organizer: people.bienestar },
  { id: 'a21-x2', title: 'Capacitación: Scrum y Kanban aplicados al equipo', category: 'training', startDate: date(4, 21), isAllDay: false, startTime: '12:30', endTime: '13:30' },
  { id: 'a21-x3', title: 'Cumpleaños Camila Torres', category: 'birthday', startDate: date(4, 21), isAllDay: true, person: people.camila },

  // April 22 (Wed) — Día de la Tierra, ya tiene comm + company
  { id: 'a22-x1', title: 'Cumpleaños Lara Rodríguez', category: 'birthday', startDate: date(4, 22), isAllDay: true, person: people.lara },
  { id: 'a22-x2', title: 'Capacitación: Impacto ambiental en tecnología', category: 'training', startDate: date(4, 22), isAllDay: false, startTime: '12:00', endTime: '13:00' },

  // April 23 (Thu)
  { id: 'a23-x1', title: 'Post: Novedades de compliance — lectura obligatoria', category: 'communication', startDate: date(4, 23), isAllDay: true, organizer: people.humand },
  { id: 'a23-x2', title: 'Capacitación: DevOps — CI/CD en la práctica', category: 'training', startDate: date(4, 23), isAllDay: false, startTime: '12:30', endTime: '13:30' },

  // April 24 (Fri)
  { id: 'a24-x1', title: 'Post: Cierre de sprint — celebración de logros', category: 'communication', startDate: date(4, 24), isAllDay: true, organizer: people.elena },
  { id: 'a24-x2', title: 'Cumpleaños Roberto Méndez', category: 'birthday', startDate: date(4, 24), isAllDay: true, person: people.roberto },
  { id: 'a24-x3', title: 'Capacitación: GTD y manejo del tiempo', category: 'training', startDate: date(4, 24), isAllDay: false, startTime: '12:00', endTime: '13:00' },
  { id: 'a24-x4', title: 'After Office virtual — cierre de sprint', category: 'company-event', startDate: date(4, 24), isAllDay: false, startTime: '18:00', endTime: '19:00' },

  // April 27 (Mon)
  { id: 'a27-x1', title: 'Post: Última semana de abril — foco en entregables', category: 'communication', startDate: date(4, 27), isAllDay: true, organizer: people.carlos },
  { id: 'a27-x2', title: 'Cumpleaños Diego Suárez', category: 'birthday', startDate: date(4, 27), isAllDay: true, person: people.diego },
  { id: 'a27-x3', title: 'Onboarding: Evaluación del período inicial', category: 'onboarding', startDate: date(4, 27), isAllDay: true },

  // April 28 (Tue)
  { id: 'a28-x1', title: 'Post: Encuesta Q2 cierra hoy — gracias por participar', category: 'communication', startDate: date(4, 28), isAllDay: true, organizer: people.rrhh },
  { id: 'a28-x2', title: 'Cumpleaños Martin Sosa', category: 'birthday', startDate: date(4, 28), isAllDay: true, person: people.martin },
  { id: 'a28-x3', title: 'Capacitación: IA aplicada a producto y datos', category: 'training', startDate: date(4, 28), isAllDay: false, startTime: '12:30', endTime: '14:00' },

  // April 29 (Wed)
  { id: 'a29-x1', title: 'Post: Preview de novedades de mayo', category: 'communication', startDate: date(4, 29), isAllDay: true, organizer: people.humand },
  { id: 'a29-x2', title: 'Cumpleaños Valentina Rios', category: 'birthday', startDate: date(4, 29), isAllDay: true, person: people.valentina },
  { id: 'a29-x3', title: 'Onboarding: Cierre y evaluación final del período', category: 'onboarding', startDate: date(4, 29), isAllDay: true },
  { id: 'a29-x4', title: 'Almuerzo de cierre de mes con el equipo', category: 'company-event', startDate: date(4, 29), isAllDay: false, startTime: '13:00', endTime: '14:00' },

  // April 30 (Thu)
  { id: 'a30-x1', title: 'Post: Cierre de abril — resultados y agradecimientos', category: 'communication', startDate: date(4, 30), isAllDay: true, organizer: people.carlos },
  { id: 'a30-x2', title: 'Cumpleaños Elena Martinez', category: 'birthday', startDate: date(4, 30), isAllDay: true, person: people.elena },
  { id: 'a30-x3', title: 'Capacitación: OKRs — definición y seguimiento efectivo', category: 'training', startDate: date(4, 30), isAllDay: false, startTime: '12:00', endTime: '13:00' },
];

// Tasks
export const initialTasks: Task[] = [
  { id: 'task1', title: 'Completar Benefits Enrollment', tag: 'General', assignedBy: people.valentina, createdByMe: false, dueDate: date(3, 18), completed: false },
  { id: 'task2', title: 'Completar encuesta de clima', tag: 'Encuesta', assignedBy: people.humand, createdByMe: false, dueDate: date(3, 19), completed: false },
  { id: 'task3', title: 'Meet Your Buddy', tag: 'Onboarding', assignedBy: people.valentina, createdByMe: false, dueDate: date(3, 19), completed: false },
  { id: 'task4', title: 'Autoevaluación Q1', tag: 'Desempeño', createdByMe: true, dueDate: date(3, 21), completed: false },
  { id: 'task5', title: 'Leer manual del empleado', tag: 'Onboarding', assignedBy: people.valentina, createdByMe: false, dueDate: date(3, 15), completed: true, completedDate: date(3, 15) },
  { id: 'task6', title: 'Completar objetivos Q2', tag: 'Desempeno', createdByMe: true, dueDate: date(4, 30), completed: false },
];

// Absent people today (March 19)
export const absentToday: AbsentPerson[] = [
  { ...people.luis, leaveType: 'vacation', startDate: date(3, 10), endDate: date(3, 22), leader: people.valentina },
  { ...people.ana, leaveType: 'vacation', startDate: date(3, 15), endDate: date(3, 22), leader: people.valentina },
  { ...people.pedro, leaveType: 'medical-leave', startDate: date(3, 18), endDate: date(3, 25), leader: people.martin },
  { ...people.camila, leaveType: 'vacation', startDate: date(3, 17), endDate: date(3, 21), leader: people.valentina },
];

// Shift data
export const getShiftForDate = (date: Date): Shift | null => {
  const day = date.getDay();
  if (day === 0 || day === 6) return null;

  // Use date number as a stable seed for variety
  const seed = date.getDate() + date.getMonth() * 31;

  // Pattern: office 3 days/week, remote 1-2 days, depot 1 day
  const patterns: Array<{ name: string; startTime: string; endTime: string; totalHours: number }> = [
    { name: 'Turno Oficina',  startTime: '9:00',  endTime: '18:00', totalHours: 8 },
    { name: 'Turno Remoto',   startTime: '9:00',  endTime: '18:00', totalHours: 8 },
    { name: 'Turno Oficina',  startTime: '8:00',  endTime: '17:00', totalHours: 8 },
    { name: 'Turno Depósito', startTime: '7:00',  endTime: '16:00', totalHours: 8 },
    { name: 'Turno Oficina',  startTime: '10:00', endTime: '19:00', totalHours: 8 },
    { name: 'Turno Remoto',   startTime: '8:30',  endTime: '17:30', totalHours: 8 },
    { name: 'Turno Oficina',  startTime: '9:00',  endTime: '18:00', totalHours: 8 },
  ];

  return patterns[seed % patterns.length];
};

// Past shift worked hours
export const pastShiftData: Record<string, { workedHours: number; balance: number }> = {
  '2026-03-02': { workedHours: 8.5, balance: 0.5 },
  '2026-03-03': { workedHours: 7.5, balance: -0.5 },
  '2026-03-04': { workedHours: 8.0, balance: 0 },
  '2026-03-05': { workedHours: 8.5, balance: 0.5 },
  '2026-03-06': { workedHours: 7.0, balance: -1.0 },
  '2026-03-09': { workedHours: 8.0, balance: 0 },
  '2026-03-10': { workedHours: 9.0, balance: 1.0 },
  '2026-03-11': { workedHours: 8.0, balance: 0 },
  '2026-03-12': { workedHours: 7.5, balance: -0.5 },
  '2026-03-13': { workedHours: 8.0, balance: 0 },
  '2026-03-16': { workedHours: 8.5, balance: 0.5 },
  '2026-03-17': { workedHours: 8.0, balance: 0 },
  '2026-03-18': { workedHours: 8.0, balance: 0 },
};

// Holidays with names
export const holidaysList: { date: Date; name: string }[] = [
  { date: date(3, 24), name: 'Día de la Memoria' },
  { date: date(4, 2), name: 'Día del Veterano y Caídos en Malvinas' },
  { date: date(4, 3), name: 'Viernes Santo' },
];

export const holidays = holidaysList.map(h => h.date);

export const isHoliday = (checkDate: Date): boolean => {
  return holidays.some(h => 
    h.getFullYear() === checkDate.getFullYear() &&
    h.getMonth() === checkDate.getMonth() &&
    h.getDate() === checkDate.getDate()
  );
};

export const getHolidayName = (checkDate: Date): string | null => {
  const holiday = holidaysList.find(h => 
    h.date.getFullYear() === checkDate.getFullYear() &&
    h.date.getMonth() === checkDate.getMonth() &&
    h.date.getDate() === checkDate.getDate()
  );
  return holiday?.name || null;
};

// Category color mapping
export const categoryColors: Record<string, string> = {
  'birthday': '#EC4899',     // Rosa fuerte
  'anniversary': '#EAB308',  // Amarillo fuerte
  'holiday': '#6B7280',      // Gris
  'vacation': '#14B8A6',     // Verde agua
  'medical-leave': '#14B8A6',// Verde agua
  'company-event': '#8B5CF6',// Violeta
  'performance': '#F97316',  // Naranja
  'survey': '#F97316',       // Naranja
  'training': '#EF4444',     // Rojo
  'onboarding': '#22C55E',   // Verde
  'task': '#92400E',         // Marrón
  'videocall': '#496BE3',    // Azul marca
  'communication': '#0EA5E9',// Celeste
};



// Category labels in Spanish
export const categoryLabels: Record<string, string> = {
  'birthday': 'Cumpleaños',
  'anniversary': 'Aniversarios',
  'holiday': 'Feriados',
  'vacation': 'Vacaciones',
  'medical-leave': 'Licencia médica',
  'company-event': 'Eventos de empresa',
  'performance': 'Desempeño',
  'survey': 'Evaluación de Clima',
  'training': 'Capacitaciones',
  'onboarding': 'Onboarding',
  'task': 'Tareas',
  'videocall': 'Videollamadas',
  'communication': 'Comunicaciones',
};
