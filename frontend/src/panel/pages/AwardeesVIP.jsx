import { useState, useEffect } from 'react';
import Button from "../utils/Button";
import Page_head from "../utils/page_head";
import Drawer from "../components/Drawer";
import DataTable from "../components/DataTable";
import AwardeeVIPForm from "./awardees_vip_components/AwardeeVIP_Form";
import { apiGet, apiDelete } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AwardeesVIP = () => {
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingAwardee, setEditingAwardee] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const columns = [
    { key: 'fullName', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'organization', header: 'Organization' },
    { key: 'designation', header: 'Designation' },
    { key: 'status', header: 'Status' }
  ];

  useEffect(() => { fetchAwardees(); }, []);

  const fetchAwardees = async () => {
    try {
      setLoading(true);
      const response = await apiGet('/api/awardeesvip', token);
      const data = response?.data?.items || response?.data || [];
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch awardees');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (awardee) => {
    setEditingAwardee(awardee);
    setShowEdit(true);
  };

  const handleDelete = async (awardee) => {
    if (window.confirm('Are you sure you want to delete this awardee?')) {
      try {
        await apiDelete(`/api/awardeesvip/${awardee._id || awardee.id}`, token);
        toast.success('Awardee deleted successfully!');
        fetchAwardees();
      } catch (err) {
        toast.error('Failed to delete awardee');
      }
    }
  };

  const handleCreated = () => { setOpen(false); fetchAwardees(); };
  const handleUpdated = () => { setShowEdit(false); setEditingAwardee(null); fetchAwardees(); };

  return (
    <div>
      <Page_head title="Awardees VIP" subtitle="Manage VIP awardees"
        actions={<Button onClick={() => setOpen(true)}>+ Add Awardee</Button>} />

      <Drawer open={open} onClose={() => setOpen(false)} title="Add Awardee" width={760}>
        <AwardeeVIPForm onClose={handleCreated} />
      </Drawer>

      <Drawer open={showEdit} onClose={() => setShowEdit(false)} title="Edit Awardee" width={760}>
        <AwardeeVIPForm onClose={handleUpdated} awardee={editingAwardee} />
      </Drawer>

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
          getRowId={row => row._id || row.id}
        />
      )}
    </div>
  );
};

export default AwardeesVIP;
