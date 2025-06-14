import React from 'react';
import { useSelector } from 'react-redux';
import { selectServiceById, selectServicesCount } from '../features/corporateTrainingServicesSlice';
import type { RootState } from '../store';

interface ServiceDetailProps {
    serviceId: string;
}

/**
 * Example component showing how to use Redux selectors for corporate training services
 * This demonstrates fetching a specific service by ID and displaying service count
 */
const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId }) => {
    const service = useSelector((state: RootState) => selectServiceById(state, serviceId));
    const totalServices = useSelector((state: RootState) => selectServicesCount(state));

    if (!service) {
        return (
            <div>
                <h3>Service not found</h3>
                <p>No service found with ID: {serviceId}</p>
                <p>Total available services: {totalServices}</p>
            </div>
        );
    }

    return (
        <div>
            <h2>{service.heroTitle}</h2>
            <p>{service.heroSubtitle}</p>
            {service.programs && (
                <div>
                    <h3>Available Programs:</h3>
                    <ul>
                        {service.programs.map((program: any, index: number) => (
                            <li key={index}>{program.title}</li>
                        ))}
                    </ul>
                </div>
            )}
            <p><small>Service {serviceId} - Total services available: {totalServices}</small></p>
        </div>
    );
};

export default ServiceDetail;
