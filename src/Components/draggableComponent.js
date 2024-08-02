import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaTimes } from 'react-icons/fa';

const Draggable = ({ id, component, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '5px',
    cursor: 'grab',
    backgroundColor: '#fff',
    position: 'relative', // For positioning the remove button
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {component}
    </div>
  );
};

export default Draggable;
