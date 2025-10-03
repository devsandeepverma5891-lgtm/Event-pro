import React from "react";

export default function DataTable({ columns, data, getRowId, onEdit, onDelete, className = "" }) {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="min-w-full border border-gray-800 rounded-md overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-left text-xs font-semibold text-gray-300 px-4 py-3 border-b border-gray-700">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="text-right text-xs font-semibold text-gray-300 px-4 py-3 border-b border-gray-700">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-gray-900">
          {data.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-sm text-gray-400 text-center" colSpan={columns.length + ((onEdit || onDelete) ? 1 : 0)}>
                No records found
              </td>
            </tr>
          )}
          {data.map((row, idx) => (
            <tr key={(getRowId ? getRowId(row) : idx)} className="border-b border-gray-800 hover:bg-gray-800/50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-gray-200 align-top">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  {onEdit && (
                    <button type="button" className="px-3 py-1.5 text-xs rounded-md bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700 mr-2" onClick={() => onEdit(row)}>
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button type="button" className="px-3 py-1.5 text-xs rounded-md bg-red-600/10 border border-red-700 text-red-400 hover:bg-red-600/20" onClick={() => onDelete(row)}>
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


