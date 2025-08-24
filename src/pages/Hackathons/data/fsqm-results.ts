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
    qualified_level1?: number;
    percentage?: number;
    course?: string;
}

export interface CourseStats {
    universities: UniversityStats[];
    total: number;
    total_qualified_level1?: number;
    course_code: string;
    course_name: string;
}

// Function to fetch FSQM results from Supabase - ONLY from fsqm_results table
export async function fetchFSQMResults(): Promise<College[]> {
    console.log('Fetching FSQM results from fsqm_results table...');
    
    try {
        // First, get the total count
        const { count, error: countError } = await supabase
            .from('fsqm_results')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.error('Error getting FSQM results count:', countError);
            throw countError;
        }

        console.log(`FSQM results count query successful. Found ${count} total records.`);
        
        if (!count || count === 0) {
            console.warn('fsqm_results table is empty.');
            return [];
        }

        // Fetch all data in batches (Supabase has a limit of 1000 records per query)
        const batchSize = 1000;
        const batches = Math.ceil(count / batchSize);
        const allData: any[] = [];

        console.log(`Fetching ${count} records in ${batches} batches of ${batchSize} each...`);

        for (let i = 0; i < batches; i++) {
            const startRange = i * batchSize;
            const endRange = Math.min(startRange + batchSize - 1, count - 1);
            
            console.log(`Fetching batch ${i + 1}/${batches}: records ${startRange} to ${endRange}`);
            
            const { data: batchData, error: batchError } = await supabase
                .from('fsqm_results')
                .select('*')
                .range(startRange, endRange);

            if (batchError) {
                console.error(`Error fetching FSQM results batch ${i + 1}:`, batchError);
                throw batchError;
            }

            if (batchData) {
                allData.push(...batchData);
                console.log(`Batch ${i + 1} fetched: ${batchData.length} records`);
            }
        }

        console.log(`Successfully fetched ${allData.length} out of ${count} total FSQM records.`);
        
        if (allData.length === 0) {
            console.warn('fsqm_results table returned no data.');
            return [];
        }

        // Log first record to see structure
        console.log('Sample FSQM record:', allData[0]);

        // Transform the data to match the expected College interface (DO NOT de-duplicate; keep all rows)
        const results: College[] = allData.map((result: any) => {
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

        console.log(`Successfully processed ${results.length} FSQM records (including duplicates) from ${allData.length} total records`);
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
    total_qualified_level1:1890,
    universities: [
        { name: "ALAGAPPA UNIVERSITY", hl1_attempts: 304,qualified_level1:72, percentage: 70 },
        { name: "ANNAMALAI UNIVERSITY", hl1_attempts: 432,qualified_level1:130, percentage: 70 },
        { name: "BHARATHIAR UNIVERSITY", hl1_attempts: 185,qualified_level1:127, percentage: 70 },
        { name: "BHARATHIDASAN UNIVERSITY", hl1_attempts: 642,qualified_level1:302, percentage: 70 },
        { name: "MADURAI KAMARAJ UNIVERSITY", hl1_attempts: 42,qualified_level1:35, percentage: 70 },
        { name: "MANONMANIAM SUNDARANAR UNIVERSITY", hl1_attempts: 386,qualified_level1:213, percentage: 70 },
        { name: "MOTHER TERESA UNIVERSITY", hl1_attempts: 66,qualified_level1:40, percentage: 70 },
        { name: "PERIYAR UNIVERSITY", hl1_attempts: 905,qualified_level1:431, percentage: 70 },
        { name: "THIRUVALLUVAR UNIVERSITY", hl1_attempts: 749,qualified_level1:331, percentage: 70 },
        { name: "UNIVERSITY OF MADRAS", hl1_attempts: 398,qualified_level1:209, percentage: 70 },
    ]
};