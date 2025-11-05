import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getGalleries, getGallery, createGallery } from '../api/galleries'

/**
 * Cache key strategies:
 * - ['galleries'] - all galleries list
 * - ['galleries', slug] - single gallery detail
 */

/**
 * Hook to fetch all galleries
 */
export const useGalleries = () => {
  return useQuery({
    queryKey: ['galleries'],
    queryFn: getGalleries,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

/**
 * Hook to fetch single gallery
 * @param {string} slug
 */
export const useGallery = (slug) => {
  return useQuery({
    queryKey: ['galleries', slug],
    queryFn: () => getGallery(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook to create a gallery
 */
export const useCreateGallery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createGallery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleries'] })
    },
  })
}
