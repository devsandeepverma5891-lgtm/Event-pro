import { useState, useEffect } from 'react'
import Button from "../utils/Button"
import Page_head from "../utils/page_head"
import Drawer from "../components/Drawer"
import DataTable from "../components/DataTable"
import { apiGet, apiDelete, apiPut } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import GuestForm from './guests_components/Guest_Form'

const Guests = () => {
  const [open, setOpen] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editingGuest, setEditingGuest] = useState(null)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { token } = useAuth()

  const columns = [
    { key: 'fullName', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'mobileNumber', header: 'Phone' },
    { key: 'status', header: 'Status' },
  ]

  useEffect(() => {
    fetchGuests()
  }, [])

  const fetchGuests = async () => {
    try {
      setLoading(true)
      const response = await apiGet('/api/guests', token)
      const guests = response?.data?.items || response?.data || response?.guests || []
      setRows(Array.isArray(guests) ? guests : [])
    } catch (err) {
      setError(err.message || 'Failed to fetch guests')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (guest) => {
    setEditingGuest(guest)
    setShowEdit(true)
  }

  const handleDelete = async (guest) => {
    if (window.confirm('Are you sure you want to delete this guest?')) {
      try {
        await apiDelete(`/api/guests/${guest._id || guest.id}`, token)
        fetchGuests() // Refresh the list
      } catch (err) {
        setError('Failed to delete guest')
      }
    }
  }

  const handleGuestCreated = () => {
    setOpen(false)
    fetchGuests()
  }

  const handleGuestUpdated = () => {
    setShowEdit(false)
    setEditingGuest(null)
    fetchGuests()
  }

  return (
    <div>
      <Page_head 
        title="Guests" 
        subtitle="Manage guests"
        actions={<Button onClick={() => setOpen(true)}>+ Add Guest</Button>} 
      />

      <Drawer open={open} onClose={() => setOpen(false)} title="Add Guest" width={760}>
        <GuestForm onClose={handleGuestCreated} />
      </Drawer>

      <Drawer open={showEdit} onClose={() => setShowEdit(false)} title="Edit Guest" width={760}>
        <GuestForm onClose={handleGuestUpdated} guest={editingGuest} />
      </Drawer>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading guests...</div>
        </div>
      ) : (
        <DataTable 
          columns={columns} 
          data={rows} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          getRowId={(row) => row._id || row.id}
        />
      )}
    </div>
  )
}

export default Guests
