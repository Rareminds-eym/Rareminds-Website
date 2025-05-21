
// import { useState, useEffect, useRef } from 'react';
// import { Users, MapPin, Mail, Phone } from 'lucide-react';
// import { ClientType, PersonType } from '../types/project';
// import { getAllUniversities, loadCsvData } from '../types/projectsService';
// import { 
//   Carousel, 
//   CarouselContent, 
//   CarouselItem,
//   CarouselPrevious,
//   CarouselNext
// } from '../../components/ui/carousel';
// import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
// import { 
//   Card, 
//   CardHeader, 
//   CardContent, 
//   CardFooter, 
//   CardTitle, 
//   CardDescription 
// } from '../../components/ui/cards';
// import { Badge } from '../../components/ui/badge';

// const ClientsSection = () => {
//   const [universities, setUniversities] = useState<ClientType[]>(getAllUniversities());
//   const carouselApi = useRef<any>(null);
  
//   // Load data from CSV on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await loadCsvData();
//         setUniversities(data);
//       } catch (error) {
//         console.error("Error loading university data:", error);
//       }
//     };
    
//     fetchData();
//   }, []);

//   // Set up automatic carousel advancement
//   useEffect(() => {
//     let interval: ReturnType<typeof setInterval>;
    
//     if (carouselApi.current) {
//       interval = setInterval(() => {
//         carouselApi.current.scrollNext();
//       }, 5000); // Advance every 5 seconds
//     }
    
//     // Cleanup interval on component unmount
//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, [carouselApi.current]);

//   const [selectedUniversity, setSelectedUniversity] = useState<ClientType | null>(null);
//   const [activeTab, setActiveTab] = useState<'faculty' | 'spoc'>('faculty');
  
//   const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     if (value === "all") {
//       setSelectedUniversity(null);
//     } else {
//       const selected = universities.find(uni => uni.id === value);
//       if (selected) {
//         setSelectedUniversity(selected);
//       }
//     }
//   };
  
//   const getPeopleToDisplay = (): PersonType[] => {
//     if (!selectedUniversity) {
//       return universities.flatMap(uni => [...uni.faculty, ...uni.spoc]);
//     }
    
//     return activeTab === 'faculty' ? selectedUniversity.faculty : selectedUniversity.spoc;
//   };
  
//   const people = getPeopleToDisplay();

//   // Function to get initials from name for the avatar fallback
//   const getInitials = (name: string): string => {
//     return name
//       .split(' ')
//       .map(part => part.charAt(0))
//       .join('')
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   // Function to generate a fallback image URL
//   const getFallbackImageUrl = (personId: string, index: number): string => {
//     // Convert the personId to a number if possible, otherwise use the index
//     const idNumber = parseInt(personId, 10) || index;
//     // Determine gender based on a simple algorithm (even/odd)
//     const gender = idNumber % 2 === 0 ? 'men' : 'women';
//     // Get a number between 1 and 70 for the specific image
//     const imageNumber = (idNumber % 70) + 1;
//     return `https://randomuser.me/api/portraits/${gender}/${imageNumber}.jpg`;
//   };

//   // Convert Google Drive link to direct image URL
//   const getImageUrl = (url: string): string => {
//     if (!url) return '';
    
//     // Handle "Passport photo" placeholder
//     if (url.includes('Passport photo')) {
//       return 'https://randomuser.me/api/portraits/lego/1.jpg';
//     }

//     // Check if it's a Google Drive URL
//     if (url.includes('drive.google.com/open?id=')) {
//       const fileId = url.split('id=')[1];
//       return `https://drive.google.com/uc?export=view&id=${fileId}`;
//     }
    
//     return url;
//   };

//   return (
//     <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-2">Our Clients</h2>
//         <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
//         <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
//           Meet the universities and institutions we've partnered with
//         </p>
        
//         <div className="max-w-md mx-auto mt-10">
//           <label htmlFor="university" className="block text-gray-700 font-medium mb-2">
//             Filter by University
//           </label>
//           <select
//             id="university"
//             value={selectedUniversity?.id || "all"}
//             onChange={handleUniversityChange}
//             className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//           >
//             <option value="all">All Universities</option>
//             {universities.map((uni) => (
//               <option key={uni.id} value={uni.id}>
//                 {uni.name}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         {selectedUniversity && (
//           <div className="mt-8">
//             <div className="flex justify-center mb-6">
//               <button
//                 onClick={() => setActiveTab('faculty')}
//                 className={`px-6 py-2 mx-1 rounded transition-colors ${
//                   activeTab === 'faculty'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 Faculty
//               </button>
//               <button
//                 onClick={() => setActiveTab('spoc')}
//                 className={`px-6 py-2 mx-1 rounded transition-colors ${
//                   activeTab === 'spoc'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                 }`}
//               >
//                 SPOC
//               </button>
//             </div>
//           </div>
//         )}
        
