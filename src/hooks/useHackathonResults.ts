import { useState, useEffect } from 'react';
import { fetchMcResults, fetchMCLevel2Results } from '../pages/Hackathons/data/mc-results';
import { fetchGmpResults, fetchGMPLevel2Results } from '../pages/Hackathons/data/gmp-results';
import { fetchFSQMResults, fetchFSQMLevel2Results } from '../pages/Hackathons/data/fsqm-results';
import type { College } from '../pages/Hackathons/data/mc-results';

export function useHackathonResults(slug?: string, level: string = 'Level1') {
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
                    // Use GMP Level 1 or Level 2 data based on selected level
                    if (level === 'Level2') {
                        console.log('Loading Level 2 results for capathon route - fetching from gmp_h2_results table');
                        results = await fetchGMPLevel2Results();
                    } else {
                        console.log('Loading Level 1 results for capathon route - fetching from gmp_results table');
                        results = await fetchGmpResults();
                    }
                } else if (slug === 'codecare-2-0') {
                    // Use MC Level 1 or Level 2 data based on selected level
                    if (level === 'Level2') {
                        console.log('Loading Level 2 results for codecare-2-0 route - fetching from mc_h2_results table');
                        results = await fetchMCLevel2Results();
                    } else {
                        console.log('Loading Level 1 results for codecare-2-0 route - fetching from mc_results table');
                        results = await fetchMcResults();
                    }
                } else if (slug === 'safe-bite-2-0') {
                    // Use FSQM Level 1 or Level 2 data based on selected level
                    if (level === 'Level2') {
                        console.log('Loading Level 2 results for safe-bite-2-0 route - fetching from fsqm_h2_results table');
                        results = await fetchFSQMLevel2Results();
                    } else {
                        console.log('Loading Level 1 results for safe-bite-2-0 route - fetching from fsqm_results table');
                        results = await fetchFSQMResults();
                    }
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

                console.log(`Successfully loaded ${results.length} colleges for route: ${slug || 'general'}, level: ${level}`);
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
    }, [slug, level]);

    return { colleges, loading, error };
}