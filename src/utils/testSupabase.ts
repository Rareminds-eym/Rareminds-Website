import { supabase } from '../lib/supabase';

export async function testSupabaseConnection() {
    try {
        console.log('Testing Supabase connection...');
        
        // Test MC results table
        const { data: mcData, error: mcError } = await supabase
            .from('mc_results')
            .select('University, college_code, college_name, team_name')
            .limit(5);

        if (mcError) {
            console.error('MC Results Error:', mcError);
        } else {
            console.log('MC Results Sample:', mcData);
        }

        // Test GMP results table
        const { data: gmpData, error: gmpError } = await supabase
            .from('gmp_results')
            .select('University, college_code, college_name, team_name')
            .limit(5);

        if (gmpError) {
            console.error('GMP Results Error:', gmpError);
        } else {
            console.log('GMP Results Sample:', gmpData);
        }

        return {
            mcResults: { data: mcData, error: mcError },
            gmpResults: { data: gmpData, error: gmpError }
        };
    } catch (error) {
        console.error('Connection test failed:', error);
        return { error };
    }
}