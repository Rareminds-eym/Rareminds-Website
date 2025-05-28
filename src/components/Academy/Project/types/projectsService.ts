// import { ClientType, PersonType } from '../types/project';
// import Papa from 'papaparse';

// // This function simulates loading from CSV in a real application
// export const getAllUniversities = (): ClientType[] => {
//   // Default data
//   const people: PersonType[] = [
//     // TVU
//     {
//         id: "1",
//         name: "Dr. Rajesh Kumar",
//         designation: "Professor",
//         contact: "rajesh.kumar@tvu.edu",
//         image: "https://drive.google.com/uc?export=view&id=1_6XoAbr12ra99Pufx-ChDFns_JMrWwWs",
//         universityId: "TVU"
//       }      ,
//     {
//       id: "2",
//       name: "Dr. Priya Singh",
//       designation: "Associate Professor",
//       contact: "priya.singh@tvu.edu",
//       image: "https://randomuser.me/api/portraits/women/1.jpg",
//       universityId: "TVU"
//     },
//     {
//       id: "3",
//       name: "Vikram Mehta",
//       designation: "SPOC Coordinator",
//       contact: "vikram.mehta@tvu.edu",
//       image: "https://randomuser.me/api/portraits/men/2.jpg",
//       universityId: "TVU"
//     },
//     // ANM
//     {
//       id: "4",
//       name: "Dr. Sanjay Patel",
//       designation: "Professor",
//       contact: "sanjay.patel@anm.edu",
//       image: "https://randomuser.me/api/portraits/men/3.jpg",
//       universityId: "ANM"
//     },
//     {
//       id: "5",
//       name: "Dr. Anita Sharma",
//       designation: "Assistant Professor",
//       contact: "anita.sharma@anm.edu",
//       image: "https://randomuser.me/api/portraits/women/2.jpg",
//       universityId: "ANM"
//     },
//     {
//       id: "6",
//       name: "Ravi Verma",
//       designation: "SPOC Admin",
//       contact: "ravi.verma@anm.edu",
//       image: "https://randomuser.me/api/portraits/men/4.jpg",
//       universityId: "ANM"
//     },
//     // MKU
//     {
//       id: "7",
//       name: "Dr. Divya Gupta",
//       designation: "Professor",
//       contact: "divya.gupta@mku.edu",
//       image: "https://randomuser.me/api/portraits/women/3.jpg",
//       universityId: "MKU"
//     },
//     {
//       id: "8",
//       name: "Dr. Arjun Reddy",
//       designation: "Associate Professor",
//       contact: "arjun.reddy@mku.edu",
//       image: "https://randomuser.me/api/portraits/men/5.jpg",
//       universityId: "MKU"
//     },
//     {
//       id: "9",
//       name: "Neha Choudhury",
//       designation: "SPOC Manager",
//       contact: "neha.choudhury@mku.edu",
//       image: "https://randomuser.me/api/portraits/women/4.jpg",
//       universityId: "MKU"
//     },
//     // ALU
//     {
//       id: "10",
//       name: "Dr. Ramesh Iyer",
//       designation: "Professor",
//       contact: "ramesh.iyer@alu.edu",
//       image: "https://randomuser.me/api/portraits/men/6.jpg",
//       universityId: "ALU"
//     },
//     {
//       id: "11",
//       name: "Dr. Meena Kapoor",
//       designation: "Associate Professor",
//       contact: "meena.kapoor@alu.edu",
//       image: "https://randomuser.me/api/portraits/women/5.jpg",
//       universityId: "ALU"
//     },
//     {
//       id: "12",
//       name: "Ajay Kumar",
//       designation: "SPOC Coordinator",
//       contact: "ajay.kumar@alu.edu",
//       image: "https://randomuser.me/api/portraits/men/7.jpg",
//       universityId: "ALU"
//     },
//     // BDU
//     {
//       id: "13",
//       name: "Dr. Sunil Menon",
//       designation: "Professor",
//       contact: "sunil.menon@bdu.edu",
//       image: "https://randomuser.me/api/portraits/men/8.jpg",
//       universityId: "BDU"
//     },
//     {
//       id: "14",
//       name: "Dr. Kavita Nair",
//       designation: "Assistant Professor",
//       contact: "kavita.nair@bdu.edu",
//       image: "https://randomuser.me/api/portraits/women/6.jpg",
//       universityId: "BDU"
//     },
//     {
//       id: "15",
//       name: "Rohit Sharma",
//       designation: "SPOC Admin",
//       contact: "rohit.sharma@bdu.edu",
//       image: "https://randomuser.me/api/portraits/men/9.jpg",
//       universityId: "BDU"
//     },
//     // BRU
//     {
//       id: "16",
//       name: "Dr. Prakash Joshi",
//       designation: "Professor",
//       contact: "prakash.joshi@bru.edu",
//       image: "https://randomuser.me/api/portraits/men/10.jpg",
//       universityId: "BRU"
//     },
//     {
//       id: "17",
//       name: "Dr. Sunita Mishra",
//       designation: "Associate Professor",
//       contact: "sunita.mishra@bru.edu",
//       image: "https://randomuser.me/api/portraits/women/7.jpg",
//       universityId: "BRU"
//     },
//     {
//       id: "18",
//       name: "Alok Patel",
//       designation: "SPOC Manager",
//       contact: "alok.patel@bru.edu",
//       image: "https://randomuser.me/api/portraits/men/11.jpg",
//       universityId: "BRU"
//     },
//     // MSU
//     {
//       id: "19",
//       name: "Dr. Mohan Das",
//       designation: "Professor",
//       contact: "mohan.das@msu.edu",
//       image: "https://randomuser.me/api/portraits/men/12.jpg",
//       universityId: "MSU"
//     },
//     {
//       id: "20",
//       name: "Dr. Rekha Pillai",
//       designation: "Associate Professor",
//       contact: "rekha.pillai@msu.edu",
//       image: "https://randomuser.me/api/portraits/women/8.jpg",
//       universityId: "MSU"
//     },
//     {
//       id: "21",
//       name: "Anil Kumar",
//       designation: "SPOC Coordinator",
//       contact: "anil.kumar@msu.edu",
//       image: "https://randomuser.me/api/portraits/men/13.jpg",
//       universityId: "MSU"
//     },
//   ];

