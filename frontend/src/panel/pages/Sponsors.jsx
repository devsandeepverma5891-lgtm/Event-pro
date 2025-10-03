import { useState, useEffect } from 'react'
import Button from "../utils/Button"
import Page_head from "../utils/page_head"
import Drawer from "../components/Drawer"
import DataTable from "../components/DataTable"
import SponsorForm from "./sponsors_components/Sponsor_Form"
import { apiGet, apiDelete, apiPut } from '../utils/api'
import { useAuth } from '../context/AuthContext'

const Sponsors = () => {
  const [open, setOpen] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editingSponsor, setEditingSponsor] = useState(null)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { token } = useAuth()

  const columns = [
    { key: 'contactPersonName', header: 'Contact Person' },
    { key: 'organizationName', header: 'Company' },
    { key: 'sponsorshipTier', header: 'Tier' },
    { key: 'sponsorshipAmount', header: 'Amount' },
    { key: 'status', header: 'Status' },
  ]

  useEffect(() => {
    fetchSponsors()
  }, [])

  const fetchSponsors = async () => {
    try {
      setLoading(true)
      console.log('Fetching sponsors from /api/sponsors with token:', token ? 'present' : 'missing')
      const response = await apiGet('/api/sponsors', token)
      console.log('Sponsors API response:', response)
      const sponsors = response?.data?.items || response?.data || response?.sponsors || []
      console.log('Processed sponsors data:', sponsors)
      setRows(Array.isArray(sponsors) ? sponsors : [])
    } catch (err) {
      console.error('Error fetching sponsors:', err)
      setError(err.message || 'Failed to fetch sponsors')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (sponsor) => {
    setEditingSponsor(sponsor)
    setShowEdit(true)
  }

  const handleDelete = async (sponsor) => {
    if (window.confirm('Are you sure you want to delete this sponsor?')) {
      try {
        await apiDelete(`/api/sponsors/${sponsor._id || sponsor.id}`, token)
        fetchSponsors() // Refresh the list
      } catch (err) {
        setError('Failed to delete sponsor')
      }
    }
  }

  const handleSponsorCreated = () => {
    setOpen(false)
    fetchSponsors()
  }

  const handleSponsorUpdated = () => {
    setShowEdit(false)
    setEditingSponsor(null)
    fetchSponsors()
  }

  return (
    <div>
      <Page_head title="Sponsors" subtitle="Manage sponsors"
        actions={<Button onClick={() => setOpen(true)}>+ Add Sponsor</Button>} />

      <Drawer open={open} onClose={() => setOpen(false)} title="Add Sponsor" width={760}>
        <SponsorForm onClose={handleSponsorCreated} />
      </Drawer>

      <Drawer open={showEdit} onClose={() => setShowEdit(false)} title="Edit Sponsor" width={760}>
        <SponsorForm onClose={handleSponsorUpdated} sponsor={editingSponsor} />
      </Drawer>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading sponsors...</div>
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

export default Sponsors