//         <div className="mt-10 relative">
//           {people.length > 0 ? (
//             <Carousel 
//               className="w-full" 
//               opts={{ 
//                 loop: true,
//                 align: "start"
//               }}
//               setApi={(api) => {
//                 carouselApi.current = api;
//               }}
//             >
//               <CarouselContent>
//                 {people.map((person, index) => (
//                   <CarouselItem key={person.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
//                     <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-blue-100 h-full">
//                       <div className="relative h-20 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      
//                       <div className="relative px-6 pb-6">
//                         <div className="-mt-12 mb-4">
//                           <Avatar className="w-24 h-24 border-4 border-white ring-2 ring-blue-100 mx-auto">
//                             <AvatarImage 
//                               src={getImageUrl(person.image)} 
//                               alt={person.name} 
//                               className="object-cover"
//                               onError={(e) => {
//                                 // Fallback if image fails to load
//                                 (e.target as HTMLImageElement).src = getFallbackImageUrl(person.id, index);
//                               }}
//                             />
//                             <AvatarFallback className="bg-blue-500 text-white text-xl">
//                               {getInitials(person.name)}
//                             </AvatarFallback>
//                           </Avatar>
//                         </div>
                        
//                         <CardHeader className="text-center p-0 space-y-1">
//                           <CardTitle className="text-xl font-semibold text-blue-700">
//                             {person.name}
//                           </CardTitle>
//                           <CardDescription className="text-gray-600 font-medium">
//                             {person.designation}
//                           </CardDescription>
//                         </CardHeader>
                        
//                         <CardContent className="text-center pt-4 pb-2">
//                           <Badge variant="outline" className="bg-blue-50 text-blue-700 mb-2">
//                             {person.description || 'Research Team'}
//                           </Badge>
                          
//                           {person.universityId && (
//                             <div className="flex items-center justify-center text-gray-500 text-sm mt-2">
//                               <MapPin className="h-3.5 w-3.5 mr-1" />
//                               <span>{
//                                 universities.find(uni => uni.id === person.universityId)?.name || person.universityId
//                               }</span>
//                             </div>
//                           )}
//                         </CardContent>
                        
//                         {person.contact && (
//                           <CardFooter className="justify-center pt-2 pb-0">
//                             <a 
//                               href={`mailto:${person.contact}`} 
//                               className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
//                             >
//                               <Mail className="h-3.5 w-3.5 mr-1.5" />
//                               {person.contact}
//                             </a>
//                           </CardFooter>
//                         )}
//                       </div>
//                     </Card>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//               <div className="flex justify-center gap-3 mt-6">
//                 <CarouselPrevious className="relative inset-0 translate-y-0" />
//                 <CarouselNext className="relative inset-0 translate-y-0" />
//               </div>
//             </Carousel>
//           ) : (
//             <div className="text-center py-12">
//               <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
//               <p className="text-gray-500">No personnel found for the selected filter.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ClientsSection;


import { useState, useEffect, useRef } from 'react';
import { Users, MapPin, Mail } from 'lucide-react';
import { ClientType, PersonType } from '../types/project';
import { getAllUniversities, loadCsvData } from '../types/projectsService';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '../ui/carousel';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter, 
  CardTitle, 
  CardDescription 
} from '../ui/cards';
import { Badge } from '../ui/badge';