//   // Group universities
//   const universities: ClientType[] = [
//     { id: "TVU", name: "TVU", faculty: [], spoc: [] },
//     { id: "ANM", name: "ANM", faculty: [], spoc: [] },
//     { id: "MKU", name: "MKU & MTU", faculty: [], spoc: [] },
//     { id: "ALU", name: "ALU", faculty: [], spoc: [] },
//     { id: "BDU", name: "BDU", faculty: [], spoc: [] },
//     { id: "BRU", name: "BRU", faculty: [], spoc: [] },
//     { id: "MSU", name: "MSU", faculty: [], spoc: [] }
//   ];

//   // Distribute people into appropriate university and role
//   people.forEach(person => {
//     const university = universities.find(u => u.id === person.universityId);
//     if (university) {
//       if (person.designation.includes("SPOC") || person.designation.includes("Admin") || person.designation.includes("Manager") || person.designation.includes("Coordinator")) {
//         university.spoc.push(person);
//       } else {
//         university.faculty.push(person);
//       }
//     }
//   });

//   return universities;
// };

// export const loadCsvData = async (): Promise<ClientType[]> => {
//   try {
//     const response = await fetch('/data/trainer.csv');
//     const csvText = await response.text();
    
//     const result = Papa.parse(csvText, {
//       header: true,
//       skipEmptyLines: true
//     });
    
//     if (result.errors.length > 0) {
//       console.error('CSV parsing errors:', result.errors);
//       return getAllUniversities(); // Fallback to hardcoded data
//     }
    
//     // Process the CSV data with new format
//     const people = (result.data as any[]).map((row, index) => {
//       // Handle Google Drive links by creating a direct image URL or using a placeholder
//       let imageUrl = row.image;
      
//       if (imageUrl && imageUrl.includes('drive.google.com/open')) {
//         // Extract the ID from Google Drive link
//         const fileId = imageUrl.split('id=')[1];
//         // Convert to direct image URL
//         if (fileId) {
//           imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
//         } else {
//           // Fallback to placeholder if can't extract ID
//           imageUrl = `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index % 70 + 1}.jpg`;
//         }
//       } else if (!imageUrl || imageUrl === 'Passport photo  - kamali Sk') {
//         // Use placeholder for missing images or description-based images
//         imageUrl = `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index % 70 + 1}.jpg`;
//       }

//       return {
//         id: String(index + 1),
//         name: row.Name || 'Unknown',
//         designation: row.Description || 'Student',
//         image: imageUrl,
//         universityId: row.Univeristy || 'TVU',
//         description: row.Description || ''
//       } as PersonType;
//     });
    
