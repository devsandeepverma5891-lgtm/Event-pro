import { useEffect, useState } from 'react'
import { apiGet } from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function useEventOptions() {
  const { token } = useAuth()
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    async function fetchEvents() {
      try {
        setLoading(true)
        const res = await apiGet('/api/events', token)
        const items = res?.data?.items || res?.data || res?.events || []
        if (mounted) {
          setOptions(items.map(e => ({ value: e._id || e.id, label: e.eventName || e.name })))
        }
      } catch (err) {
        if (mounted) setError(err.message || 'Failed to load events')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchEvents()
    return () => { mounted = false }
  }, [token])

  return { options, loading, error }
}


