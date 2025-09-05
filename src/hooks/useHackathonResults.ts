import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { fetchMcResults } from '../pages/Hackathons/data/mc-results';
import { fetchGmpResults } from '../pages/Hackathons/data/gmp-results';
import { fetchFSQMResults } from '../pages/Hackathons/data/fsqm-results';
=======
import { fetchMcResults, fetchMCLevel2Results, fetchMCWinners } from '../pages/Hackathons/data/mc-results';
import { fetchGmpResults, fetchGMPLevel2Results, fetchGMPWinners } from '../pages/Hackathons/data/gmp-results';
import { fetchFSQMResults, fetchFSQMLevel2Results, fetchFSQMWinners } from '../pages/Hackathons/data/fsqm-results';
>>>>>>> d7b0777 (Adding Winners)
import type { College } from '../pages/Hackathons/data/mc-results';

export function useHackathonResults(slug?: string) {
    const [colleges, setColleges] = useState<College[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadResults = async () => {
            setLoading(true);
            setError(null);

            try {
                let results: College[] = [];

                if (slug === 'capathon') {
<<<<<<< HEAD
                    // Fetch ONLY from gmp_results table
                    console.log('Loading results for capathon route - fetching from gmp_results table');
                    results = await fetchGmpResults();
                } else if (slug === 'codecare-2-0') {
                    // Fetch ONLY from mc_results table
                    console.log('Loading results for codecare-2-0 route - fetching from mc_results table');
                    results = await fetchMcResults();
                } else if (slug === 'safe-bite-2-0') {
                    // Use static FSQM data
                    console.log('Loading results for safe-bite-2-0 route - using static FSQM data');
                    results = await fetchFSQMResults();
=======
                    // Use GMP Level 1, Level 2, or Winners data based on selected level
                    if (level === 'Level2') {
                        console.log('Loading Level 2 results for capathon route - fetching from gmp_h2_results table');
                        results = await fetchGMPLevel2Results();
                    } else if (level === 'Winners') {
                        console.log('Loading Winners results for capathon route - fetching from gmp_winners table');
                        results = await fetchGMPWinners();
                    } else {
                        console.log('Loading Level 1 results for capathon route - fetching from gmp_results table');
                        results = await fetchGmpResults();
                    }
                } else if (slug === 'codecare-2-0') {
                    // Use MC Level 1, Level 2, or Winners data based on selected level
                    if (level === 'Level2') {
                        console.log('Loading Level 2 results for codecare-2-0 route - fetching from mc_h2_results table');
                        results = await fetchMCLevel2Results();
                    } else if (level === 'Winners') {
                        console.log('Loading Winners results for codecare-2-0 route - fetching from mc_winners table');
                        results = await fetchMCWinners();
                    } else {
                        console.log('Loading Level 1 results for codecare-2-0 route - fetching from mc_results table');
                        results = await fetchMcResults();
                    }
                } else if (slug === 'safe-bite-2-0') {
                    // Use FSQM Level 1, Level 2, or Winners data based on selected level
                    if (level === 'Level2') {
                        console.log('Loading Level 2 results for safe-bite-2-0 route - fetching from fsqm_h2_results table');
                        results = await fetchFSQMLevel2Results();
                    } else if (level === 'Winners') {
                        console.log('Loading Winners results for safe-bite-2-0 route - fetching from fsqm_winners table');
                        results = await fetchFSQMWinners();
                    } else {
                        console.log('Loading Level 1 results for safe-bite-2-0 route - fetching from fsqm_results table');
                        results = await fetchFSQMResults();
                    }
>>>>>>> d7b0777 (Adding Winners)
                } else {
                    // For general hackathons page, combine all results
                    console.log('Loading results for general hackathons page - combining all data sources');
                    const [gmpData, mcData, fsqmData] = await Promise.all([
                        fetchGmpResults(),
                        fetchMcResults(),
                        fetchFSQMResults()
                    ]);
                    results = [...gmpData, ...mcData, ...fsqmData];
                }

                console.log(`Successfully loaded ${results.length} colleges for route: ${slug || 'general'}`);
                setColleges(results);
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error('Error loading hackathon results:', err);
                setError(`Failed to load results: ${err instanceof Error ? err.message : 'Unknown error'}`);

                // No static fallback data - show empty results
                console.log('No fallback data available. Showing empty results.');
                setColleges([]);
            } finally {
                setLoading(false);
            }
        };

        loadResults();
    }, [slug]);

    return { colleges, loading, error };
}