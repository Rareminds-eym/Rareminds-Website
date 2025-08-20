import { supabase, type GmpResult } from '../../../lib/supabase';

export interface College {
    college_code: string;
    college_name: string;
    university: string;
    course_name: string;
    team_name?: string;
}

export interface UniversityStats {
    name: string;
    hl1_attempts: number;
    course?: string;
}

export interface CourseStats {
    universities: UniversityStats[];
    total: number;
    course_code: string;
    course_name: string;
}

// Function to fetch GMP results from Supabase - ONLY from gmp_results table
export async function fetchGmpResults(): Promise<College[]> {
    console.log('Fetching GMP results from gmp_results table...');
    
    try {
        // Fetch all data from gmp_results table
        const { data, error, count } = await supabase
            .from('gmp_results')
            .select('*', { count: 'exact' });

        if (error) {
            console.error('Error fetching GMP results:', error);
            throw error;
        }

        console.log(`GMP results query successful. Found ${count} total records.`);
        
        if (!data || data.length === 0) {
            console.warn('gmp_results table is empty.');
            return [];
        }

        // Log first record to see structure
        console.log('Sample GMP record:', data[0]);

        // Transform the data to match the expected College interface (DO NOT de-duplicate; keep all rows)
        const results: College[] = data.map((result: any) => {
            // Handle different possible column name variations
            const university = result.University || result.university || result.UNIVERSITY || 'Unknown University';
            const collegeCode = result.college_code || result.College_Code || result.COLLEGE_CODE || result.code || `GMP_${Math.random().toString(36).substring(2, 11)}`;
            const collegeName = result.college_name || result.College_Name || result.COLLEGE_NAME || result.name || 'Unknown College';
            const teamName = result.team_name || result.Team_Name || result.TEAM_NAME || result.team || '';

            return {
                college_code: collegeCode,
                college_name: collegeName,
                university: university,
                course_name: 'GMP',
                team_name: teamName
            };
        });

        console.log(`Successfully processed ${results.length} GMP records (including duplicates) from ${data.length} total records`);
        return results;
        
    } catch (error) {
        console.error('Error in fetchGmpResults:', error);
        throw error;
    }
}

// GMP University participation statistics
export const gmpStats: CourseStats = {
    course_code: "GMP",
    course_name: "Good Manufacturing Practice",
    total: 4155,
    universities: [
        { name: "ALAGAPPA UNIVERSITY", hl1_attempts: 483 },
        { name: "BHARATHIAR UNIVERSITY", hl1_attempts: 323 },
        { name: "MADURAI KAMARAJ UNIVERSITY", hl1_attempts: 526 },
        { name: "MANONMANIAM SUNDARANAR UNIVERSITY", hl1_attempts: 844 },
        { name: "MOTHER TERESA UNIVERSITY", hl1_attempts: 208 },
        { name: "PERIYAR UNIVERSITY", hl1_attempts: 1771 }
    ]
};