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
    course?: string;
}

export interface CourseStats {
    universities: UniversityStats[];
    total: number;
    course_code: string;
    course_name: string;
}

// Function to fetch MC results from Supabase - ONLY from mc_results table
export async function fetchMcResults(): Promise<College[]> {
    console.log('Fetching MC results from mc_results table...');

    try {
        // Fetch all data from gmp_results table
        const { data, error, count } = await supabase
            .from('mc_results')
            .select('*', { count: 'exact' });

        if (error) {
            console.error('Error fetching Mc results:', error);
            throw error;
        }

        console.log(`MC results query successful. Found ${count} total records.`);

        if (!data || data.length === 0) {
            console.warn('mc_results table is empty.');
            return [];
        }

        // Log first record to see structure
        console.log('Sample MC record:', data[0]);

        // Transform the data to match the expected College interface (DO NOT de-duplicate; keep all rows)
        const results: College[] = data.map((result: any) => {
            // Handle different possible column name variations
            const university = result.University || result.university || result.UNIVERSITY || 'Unknown University';
            const collegeCode = result.college_code || result.College_Code || result.COLLEGE_CODE || result.code || `MC_${Math.random().toString(36).substring(2, 11)}`;
            const collegeName = result.college_name || result.College_Name || result.COLLEGE_NAME || result.name || 'Unknown College';
            const teamName = result.team_name || result.Team_Name || result.TEAM_NAME || result.team || '';
            const id = result.id || result.ID || result.Id || `${collegeCode}_${Math.random().toString(36).substring(2, 8)}`;

            return {
                id,
                college_code: collegeCode,
                college_name: collegeName,
                university: university,
                course_name: 'MC',
                team_name: teamName
            };
        });

        console.log(`Successfully processed ${results.length} MC records (including duplicates) from ${data.length} total records`);
        return results;

    } catch (error) {
        console.error('Error in fetchMcResults:', error);
        throw error;
    }
}

// MC University participation statistics
export const mcStats: CourseStats = {
    course_code: "MC",
    course_name: "Medical Coding",
    total: 3025,
    universities: [
        { name: "BHARATHIAR UNIVERSITY", hl1_attempts: 764 },
        { name: "PERIYAR UNIVERSITY", hl1_attempts: 2261 },
       
    ]
};