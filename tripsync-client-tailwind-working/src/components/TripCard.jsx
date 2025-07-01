import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const TripCard = ({
  trip,
  onEdit,
  onDelete,
  newItem,
  setNewItem,
  handleAddItem,
  handleToggleChecklist,
}) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString().split("T")[0];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all">
      <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-1">{trip.title}</h3>
      <p className="text-gray-700 dark:text-gray-200">📍 {trip.destination}</p>
      <p className="text-gray-600 dark:text-gray-300">
        🗓 {formatDate(trip.startDate)} → {formatDate(trip.endDate)}
      </p>
      {trip.members && <p className="text-gray-600 dark:text-gray-300">👥 {trip.members}</p>}
      {trip.notes && <p className="text-gray-500 dark:text-gray-400 italic">📝 {trip.notes}</p>}

      {/* Checklist Section */}
      <div className="mt-4">
        <h4 className="font-semibold text-sm text-indigo-600 dark:text-indigo-300 mb-2">📋 Checklist</h4>
        <ul className="space-y-1 mb-2">
          {(trip.checklist || []).map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => handleToggleChecklist(trip._id, idx)}
                className="accent-indigo-600"
              />
              <span className={item.done ? "line-through text-gray-400" : ""}>{item.text}</span>
            </li>
          ))}
        </ul>

        <form onSubmit={(e) => handleAddItem(e, trip._id)} className="flex items-center gap-2">
          <input
            type="text"
            value={newItem[trip._id] || ""}
            onChange={(e) => setNewItem({ ...newItem, [trip._id]: e.target.value })}
            placeholder="Add item..."
            className="flex-1 px-2 py-1 rounded text-sm bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
          <button type="submit" className="text-indigo-600 text-sm hover:underline">Add</button>
        </form>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-4">
        <button onClick={() => onDelete(trip._id)} className="text-red-500 hover:underline text-sm">
          <FiTrash2 className="inline mr-1" /> Delete
        </button>
        <button onClick={() => onEdit(trip)} className="text-blue-500 hover:underline text-sm">
          <FiEdit className="inline mr-1" /> Edit
        </button>
      </div>
    </div>
  );
};

export default TripCard;