//     // Group by university
//     const universities: ClientType[] = [
//       { id: "TVU", name: "TVU", faculty: [], spoc: [] },
//       { id: "ANM", name: "ANM", faculty: [], spoc: [] },
//       { id: "MKU", name: "MKU & MTU", faculty: [], spoc: [] },
//       { id: "ALU", name: "ALU", faculty: [], spoc: [] },
//       { id: "BDU", name: "BDU", faculty: [], spoc: [] },
//       { id: "BRU", name: "BRU", faculty: [], spoc: [] },
//       { id: "MSU", name: "MSU", faculty: [], spoc: [] }
//     ];
    
//     // In this format, we'll consider all as faculty since there's no SPOC designation
//     people.forEach(person => {
//       const university = universities.find(u => u.id === person.universityId);
//       if (university) {
//         university.faculty.push(person);
//       }
//     });
    
//     return universities;
//   } catch (error) {
//     console.error('Error loading CSV data:', error);
//     return getAllUniversities(); // Fallback to hardcoded data
//   }
// };
import { ClientType, PersonType } from '../types/project';
import Papa from 'papaparse';

// This function simulates loading from CSV in a real application
export const getAllUniversities = (): ClientType[] => {
  // Default data
  const people: PersonType[] = [
    // TVU
    {
        id: "1",
        name: "Dr. karthik",
        designation: "Professor",
        contact: "rajesh.kumar@tvu.edu",
        image: "https://drive.google.com/uc?export=view&id=1_6XoAbr12ra99Pufx-ChDFns_JMrWwWs",
        universityId: "TVU"
      }      ,
    {
      id: "2",
      name: "Dr. Priya Singh",
      designation: "Associate Professor",
      contact: "priya.singh@tvu.edu",
      image: "",
      universityId: "TVU"
    },
    {
      id: "3",
      name: "Vikram Mehta",
      designation: "SPOC Coordinator",
      contact: "vikram.mehta@tvu.edu",
      image: "",
      universityId: "TVU"
    },
    // ANM
    {
      id: "4",
      name: "Dr. Sanjay Patel",
      designation: "Professor",
      contact: "sanjay.patel@anm.edu",
      image: "",
      universityId: "ANM"
    },
    {
      id: "5",
      name: "Dr. Anita Sharma",
      designation: "Assistant Professor",
      contact: "anita.sharma@anm.edu",
      image: "",
      universityId: "ANM"
    },
    {
      id: "6",
      name: "Ravi Verma",
      designation: "SPOC Admin",
      contact: "ravi.verma@anm.edu",
      image: "",
      universityId: "ANM"
    },
    // MKU
    {
      id: "7",
      name: "Dr. Divya Gupta",
      designation: "Professor",
      contact: "divya.gupta@mku.edu",
      image: "",
      universityId: "MKU"
    },
    {
      id: "8",
      name: "Dr. Arjun Reddy",
      designation: "Associate Professor",
      contact: "arjun.reddy@mku.edu",
      image: "",
      universityId: "MKU"
    },
    {
      id: "9",
      name: "Neha Choudhury",
      designation: "SPOC Manager",
      contact: "neha.choudhury@mku.edu",
      image: "",
      universityId: "MKU"
    },
    // ALU
    {
      id: "10",
      name: "Dr. Ramesh Iyer",
      designation: "Professor",
      contact: "ramesh.iyer@alu.edu",
      image: "",
      universityId: "ALU"
    },
    {
      id: "11",
      name: "Dr. Meena Kapoor",
      designation: "Associate Professor",
      contact: "meena.kapoor@alu.edu",
      image: "",
      universityId: "ALU"
    },
    {
      id: "12",
      name: "Ajay Kumar",
      designation: "SPOC Coordinator",
      contact: "ajay.kumar@alu.edu",
      image: "",
      universityId: "ALU"
    },
    // BDU
    {
      id: "13",
      name: "Dr. Sunil Menon",
      designation: "Professor",
      contact: "sunil.menon@bdu.edu",
      image: "",
      universityId: "BDU"
    },
    {
      id: "14",
      name: "Dr. Kavita Nair",
      designation: "Assistant Professor",
      contact: "kavita.nair@bdu.edu",
      image: "",
      universityId: "BDU"
    },
    {
      id: "15",
      name: "Rohit Sharma",
      designation: "SPOC Admin",
      contact: "rohit.sharma@bdu.edu",
      image: "",
      universityId: "BDU"
    },
    // BRU
    {
      id: "16",
      name: "Dr. Prakash Joshi",
      designation: "Professor",
      contact: "prakash.joshi@bru.edu",
      image: "",
      universityId: "BRU"
    },
    {
      id: "17",
      name: "Dr. Sunita Mishra",
      designation: "Associate Professor",
      contact: "sunita.mishra@bru.edu",
      image: "",
      universityId: "BRU"
    },
    {
      id: "18",
      name: "Alok Patel",
      designation: "SPOC Manager",
      contact: "alok.patel@bru.edu",
      image: "",
      universityId: "BRU"
    },
    // MSU
    {
      id: "19",
      name: "Dr. Mohan Das",
      designation: "Professor",
      contact: "mohan.das@msu.edu",
      image: "",
      universityId: "MSU"
    },
    {
      id: "20",
      name: "Dr. Rekha Pillai",
      designation: "Associate Professor",
      contact: "rekha.pillai@msu.edu",
      image: "",
      universityId: "MSU"
    },
    {
      id: "21",
      name: "Anil Kumar",
      designation: "SPOC Coordinator",
      contact: "anil.kumar@msu.edu",
      image: "",
      universityId: "MSU"
    },
  ];

  // Group universities
  const universities: ClientType[] = [
    { id: "TVU", name: "TVU", faculty: [], spoc: [] },
    { id: "ANM", name: "ANM", faculty: [], spoc: [] },
    { id: "MKU & MTU", name: "MKU & MTU", faculty: [], spoc: [] },
    { id: "ALU", name: "ALU", faculty: [], spoc: [] },
    { id: "BDU", name: "BDU", faculty: [], spoc: [] },
    { id: "BRU", name: "BRU", faculty: [], spoc: [] },
    { id: "MSU", name: "MSU", faculty: [], spoc: [] },
    { id: "PU", name: "PU", faculty: [], spoc: [] }
  ];

  // Distribute people into appropriate university and role
  people.forEach(person => {
    const university = universities.find(u => u.id === person.universityId);
    if (university) {
      if (person.designation.includes("SPOC") || person.designation.includes("Admin") || person.designation.includes("Manager") || person.designation.includes("Coordinator")) {
        university.spoc.push(person);
      } else {
        university.faculty.push(person);
      }
    }
  });

  return universities;
};

