export interface EventLocation {
    id: string;
    name: string;
    type: 'hackathon' | 'workshop' | 'training'; // Make sure this is a string literal type
    date: string;
    location: string;
    participants: number;
    description: string;
    latitude: number;
    longitude: number;
    highlights: string[];
    images: string[];
  }
  
  // Dummy data for EventLocation
  export const eventLocations: EventLocation[] = [
    {
      id: '1',
      name: 'Tech Hackathon 2024',
      type: 'hackathon', // Ensure this matches one of the allowed types
      date: '2024-03-15',
      location: 'Chennai, India',
      participants: 200,
      description: 'A hackathon event to solve tech challenges.',
      latitude: 13.0827,
      longitude: 80.2707,
      highlights: ['Coding Challenge', 'Teamwork', 'Networking'],
      images: ['image1.jpg', 'image2.jpg'],
    },
    {
      id: '2',
      name: 'AI Workshop 2024',
      type: 'workshop', // Ensure this matches one of the allowed types
      date: '2024-04-12',
      location: 'Bangalore, India',
      participants: 100,
      description: 'Workshop on Artificial Intelligence and its applications.',
      latitude: 12.9716,
      longitude: 77.5946,
      highlights: ['AI Algorithms', 'Practical Applications'],
      images: ['ai_workshop1.jpg', 'ai_workshop2.jpg'],
    },
    {
      id: '3',
      name: 'Cybersecurity Training 2024',
      type: 'training', // Ensure this matches one of the allowed types
      date: '2024-05-10',
      location: 'Mumbai, India',
      participants: 150,
      description: 'Training program focused on enhancing cybersecurity skills.',
      latitude: 19.0760,
      longitude: 72.8777,
      highlights: ['Security Tools', 'Vulnerability Assessment'],
      images: ['cybersecurity1.jpg', 'cybersecurity2.jpg'],
    },
    {
      id: '4',
      name: 'Blockchain Hackathon 2024',
      type: 'hackathon', // Ensure this matches one of the allowed types
      date: '2024-06-20',
      location: 'Delhi, India',
      participants: 250,
      description: 'Hackathon focused on blockchain technology.',
      latitude: 28.6139,
      longitude: 77.2090,
      highlights: ['Blockchain Solutions', 'Smart Contracts'],
      images: ['blockchain1.jpg', 'blockchain2.jpg'],
    },
    {
      id: '5',
      name: 'Data Science Workshop 2024',
      type: 'workshop', // Ensure this matches one of the allowed types
      date: '2024-07-15',
      location: 'Kochi, India',
      participants: 80,
      description: 'Hands-on workshop on data science and analytics.',
      latitude: 9.9312,
      longitude: 76.2673,
      highlights: ['Machine Learning', 'Data Analysis'],
      images: ['data_science1.jpg', 'data_science2.jpg'],
    },
    {
      id: '6',
      name: 'Cloud Computing Training 2024',
      type: 'training', // Ensure this matches one of the allowed types
      date: '2024-08-10',
      location: 'Hyderabad, India',
      participants: 120,
      description: 'Training program on cloud computing technologies.',
      latitude: 17.3850,
      longitude: 78.4867,
      highlights: ['AWS', 'Azure', 'GCP'],
      images: ['cloud_computing1.jpg', 'cloud_computing2.jpg'],
    },
    {
      id: '7',
      name: 'IoT Hackathon 2024',
      type: 'hackathon', // Ensure this matches one of the allowed types
      date: '2024-09-05',
      location: 'Pune, India',
      participants: 180,
      description: 'A hackathon focused on Internet of Things solutions.',
      latitude: 18.5204,
      longitude: 73.8567,
      highlights: ['Smart Devices', 'Automation'],
      images: ['iot_hackathon1.jpg', 'iot_hackathon2.jpg'],
    },
    {
      id: '8',
      name: 'Web Development Training 2024',
      type: 'training', // Ensure this matches one of the allowed types
      date: '2024-10-25',
      location: 'Chennai, India',
      participants: 100,
      description: 'Training program on modern web development practices.',
      latitude: 13.0827,
      longitude: 80.2707,
      highlights: ['Frontend Development', 'Backend Development'],
      images: ['web_dev1.jpg', 'web_dev2.jpg'],
    },
    {
      id: '9',
      name: 'Machine Learning Workshop 2024',
      type: 'workshop', // Ensure this matches one of the allowed types
      date: '2024-11-12',
      location: 'Jaipur, India',
      participants: 90,
      description: 'Workshop on machine learning algorithms and their applications.',
      latitude: 26.9124,
      longitude: 75.7873,
      highlights: ['Supervised Learning', 'Deep Learning'],
      images: ['ml_workshop1.jpg', 'ml_workshop2.jpg'],
    },
    {
      id: '10',
      name: 'Tech Innovations Hackathon 2024',
      type: 'hackathon', // Ensure this matches one of the allowed types
      date: '2024-12-05',
      location: 'Kolkata, India',
      participants: 300,
      description: 'Hackathon focused on solving real-world problems with technology.',
      latitude: 22.5726,
      longitude: 88.3639,
      highlights: ['Innovative Solutions', 'Tech Challenges'],
      images: ['tech_hackathon1.jpg', 'tech_hackathon2.jpg'],
    },
  ];
  