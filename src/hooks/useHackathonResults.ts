import { useState, useEffect } from 'react';
import { fetchMcResults } from '../pages/Hackathons/data/mc-results';
import { fetchGmpResults } from '../pages/Hackathons/data/gmp-results';
import { fetchFSQMResults } from '../pages/Hackathons/data/fsqm-results';
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