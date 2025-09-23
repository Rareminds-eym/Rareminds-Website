// Test the exact same logic we implemented
function testRegistrationLogic() {
    console.log('🧪 Testing Registration Logic');
    
    // Test your exact event scenario from the image
    const yourEvent = {
        title: "6-day Employability Training Program",
        registration_deadline: "2025-09-24T23:59:00Z", // Sep 24, 2025 at 11:59 PM
        event_date: "2025-09-22",
        status: "ongoing", // Event is ongoing
        registration_status: undefined // No explicit status (removed from query)
    };
    
    const getRegistrationStatus = (event) => {
        console.log('🔘 Registration Status Check:', {
            registration_status: event.registration_status,
            event_status: event.status,
            registration_deadline: event.registration_deadline,
            current_time: new Date().toISOString()
        });
        
        // Check explicit registration status first
        if (event.registration_status === 'closed' || event.registration_status === 'full') {
            console.log('❌ Registration closed by explicit status:', event.registration_status);
            return {
                isClosed: true,
                buttonText: event.registration_status === 'full' ? 'REGISTRATION FULL' : 'REGISTRATION CLOSED'
            };
        }
        
        // Check event status
        if (event.status === 'completed' || event.status === 'cancelled') {
            console.log('❌ Registration closed by event status:', event.status);
            return {
                isClosed: true,
                buttonText: event.status === 'completed' ? 'EVENT COMPLETED' : 'EVENT CANCELLED'
            };
        }
        
        // Check registration deadline
        if (event.registration_deadline) {
            const deadlineDate = new Date(event.registration_deadline);
            const currentDate = new Date();
            console.log('📅 Deadline check:', {
                deadline: deadlineDate.toISOString(),
                current: currentDate.toISOString(),
                isPast: currentDate > deadlineDate,
                deadlineLocal: deadlineDate.toLocaleString(),
                currentLocal: currentDate.toLocaleString()
            });
            
            if (currentDate > deadlineDate) {
                console.log('❌ Registration closed by deadline');
                return {
                    isClosed: true,
                    buttonText: 'REGISTRATION DEADLINE PASSED'
                };
            }
        }
        
        console.log('✅ Registration is open');
        return {
            isClosed: false,
            buttonText: 'REGISTER NOW'
        };
    };
    
    const result = getRegistrationStatus(yourEvent);
    
    console.log('🎯 FINAL RESULT:');
    console.log('Button should show:', result.buttonText);
    console.log('Button should be disabled:', result.isClosed);
    console.log('Banner should show:', result.isClosed ? 'Registration Closed' : 'No banner');
    
    // Expected: Since today is Sep 23, 2025 and deadline is Sep 24, 2025 at 11:59 PM
    // Registration should still be OPEN (deadline hasn't passed yet)
    // But if the current time is past Sep 24, 2025 11:59 PM, it should be CLOSED
}

testRegistrationLogic();