import { useState, useEffect } from 'react';
import Button from "../utils/Button";
import Page_head from "../utils/page_head";
import Drawer from "../components/Drawer";
import DataTable from "../components/DataTable";
import SpeakerForm from "./speakers_components/Speaker_Form";
import { apiGet, apiDelete } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Speakers = () => {
  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'title', header: 'Title' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
  ];

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      setLoading(true);
      const response = await apiGet('/api/speakers', token);
      const speakers = response?.data?.items || response?.data || response?.speakers || [];
      setRows(Array.isArray(speakers) ? speakers : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch speakers');
      toast.error(err.message || 'Failed to fetch speakers');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (speaker) => {
    setEditingSpeaker(speaker);
    setShowEdit(true);
  };

  const handleDelete = async (speaker) => {
    if (window.confirm('Are you sure you want to delete this speaker?')) {
      try {
        await apiDelete(`/api/speakers/${speaker._id || speaker.id}`, token);
        toast.success('Speaker deleted successfully!');
        fetchSpeakers();
      } catch (err) {
        toast.error('Failed to delete speaker');
      }
    }
  };

  const handleSpeakerCreated = () => {
    setOpen(false);
    fetchSpeakers();
  };

  const handleSpeakerUpdated = () => {
    setShowEdit(false);
    setEditingSpeaker(null);
    fetchSpeakers();
  };

  return (
    <div>
      <Page_head title="Speakers" subtitle="Manage speakers"
        actions={<Button onClick={() => setOpen(true)}>+ Add Speaker</Button>} />

      <Drawer open={open} onClose={() => setOpen(false)} title="Add Speaker" width={760}>
        <SpeakerForm onClose={handleSpeakerCreated} />
      </Drawer>

      <Drawer open={showEdit} onClose={() => setShowEdit(false)} title="Edit Speaker" width={760}>
        <SpeakerForm onClose={handleSpeakerUpdated} speaker={editingSpeaker} />
      </Drawer>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading speakers...</div>
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
  );
};

export default Speakers;
