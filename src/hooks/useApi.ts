import { useState, useEffect, useCallback, useRef } from 'react';

interface UseApiOptions<T> {
    initialData?: T;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    enabled?: boolean;
}

interface UseApiState<T> {
    data: T | undefined;
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching data from the API
 * Uses useRef to store the fetcher and hasFetched flag to prevent infinite loops
 */
export function useApi<T>(
    fetcher: () => Promise<{ success: boolean; data?: T; error?: string }>,
    options: UseApiOptions<T> = {}
): UseApiState<T> {
    const { initialData, onSuccess, onError, enabled = true } = options;

    // Use ref to store fetcher to prevent re-triggering on every render
    const fetcherRef = useRef(fetcher);
    fetcherRef.current = fetcher;

    const [data, setData] = useState<T | undefined>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const hasFetchedRef = useRef(false);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await fetcherRef.current();

            if (result.success && result.data) {
                setData(result.data);
                onSuccess?.(result.data);
            } else if (result.error) {
                throw new Error(result.error);
            }
        } catch (err) {
            const error = err instanceof Error ? err : new Error('An error occurred');
            setError(error);
            onError?.(error);
        } finally {
            setIsLoading(false);
        }
    }, [onSuccess, onError]);

    // Only fetch once on mount
    useEffect(() => {
        if (enabled && !hasFetchedRef.current) {
            hasFetchedRef.current = true;
            fetchData();
        }
    }, [enabled, fetchData]);

    return { data, isLoading, error, refetch: fetchData };
}

/**
 * Custom hook for mutations (POST, PUT, DELETE)
 */
export function useMutation<TData, TVariables>(
    mutationFn: (variables: TVariables) => Promise<{ success: boolean; data?: TData; error?: string }>,
    options: {
        onSuccess?: (data: TData) => void;
        onError?: (error: Error) => void;
    } = {}
) {
    const [data, setData] = useState<TData | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = useCallback(
        async (variables: TVariables) => {
            setIsLoading(true);
            setError(null);

            try {
                const result = await mutationFn(variables);

                if (result.success && result.data) {
                    setData(result.data);
                    options.onSuccess?.(result.data);
                    return result.data;
                } else if (result.error) {
                    throw new Error(result.error);
                }
            } catch (err) {
                const error = err instanceof Error ? err : new Error('Mutation failed');
                setError(error);
                options.onError?.(error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        [mutationFn, options]
    );

    return {
        mutate,
        data,
        isLoading,
        error,
        reset: () => {
            setData(undefined);
            setError(null);
        },
    };
}
