import { Trash2 } from 'lucide-react';

export default function MessageManager({ messages, onDelete }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold border-b border-base-200 pb-3">Inbox Messages</h3>
      {messages.length === 0 ? (
        <p className="text-sm text-base-content/60 py-8 text-center">No messages received yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id || msg.id} className="p-4 bg-base-200 border border-base-300 rounded-xl space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-sm block">{msg.name}</span>
                  <span className="text-xs text-primary">{msg.email} {msg.phone && `• ${msg.phone}`}</span>
                </div>
                <button onClick={() => onDelete('contacts', msg._id || msg.id)} className="btn btn-ghost btn-xs text-error">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-base-content/80 leading-relaxed bg-base-100 p-3 rounded-lg border border-base-300">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}