const ClientsSection = () => {
  const [universities, setUniversities] = useState<ClientType[]>(getAllUniversities());
  const carouselApi = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load data from CSV on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await loadCsvData();
        setUniversities(data);
      } catch (error) {
        console.error("Error loading university data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Set up automatic carousel advancement
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (carouselApi.current) {
      interval = setInterval(() => {
        carouselApi.current.scrollNext();
      }, 5000); // Advance every 5 seconds
    }
    
    // Cleanup interval on component unmount
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [carouselApi.current]);

  const [selectedUniversity, setSelectedUniversity] = useState<ClientType | null>(null);
  const [activeTab, setActiveTab] = useState<'faculty' | 'spoc'>('faculty');
  
  const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "all") {
      setSelectedUniversity(null);
    } else {
      const selected = universities.find(uni => uni.id === value);
      if (selected) {
        setSelectedUniversity(selected);
      }
    }
  };
  
  const getPeopleToDisplay = (): PersonType[] => {
    if (!selectedUniversity) {
      return universities.flatMap(uni => [...uni.faculty, ...uni.spoc]);
    }
    
    return activeTab === 'faculty' ? selectedUniversity.faculty : selectedUniversity.spoc;
  };
  
  const people = getPeopleToDisplay();

  // Function to get initials from name for the avatar fallback
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Function to generate a fallback image URL
  const getFallbackImageUrl = (personId: string, index: number): string => {
    // Convert the personId to a number if possible, otherwise use the index
    const idNumber = parseInt(personId, 10) || index;
    // Determine gender based on a simple algorithm (even/odd)
    const gender = idNumber % 2 === 0 ? 'men' : 'women';
    // Get a number between 1 and 70 for the specific image
    const imageNumber = (idNumber % 70) + 1;
    return `https://randomuser.me/api/portraits/${gender}/${imageNumber}.jpg`;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Our Clients</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
        {/* <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
          Meet the universities and institutions we've partnered with
        </p> */}
        
        <div className="max-w-md mx-auto mt-10">
          <label htmlFor="university" className="block text-gray-700 font-medium mb-2">
            Filter by University
          </label>
          <select
            id="university"
            value={selectedUniversity?.id || "all"}
            onChange={handleUniversityChange}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="all">All Universities</option>
            {universities.map((uni) => (
              <option key={uni.id} value={uni.id}>
                {uni.name}
              </option>
            ))}
          </select>
        </div>
        
        {selectedUniversity && (
          <div className="mt-8">
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setActiveTab('faculty')}
                className={`px-6 py-2 mx-1 rounded transition-colors ${
                  activeTab === 'faculty'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Faculty
              </button>
              <button
                onClick={() => setActiveTab('spoc')}
                className={`px-6 py-2 mx-1 rounded transition-colors ${
                  activeTab === 'spoc'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                SPOC
              </button>
            </div>
          </div>
        )}
        
        <div className="mt-10 relative">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              </div>
            </div>
          ) : people.length > 0 ? (
            <Carousel 
              className="w-full" 
              opts={{ 
                loop: true,
                align: "start"
              }}
              setApi={(api) => {
                carouselApi.current = api;
              }}
            >
              <CarouselContent>
                {people.map((person, index) => (
                  <CarouselItem key={person.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-blue-100 h-full">
                      <div className="relative h-20 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      
                      <div className="relative px-6 pb-6">
                        <div className="-mt-12 mb-4">
                          <Avatar className="w-24 h-24 border-4 border-white ring-2 ring-blue-100 mx-auto">
                            <AvatarImage 
                              src={person.image} 
                              alt={person.name} 
                              className="object-cover"
                              onError={(e) => {
                                // Fallback if image fails to load
                                (e.target as HTMLImageElement).src = getFallbackImageUrl(person.id, index);
                              }}
                            />
                            <AvatarFallback className="bg-blue-500 text-white text-xl">
                              {getInitials(person.name)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        
                        <CardHeader className="text-center p-0 space-y-1">
                          <CardTitle className="text-xl font-semibold text-blue-700">
                            {person.name}
                          </CardTitle>
                          {/* <CardDescription className="text-gray-600 font-medium">
                            {person.designation}
                          </CardDescription> */}
                        </CardHeader>
                        
                        <CardContent className="text-center pt-4 pb-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 mb-2">
                            {person.description || 'Research Team'}
                          </Badge>
                          
                          {person.universityId && (
                            <div className="flex items-center justify-center text-gray-500 text-sm mt-2">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              <span>{
                                universities.find(uni => uni.id === person.universityId)?.name || person.universityId
                              }</span>
                            </div>
                          )}
                        </CardContent>
                        
                        {/* {person.contact && (
                          <CardFooter className="justify-center pt-2 pb-0">
                            <a 
                              href={`mailto:${person.contact}`} 
                              className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                            >
                              <Mail className="h-3.5 w-3.5 mr-1.5" />
                              {person.contact}
                            </a>
                          </CardFooter>
                        )} */}
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-3 mt-6">
                <CarouselPrevious className="relative inset-0 translate-y-0" />
                <CarouselNext className="relative inset-0 translate-y-0" />
              </div>
            </Carousel>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No personnel found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;