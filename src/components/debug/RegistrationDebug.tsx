import React from 'react';
import { getRegistrationStatus } from '../../utils/registrationStatus';

// Component to debug registration status - add this temporarily to your EventDetail
export const RegistrationDebug: React.FC<{ event: any }> = ({ event }) => {
  const registrationStatus = getRegistrationStatus(event);
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'black', 
      color: 'white', 
      padding: '20px', 
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px',
      fontFamily: 'monospace'
    }}>
      <h3 style={{ color: 'yellow', marginBottom: '10px' }}>🐛 Registration Debug</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Event Data:</strong><br/>
        registration_status: <span style={{ color: 'cyan' }}>{event.registration_status || 'undefined'}</span><br/>
        status: <span style={{ color: 'cyan' }}>{event.status}</span><br/>
        registration_deadline: <span style={{ color: 'cyan' }}>{event.registration_deadline || 'undefined'}</span><br/>
        event_date: <span style={{ color: 'cyan' }}>{event.event_date}</span>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Current Time:</strong><br/>
        <span style={{ color: 'lime' }}>{new Date().toISOString()}</span>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Result:</strong><br/>
        isClosed: <span style={{ color: registrationStatus.isClosed ? 'red' : 'lime' }}>
          {registrationStatus.isClosed ? 'TRUE ❌' : 'FALSE ✅'}
        </span><br/>
        reason: <span style={{ color: 'orange' }}>{registrationStatus.reason || 'none'}</span><br/>
        message: <span style={{ color: 'yellow' }}>"{registrationStatus.message}"</span><br/>
        buttonText: <span style={{ color: 'pink' }}>"{registrationStatus.buttonText}"</span>
      </div>
      
      {event.registration_deadline && (
        <div>
          <strong>Deadline Analysis:</strong><br/>
          Deadline: <span style={{ color: 'cyan' }}>{new Date(event.registration_deadline).toLocaleString()}</span><br/>
          Current: <span style={{ color: 'lime' }}>{new Date().toLocaleString()}</span><br/>
          Passed: <span style={{ color: new Date() > new Date(event.registration_deadline) ? 'red' : 'lime' }}>
            {new Date() > new Date(event.registration_deadline) ? 'YES ❌' : 'NO ✅'}
          </span>
        </div>
      )}
    </div>
  );
};

export default RegistrationDebug;