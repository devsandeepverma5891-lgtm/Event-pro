import { useState, useEffect } from 'react'
import Button from "../utils/Button"
import Page_head from "../utils/page_head"
import Drawer from "../components/Drawer"
import DataTable from "../components/DataTable"
import VisitorForm from "./visitors_components/Visitor_Form"
import { apiGet, apiDelete, apiPut } from '../utils/api'
import { useAuth } from '../context/AuthContext'

const Visitors = () => {
  const [open, setOpen] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editingVisitor, setEditingVisitor] = useState(null)
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
    fetchVisitors()
  }, [])

  const fetchVisitors = async () => {
    try {
      setLoading(true)
      const response = await apiGet('/api/visitors', token)
      const visitors = response?.data?.items || response?.data || response?.visitors || []
      setRows(Array.isArray(visitors) ? visitors : [])
    } catch (err) {
      setError(err.message || 'Failed to fetch visitors')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (visitor) => {
    setEditingVisitor(visitor)
    setShowEdit(true)
  }

  const handleDelete = async (visitor) => {
    if (window.confirm('Are you sure you want to delete this visitor?')) {
      try {
        await apiDelete(`/api/visitors/${visitor._id || visitor.id}`, token)
        fetchVisitors() // Refresh the list
      } catch (err) {
        setError('Failed to delete visitor')
      }
    }
  }

  const handleVisitorCreated = () => {
    setOpen(false)
    fetchVisitors()
  }

  const handleVisitorUpdated = () => {
    setShowEdit(false)
    setEditingVisitor(null)
    fetchVisitors()
  }

  return (
    <div>
      <Page_head title="Visitors" subtitle="Manage visitors"
        actions={<Button onClick={() => setOpen(true)}>+ Add Visitor</Button>} />

      <Drawer open={open} onClose={() => setOpen(false)} title="Add Visitor" width={760}>
        <VisitorForm onClose={handleVisitorCreated} />
      </Drawer>

      <Drawer open={showEdit} onClose={() => setShowEdit(false)} title="Edit Visitor" width={760}>
        <VisitorForm onClose={handleVisitorUpdated} visitor={editingVisitor} />
      </Drawer>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading visitors...</div>
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


export default Visitors
