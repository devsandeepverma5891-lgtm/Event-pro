import { useState, useEffect } from 'react'
import Button from "../utils/Button"
import Page_head from "../utils/page_head"
import Drawer from "../components/Drawer"
import DataTable from "../components/DataTable"
import AwardeeForm from "./awardees_components/Awardee_Form"
import { apiGet, apiDelete, apiPut } from '../utils/api'
import { useAuth } from '../context/AuthContext'

const Awardees = () => {
  const [open, setOpen] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editingAwardee, setEditingAwardee] = useState(null)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { token } = useAuth()

  const columns = [
    { key: 'nomineeName', header: 'Nominee' },
    { key: 'awardCategory', header: 'Category' },
    { key: 'status', header: 'Status' },
  ]

  useEffect(() => {
    fetchAwardees()
  }, [])

  const fetchAwardees = async () => {
    try {
      setLoading(true)
      console.log('Fetching awardees from /api/awards with token:', token ? 'present' : 'missing')
      const response = await apiGet('/api/awards', token)
      console.log('Awardees API response:', response)
      const awardees = response?.data?.items || response?.data || response?.awards || []
      console.log('Processed awardees data:', awardees)
      setRows(Array.isArray(awardees) ? awardees : [])
    } catch (err) {
      console.error('Error fetching awardees:', err)
      setError(err.message || 'Failed to fetch awardees')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (awardee) => {
    setEditingAwardee(awardee)
    setShowEdit(true)
  }

  const handleDelete = async (awardee) => {
    if (window.confirm('Are you sure you want to delete this awardee?')) {
      try {
        await apiDelete(`/api/awards/${awardee._id || awardee.id}`, token)
        fetchAwardees() // Refresh the list
      } catch (err) {
        setError('Failed to delete awardee')
      }
    }
  }

  const handleAwardeeCreated = () => {
    setOpen(false)
    fetchAwardees()
  }

  const handleAwardeeUpdated = () => {
    setShowEdit(false)
    setEditingAwardee(null)
    fetchAwardees()
  }

  return (
    <div>
      <Page_head title="Award Nominations" subtitle="Manage nominations"
        actions={<Button onClick={() => setOpen(true)}>+ Create Nomination</Button>} />

      <Drawer open={open} onClose={() => setOpen(false)} title="Create Nomination" width={760}>
        <AwardeeForm onClose={handleAwardeeCreated} />
      </Drawer>

      <Drawer open={showEdit} onClose={() => setShowEdit(false)} title="Edit Nomination" width={760}>
        <AwardeeForm onClose={handleAwardeeUpdated} awardee={editingAwardee} />
      </Drawer>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading awardees...</div>
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

export default Awardees
