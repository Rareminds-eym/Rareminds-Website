import { supabase } from '../../../lib/supabase';

export interface College {
    id: string | number;
    college_code: string;
    college_name: string;
    university: string;
    course_name: string;
    team_name?: string;
}

export interface UniversityStats {
    name: string;
    hl1_attempts: number;
    percentage?: number;
    course?: string;
}

export interface CourseStats {
    universities: UniversityStats[];
    total: number;
    course_code: string;
    course_name: string;
}

// Function to fetch FSQM results from Supabase - ONLY from fsqm_results table
export async function fetchFSQMResults(): Promise<College[]> {
    console.log('Fetching FSQM results from fsqm_results table...');
    
    try {
        // Fetch all data from fsqm_results table
        const { data, error, count } = await supabase
            .from('fsqm_results')
            .select('*', { count: 'exact' });

        if (error) {
            console.error('Error fetching FSQM results:', error);
            throw error;
        }

        console.log(`FSQM results query successful. Found ${count} total records.`);
        
        if (!data || data.length === 0) {
            console.warn('fsqm_results table is empty.');
            return [];
        }

        // Log first record to see structure
        console.log('Sample FSQM record:', data[0]);

        // Transform the data to match the expected College interface (DO NOT de-duplicate; keep all rows)
        const results: College[] = data.map((result: any) => {
            // Handle different possible column name variations
            const university = result.University || result.university || result.UNIVERSITY || 'Unknown University';
            const collegeCode = result.college_code || result.College_Code || result.COLLEGE_CODE || result.code || `FSQM_${Math.random().toString(36).substring(2, 11)}`;
            const collegeName = result.college_name || result.College_Name || result.COLLEGE_NAME || result.name || 'Unknown College';
            const teamName = result.team_name || result.Team_Name || result.TEAM_NAME || result.team || '';
            const id = result.id || result.ID || result.Id || `${collegeCode}_${Math.random().toString(36).substring(2, 8)}`;

            return {
                id,
                college_code: collegeCode,
                college_name: collegeName,
                university: university,
                course_name: 'FSQM',
                team_name: teamName
            };
        });

        console.log(`Successfully processed ${results.length} FSQM records (including duplicates) from ${data.length} total records`);
        return results;
        
    } catch (error) {
        console.error('Error in fetchFSQMResults:', error);
        throw error;
    }
}

// FSQM University participation statistics
export const fsqmStats: CourseStats = {
    course_code: "FSQM",
    course_name: "Food Safety & Quality Manufacturing",
    total: 4108,
    universities: [
        { name: "ALAGAPPA UNIVERSITY", hl1_attempts: 304, percentage: 70 },
        { name: "ANNAMALAI UNIVERSITY", hl1_attempts: 432, percentage: 70 },
        { name: "BHARATHIAR UNIVERSITY", hl1_attempts: 185, percentage: 70 },
        { name: "BHARATHIDASAN UNIVERSITY", hl1_attempts: 642, percentage: 70 },
        { name: "MADURAI KAMARAJ UNIVERSITY", hl1_attempts: 42, percentage: 70 },
        { name: "MANONMANIAM SUNDARANAR UNIVERSITY", hl1_attempts: 386, percentage: 70 },
        { name: "MOTHER TERESA UNIVERSITY", hl1_attempts: 66, percentage: 70 },
        { name: "PERIYAR UNIVERSITY", hl1_attempts: 905, percentage: 70 },
        { name: "THIRUVALLUVAR UNIVERSITY", hl1_attempts: 749, percentage: 70 },
        { name: "UNIVERSITY OF MADRAS", hl1_attempts: 398, percentage: 70 },
    ]
};
