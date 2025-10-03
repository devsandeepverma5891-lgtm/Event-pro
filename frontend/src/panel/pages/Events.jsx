
import { useState } from "react";
import Button from "../utils/Button"
import Page_head from "../utils/page_head"
import EventList from "./EventList"

import { Plus } from 'lucide-react';
import EventForm from "./events_components/Event_Form";
import Drawer from "../components/Drawer";

const Events = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleToggleUpload = () => {
    setShowUpload((prev) => {
      return !prev;
    });
  }

  const handleEventCreated = () => {
    setShowUpload(false);
    setRefreshKey(prev => prev + 1); // Trigger refresh of EventList
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEdit(true);
  }

  const handleEventUpdated = () => {
    setShowEdit(false);
    setEditingEvent(null);
    setRefreshKey(prev => prev + 1); // Trigger refresh of EventList
  }

  return (
    <div>
      <Page_head 
        title="Event Management"
        subtitle="Create and manage your events"
        actions={
          <div className="flex gap-2">
            <Button
              onClick={handleToggleUpload}
              tooltip="Create New Events"
              color="default"
              className="flex items-center"
            >
              <Plus className="size-4 hover:text-gray-50 mr-2" />
              Create Events
            </Button>
          </div>
        }
      />     

      <Drawer open={showUpload} onClose={() => setShowUpload(false)} title="Create New Event" width={760}>
        <EventForm onClose={handleEventCreated} />
      </Drawer>

      <Drawer open={showEdit} onClose={() => setShowEdit(false)} title="Edit Event" width={760}>
        <EventForm onClose={handleEventUpdated} event={editingEvent} />
      </Drawer>

      <EventList key={refreshKey} onEditEvent={handleEditEvent} />
    </div>
  )
}

export default Events
