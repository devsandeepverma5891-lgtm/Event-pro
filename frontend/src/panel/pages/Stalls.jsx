import { useState, useEffect } from 'react'
import Button from "../utils/Button"
import Page_head from "../utils/page_head"
import Drawer from "../components/Drawer"
import StallForm from "./stalls_components/Stall_Form"
import DataTable from "../components/DataTable"
import { apiGet, apiDelete, apiPut } from '../utils/api'
import { useAuth } from '../context/AuthContext'

const Stalls = () => {
  const [open, setOpen] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editingStall, setEditingStall] = useState(null)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { token } = useAuth()

  const columns = [
    { key: 'contactPersonName', header: 'Contact Person' },
    { key: 'companyName', header: 'Company' },
    { key: 'email', header: 'Email' },
    { key: 'mobileNumber', header: 'Phone' },
    { key: 'status', header: 'Status' },
  ]

  useEffect(() => {
    fetchStalls()
  }, [])

  const fetchStalls = async () => {
    try {
      setLoading(true)
      console.log('Fetching stalls from /api/stalls with token:', token ? 'present' : 'missing')
      const response = await apiGet('/api/stalls', token)
      console.log('Stalls API response:', response)
      const stalls = response?.data?.items || response?.data || response?.stalls || []
      console.log('Processed stalls data:', stalls)
      setRows(Array.isArray(stalls) ? stalls : [])
    } catch (err) {
      console.error('Error fetching stalls:', err)
      setError(err.message || 'Failed to fetch stalls')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (stall) => {
    setEditingStall(stall)
    setShowEdit(true)
  }

  const handleDelete = async (stall) => {
    if (window.confirm('Are you sure you want to delete this stall?')) {
      try {
        await apiDelete(`/api/stalls/${stall._id || stall.id}`, token)
        fetchStalls() // Refresh the list
      } catch (err) {
        setError('Failed to delete stall')
      }
    }
  }

  const handleStallCreated = () => {
    setOpen(false)
    fetchStalls()
  }

  const handleStallUpdated = () => {
    setShowEdit(false)
    setEditingStall(null)
    fetchStalls()
  }

  return (
    <div>
      <Page_head 
        title="Stall Management"
        subtitle="Create and manage stalls"
        actions={
          <div className="flex gap-2">
            <Button onClick={() => setOpen(true)} className="flex items-center">
              + Create Stall
            </Button>
          </div>
        }
      />

      <Drawer open={open} onClose={() => setOpen(false)} title="Create New Stall" width={760}>
        <StallForm onClose={handleStallCreated} />
      </Drawer>

      <Drawer open={showEdit} onClose={() => setShowEdit(false)} title="Edit Stall" width={760}>
        <StallForm onClose={handleStallUpdated} stall={editingStall} />
      </Drawer>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading stalls...</div>
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

export default Stalls
