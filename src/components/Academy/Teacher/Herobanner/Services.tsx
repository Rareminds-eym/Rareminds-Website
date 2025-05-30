
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Shield, GraduationCap, BarChart3, Award, Calculator } from 'lucide-react';

const Services = () => {
  const [activeService, setActiveService] = useState('esg');

  const services = [
    {
      id: 'esg',
      name: 'ESG',
      icon: Leaf,
      title: 'Environmental, Social & Governance',
      description: 'Comprehensive ESG strategy development and implementation to help your organization meet sustainability goals and regulatory requirements. Our expert consultants guide you through ESG reporting, risk assessment, and stakeholder engagement.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['ESG Strategy Development', 'Sustainability Reporting', 'Risk Assessment', 'Stakeholder Engagement']
    },
    {
      id: 'iso',
      name: 'ISO',
      icon: Shield,
      title: 'ISO Certification & Management',
      description: 'Expert guidance for ISO certification across multiple standards including ISO 9001, ISO 14001, ISO 45001, and more. We provide comprehensive support from gap analysis to successful certification and ongoing compliance.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['ISO 9001 Quality Management', 'ISO 14001 Environmental', 'ISO 45001 Safety', 'Compliance Monitoring']
    },
    {
      id: 'netzero',
      name: 'Net-Zero',
      icon: BarChart3,
      title: 'Net-Zero Strategy & Implementation',
      description: 'Develop and implement comprehensive net-zero strategies aligned with global climate goals. Our specialists help organizations set science-based targets, create decarbonization roadmaps, and track progress towards carbon neutrality.',
      image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Carbon Footprint Assessment', 'Science-Based Targets', 'Decarbonization Roadmap', 'Progress Monitoring']
    },
    {
      id: 'ghg',
      name: 'GHG',
      icon: Calculator,
      title: 'Greenhouse Gas Accounting',
      description: 'Accurate greenhouse gas accounting and reporting services following international standards. We help organizations measure, manage, and reduce their carbon emissions through comprehensive GHG inventories and verification.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['GHG Inventory Development', 'Scope 1, 2, 3 Emissions', 'Third-Party Verification', 'Emission Reduction Planning']
    },
    {
      id: 'training',
      name: 'Training',
      icon: GraduationCap,
      title: 'Professional Training & Development',
      description: 'Comprehensive training programs designed to build organizational capacity in sustainability, quality management, and compliance. Our certified trainers deliver customized programs for teams at all levels.',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Customized Training Programs', 'Certified Instructors', 'Interactive Workshops', 'Competency Assessment']
    },
    {
      id: 'certificate',
      name: 'Certificate',
      icon: Award,
      title: 'Certification & Verification',
      description: 'Third-party certification and verification services to validate your sustainability claims and compliance status. Our accredited auditors provide independent assurance for various standards and frameworks.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Third-Party Verification', 'Accredited Auditors', 'Compliance Validation', 'Continuous Monitoring']
    }
  ];

  const currentService = services.find(service => service.id === activeService) || services[0];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Service Portfolio</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of professional services designed to meet your organization's unique needs
          </p>
        </div>

        <Tabs value={activeService} onValueChange={setActiveService} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-12 bg-gray-100 p-2 rounded-xl">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="flex flex-col items-center space-y-2 py-4 px-6 rounded-lg transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-md"
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-sm font-medium">{service.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id} className="mt-0">
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-96 lg:h-full overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-12 flex flex-col justify-center">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                          <service.icon className="h-8 w-8 text-blue-600" />
                          <h3 className="text-3xl font-bold text-gray-900">{service.title}</h3>
                        </div>
                        
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {service.description}
                        </p>

                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold text-gray-900">Key Features:</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-gray-600">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Services;
