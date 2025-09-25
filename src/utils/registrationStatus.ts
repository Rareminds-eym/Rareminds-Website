import { Event } from '../types/Events/event';

export interface RegistrationStatusResult {
  isClosed: boolean;
  reason: 'explicit' | 'event_status' | 'deadline' | null;
  message: string;
  buttonText: string;
  deadlineDate?: Date;
}

/**
 * Centralized registration status logic used by both banner and button components
 * This ensures 100% consistency across all registration status checks
 */
export function getRegistrationStatus(event: {
  registration_deadline?: string;
  event_date: string;
  registration_status?: 'open' | 'closed' | 'full' | 'waitlist';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}): RegistrationStatusResult {
  
  console.log('🔍 Registration Status Check:', {
    registration_status: event.registration_status,
    event_status: event.status,
    registration_deadline: event.registration_deadline,
    current_time: new Date().toISOString(),
    event_date: event.event_date
  });

  // Check explicit registration status first
  if (event.registration_status === 'closed' || event.registration_status === 'full') {
    console.log('❌ Registration closed by explicit status:', event.registration_status);
    
    const isFull = event.registration_status === 'full';
    return {
      isClosed: true,
      reason: 'explicit',
      message: isFull ? 'Registration Full' : 'Registration Closed',
      buttonText: isFull ? 'REGISTRATION FULL' : 'REGISTRATION CLOSED'
    };
  }

  // Check event status
  if (event.status === 'completed' || event.status === 'cancelled') {
    console.log('❌ Registration closed by event status:', event.status);
    
    const isCompleted = event.status === 'completed';
    return {
      isClosed: true,
      reason: 'event_status',
      message: isCompleted ? 'Event Completed' : 'Event Cancelled',
      buttonText: isCompleted ? 'EVENT COMPLETED' : 'EVENT CANCELLED'
    };
  }

  // Check registration deadline
  if (event.registration_deadline) {
    const deadlineDate = new Date(event.registration_deadline);
    const currentDate = new Date();
    const isPastDeadline = currentDate > deadlineDate;
    
    console.log('📅 Deadline check:', {
      deadline: deadlineDate.toISOString(),
      current: currentDate.toISOString(),
      isPast: isPastDeadline,
      deadlineString: event.registration_deadline
    });
    
    if (isPastDeadline) {
      console.log('❌ Registration closed by deadline');
      return {
        isClosed: true,
        reason: 'deadline',
        message: 'Registration Closed',
        buttonText: 'REGISTRATION DEADLINE PASSED',
        deadlineDate
      };
    }
  }

  console.log('✅ Registration is open');
  return {
    isClosed: false,
    reason: null,
    message: '',
    buttonText: 'REGISTER NOW'
  };
}

/**
 * Quick check if registration is closed (returns boolean only)
 */
export function isRegistrationClosed(event: {
  registration_deadline?: string;
  event_date: string;
  registration_status?: 'open' | 'closed' | 'full' | 'waitlist';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}): boolean {
  return getRegistrationStatus(event).isClosed;
}