import { useState, useEffect } from 'react'
import { apiGet } from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function useDashboardStats() {
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    visitors: 0,
    awards: 0,
    stalls: 0,
    sponsors: 0,
    activeEvents: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { token } = useAuth()

  useEffect(() => {
    fetchDashboardStats()
  }, [token])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      setError('')

      // Fetch all data in parallel
      const [visitorsRes, stallsRes, sponsorsRes, awardsRes, eventsRes] = await Promise.allSettled([
        apiGet('/api/visitors', token),
        apiGet('/api/stalls', token),
        apiGet('/api/sponsors', token),
        apiGet('/api/awards', token),
        apiGet('/api/events', token)
      ])

      // Process visitors
      const visitors = visitorsRes.status === 'fulfilled' 
        ? (visitorsRes.value?.data?.items || visitorsRes.value?.data || visitorsRes.value?.visitors || [])
        : []

      // Process stalls
      const stalls = stallsRes.status === 'fulfilled'
        ? (stallsRes.value?.data?.items || stallsRes.value?.data || stallsRes.value?.stalls || [])
        : []

      // Process sponsors
      const sponsors = sponsorsRes.status === 'fulfilled'
        ? (sponsorsRes.value?.data?.items || sponsorsRes.value?.data || sponsorsRes.value?.sponsors || [])
        : []

      // Process awards
      const awards = awardsRes.status === 'fulfilled'
        ? (awardsRes.value?.data?.items || awardsRes.value?.data || awardsRes.value?.awards || [])
        : []

      // Process events
      const events = eventsRes.status === 'fulfilled'
        ? (eventsRes.value?.data?.items || eventsRes.value?.data || eventsRes.value?.events || [])
        : []

      // Calculate active events (events with status 'active' or 'Active')
      const activeEvents = events.filter(event => 
        event.status === 'active' || 
        event.status === 'Active' || 
        event.status === 'published' ||
        event.status === 'Published'
      )

      // Calculate total registrations (sum of all registrations)
      const totalRegistrations = visitors.length + stalls.length + sponsors.length + awards.length

      setStats({
        totalRegistrations,
        visitors: visitors.length,
        awards: awards.length,
        stalls: stalls.length,
        sponsors: sponsors.length,
        activeEvents: activeEvents.length
      })

    } catch (err) {
      console.error('Error fetching dashboard stats:', err)
      setError(err.message || 'Failed to fetch dashboard statistics')
    } finally {
      setLoading(false)
    }
  }

  const refreshStats = () => {
    fetchDashboardStats()
  }

  return {
    stats,
    loading,
    error,
    refreshStats
  }
}
