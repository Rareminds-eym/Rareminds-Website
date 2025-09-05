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

<<<<<<< HEAD
=======
// Function to fetch MC Winners from Supabase - ONLY from mc_winners table
export async function fetchMCWinners(): Promise<College[]> {
    console.log('Fetching MC Winners from mc_winners table...');
    
    try {
        // First, get the total count
        const { count, error: countError } = await supabase
            .from('mc_winners')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.error('Error getting MC Winners count:', countError);
            throw countError;
        }

        console.log(`MC Winners count query successful. Found ${count} total records.`);
        
        if (!count || count === 0) {
            console.warn('mc_winners table is empty.');
            return [];
        }

        // Fetch all data in batches (Supabase has a limit of 1000 records per query)
        const batchSize = 1000;
        const batches = Math.ceil(count / batchSize);
        const allData: any[] = [];

        console.log(`Fetching ${count} winner records in ${batches} batches of ${batchSize} each...`);

        for (let i = 0; i < batches; i++) {
            const startRange = i * batchSize;
            const endRange = Math.min(startRange + batchSize - 1, count - 1);
            
            console.log(`Fetching winners batch ${i + 1}/${batches}: records ${startRange} to ${endRange}`);
            
            const { data: batchData, error: batchError } = await supabase
                .from('mc_winners')
                .select('*')
                .range(startRange, endRange);

            if (batchError) {
                console.error(`Error fetching MC Winners batch ${i + 1}:`, batchError);
                throw batchError;
            }

            if (batchData) {
                allData.push(...batchData);
                console.log(`Winners batch ${i + 1} fetched: ${batchData.length} records`);
            }
        }

        console.log(`Successfully fetched ${allData.length} out of ${count} total MC Winners.`);
        
        if (allData.length === 0) {
            console.warn('mc_winners table returned no data.');
            return [];
        }

        // Log first record to see structure
        console.log('Sample MC Winner record:', allData[0]);

        // Transform the data to match the expected College interface
        const results: College[] = allData.map((result: any) => {
            // Handle different possible column name variations
            const university = result.University || result.university || result.UNIVERSITY || 'Unknown University';
            const collegeCode = result.college_code || result.College_Code || result.COLLEGE_CODE || result.code || `MC_WINNER_${Math.random().toString(36).substring(2, 11)}`;
            const collegeName = result.college_name || result.College_Name || result.COLLEGE_NAME || result.name || 'Unknown College';
            const teamName = result.team_name || result.Team_Name || result.TEAM_NAME || result.team || '';
            const id = result.id || result.ID || result.Id || `${collegeCode}_winner_${Math.random().toString(36).substring(2, 8)}`;

            return {
                id,
                college_code: collegeCode?.toUpperCase() || collegeCode,
                college_name: collegeName,
                university: university,
                course_name: 'MC',
                team_name: teamName
            };
        });

        console.log(`Successfully processed ${results.length} MC Winners from ${allData.length} total records`);
        return results;
        
    } catch (error) {
        console.error('Error in fetchMCWinners:', error);
        throw error;
    }
}

