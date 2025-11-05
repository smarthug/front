import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { login, register, getCurrentUser } from '../api/auth'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

/**
 * Hook to handle user login
 */
export const useLogin = () => {
  const { setTokens, setUser } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setTokens(data.access, data.refresh)
      // Fetch user data after login
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
      navigate('/')
    },
  })
}

/**
 * Hook to handle user registration
 */
export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      // Redirect to login page after successful registration
      navigate('/login')
    },
  })
}

/**
 * Hook to handle user logout
 */
export const useLogout = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return () => {
    logout()
    queryClient.clear()
    navigate('/')
  }
}

/**
 * Hook to fetch current user
 */
export const useCurrentUser = () => {
  const { accessToken, setUser } = useAuthStore()

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    enabled: !!accessToken,
    onSuccess: (data) => {
      setUser(data)
    },
  })
}