export const loadCsvData = async (): Promise<ClientType[]> => {
  try {
    const response = await fetch('/src/data/trainer.csv');
    const csvText = await response.text();
    
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    });
    
    if (result.errors.length > 0) {
      console.error('CSV parsing errors:', result.errors);
      return getAllUniversities(); // Fallback to hardcoded data
    }
    
    // Process the CSV data with new format
    const people = (result.data as any[]).map((row, index) => {
      // Handle Google Drive links by creating a direct image URL or using a placeholder
      let imageUrl = row.image;
      
      if (imageUrl && imageUrl.includes('drive.google.com/open?id=')) {
        // Extract the ID from Google Drive link
        const fileId = imageUrl.split('id=')[1];
        // Convert to direct image URL - use a different format that works better
        if (fileId) {
          imageUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
        } else {
          // Fallback to placeholder if can't extract ID
          imageUrl = `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index % 70 + 1}.jpg`;
        }
      } else if (!imageUrl || imageUrl === 'Passport photo  - kamali Sk') {
        // Use placeholder for missing images or description-based images
        imageUrl = `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index % 70 + 1}.jpg`;
      }

      return {
        id: String(index + 1),
        name: row.Name || 'Unknown',
        designation: 'Researcher', // Default role
        contact: `${row.Name?.toLowerCase().replace(/\s+/g, '.')}@${row.Univeristy?.toLowerCase() || 'tvu'}.edu` || '',
        image: imageUrl,
        universityId: row.Univeristy || 'TVU',
        description: row.Description || ''
      } as PersonType;
    });
    
    // Group by university
    const universities: ClientType[] = [
      { id: "TVU", name: "TVU", faculty: [], spoc: [] },
      { id: "ANM", name: "ANM", faculty: [], spoc: [] },
      { id: "MKU & MTU", name: "MKU & MTU", faculty: [], spoc: [] },
      { id: "ALU", name: "ALU", faculty: [], spoc: [] },
      { id: "BDU", name: "BDU", faculty: [], spoc: [] },
      { id: "BRU", name: "BRU", faculty: [], spoc: [] },
      { id: "MSU", name: "MSU", faculty: [], spoc: [] },
      { id: "PU", name: "PU", faculty: [], spoc: [] }
    ];
    
    // In this format, we'll consider all as faculty since there's no SPOC designation
    people.forEach(person => {
      const university = universities.find(u => u.id === person.universityId);
      if (university) {
        university.faculty.push(person);
      }
    });
    
    return universities;
  } catch (error) {
    console.error('Error loading CSV data:', error);
    return getAllUniversities(); // Fallback to hardcoded data
  }
};