// Function to fetch MC Level 2 results from Supabase - ONLY from mc_h2_results table
export async function fetchMCLevel2Results(): Promise<College[]> {
    console.log('Fetching MC Level 2 results from mc_h2_results table...');
    
    try {
        // First, get the total count
        const { count, error: countError } = await supabase
            .from('mc_h2_results')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.error('Error getting MC Level 2 results count:', countError);
            throw countError;
        }

        console.log(`MC Level 2 results count query successful. Found ${count} total records.`);
        
        if (!count || count === 0) {
            console.warn('mc_h2_results table is empty.');
            return [];
        }

        // Fetch all data in batches (Supabase has a limit of 1000 records per query)
        const batchSize = 1000;
        const batches = Math.ceil(count / batchSize);
        const allData: any[] = [];

        console.log(`Fetching ${count} Level 2 records in ${batches} batches of ${batchSize} each...`);

        for (let i = 0; i < batches; i++) {
            const startRange = i * batchSize;
            const endRange = Math.min(startRange + batchSize - 1, count - 1);
            
            console.log(`Fetching Level 2 batch ${i + 1}/${batches}: records ${startRange} to ${endRange}`);
            
            const { data: batchData, error: batchError } = await supabase
                .from('mc_h2_results')
                .select('*')
                .range(startRange, endRange);

            if (batchError) {
                console.error(`Error fetching MC Level 2 results batch ${i + 1}:`, batchError);
                throw batchError;
            }

            if (batchData) {
                allData.push(...batchData);
                console.log(`Level 2 batch ${i + 1} fetched: ${batchData.length} records`);
            }
        }

        console.log(`Successfully fetched ${allData.length} out of ${count} total MC Level 2 records.`);
        
        if (allData.length === 0) {
            console.warn('mc_h2_results table returned no data.');
            return [];
        }

        // Log first record to see structure
        console.log('Sample MC Level 2 record:', allData[0]);

        // Transform the data to match the expected College interface (DO NOT de-duplicate; keep all rows)
        const results: College[] = allData.map((result: any) => {
            // Handle different possible column name variations
            const university = result.University || result.university || result.UNIVERSITY || 'Unknown University';
            const collegeCode = result.college_code || result.College_Code || result.COLLEGE_CODE || result.code || `MC_H2_${Math.random().toString(36).substring(2, 11)}`;
            const collegeName = result.college_name || result.College_Name || result.COLLEGE_NAME || result.name || 'Unknown College';
            const teamName = result.team_name || result.Team_Name || result.TEAM_NAME || result.team || '';
            const id = result.id || result.ID || result.Id || `${collegeCode}_${Math.random().toString(36).substring(2, 8)}`;

            return {
                id,
                college_code: collegeCode?.toUpperCase() || collegeCode,
                college_name: collegeName,
                university: university,
                course_name: 'MC',
                team_name: teamName
            };
        });

        console.log(`Successfully processed ${results.length} MC Level 2 records (including duplicates) from ${allData.length} total records`);
        return results;
        
    } catch (error) {
        console.error('Error in fetchMCLevel2Results:', error);
        throw error;
    }
}

>>>>>>> d7b0777 (Adding Winners)
// Function to fetch MC results from Supabase - ONLY from mc_results table
export async function fetchMcResults(): Promise<College[]> {
    console.log('Fetching MC results from mc_results table...');

    try {
        // First, get the total count
        const { count, error: countError } = await supabase
            .from('mc_results')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.error('Error getting MC results count:', countError);
            throw countError;
        }

        console.log(`MC results count query successful. Found ${count} total records.`);
        
        if (!count || count === 0) {
            console.warn('mc_results table is empty.');
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
                .from('mc_results')
                .select('*')
                .range(startRange, endRange);

            if (batchError) {
                console.error(`Error fetching MC results batch ${i + 1}:`, batchError);
                throw batchError;
            }

            if (batchData) {
                allData.push(...batchData);
                console.log(`Batch ${i + 1} fetched: ${batchData.length} records`);
            }
        }

        console.log(`Successfully fetched ${allData.length} out of ${count} total MC records.`);
        
        if (allData.length === 0) {
            console.warn('mc_results table returned no data.');
            return [];
        }

        // Log first record to see structure
        console.log('Sample MC record:', allData[0]);

        // Transform the data to match the expected College interface (DO NOT de-duplicate; keep all rows)
        const results: College[] = allData.map((result: any) => {
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

        console.log(`Successfully processed ${results.length} MC records (including duplicates) from ${allData.length} total records`);
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
    total: 3225,
    universities: [
        { name: "BHARATHIAR UNIVERSITY", hl1_attempts: 764, percentage: 70 },
        { name: "PERIYAR UNIVERSITY", hl1_attempts: 2261, percentage: 70 },
       
    ]
};