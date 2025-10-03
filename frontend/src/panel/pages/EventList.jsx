import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiGet, apiPost, apiDelete, apiPut } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Edit, Trash2 } from 'lucide-react';

const EventList = ({ onEditEvent }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, [statusFilter, currentPage]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(statusFilter !== 'all' && { status: statusFilter })
      });
      
      const response = await apiGet(`/api/events?${params}`, token);
      const list = response?.data?.items || response?.data || response?.events || [];
      const pages = response?.data?.totalPages || response?.totalPages || 1;
      setEvents(Array.isArray(list) ? list : []);
      setTotalPages(Number(pages) || 1);
    } catch (err) {
      setError(err.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      await apiPost(`/api/events/${eventId}/status`, { status: newStatus }, token);
      fetchEvents(); // Refresh the list
    } catch (err) {
      setError('Failed to update event status');
    }
  };

  const handleEdit = (event) => {
    if (onEditEvent) {
      onEditEvent(event);
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await apiDelete(`/api/events/${eventId}`, token);
        fetchEvents(); // Refresh the list
      } catch (err) {
        setError('Failed to delete event');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      draft: 'bg-gray-100 text-gray-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-3">
        {events.map((evt) => (
          <div key={evt._id || evt.id} className="rounded-lg border border-gray-700 bg-gray-900 p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-100">{evt.eventName || evt.name}</h4>
                <div className="text-sm text-gray-400">{evt.city} • {formatDate(evt.startDateTime || evt.startDate)} → {formatDate(evt.endDateTime || evt.endDate)}</div>
              </div>
              <div className="flex items-center gap-3">
                <div>{getStatusBadge(evt.status || 'active')}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(evt)}
                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition-colors"
                    title="Edit Event"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(evt._id || evt.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-gray-400">No events found.</div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

    </div>
  );
};

export default EventList;
