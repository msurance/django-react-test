import { useState, useEffect } from 'react'

function App() {
  const [status, setStatus] = useState(null)
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    fetch('/api/status/')
      .then(r => r.json())
      .then(setStatus)
      .catch(() => setStatus({ status: 'error', message: 'Backend unreachable' }))

    fetch('/api/items/')
      .then(r => r.json())
      .then(d => setItems(d.items))
  }, [])

  const addItem = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/items/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItem }),
    })
    const data = await res.json()
    if (res.ok) {
      setItems(prev => [...prev, data.created])
      setNewItem('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-gray-900">Django + React + Tailwind</h1>

        {/* API status */}
        <div className={`rounded-lg p-4 text-sm font-medium ${
          status?.status === 'ok' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status ? status.message : 'Connecting to backend...'}
        </div>

        {/* Items list */}
        <div className="bg-white rounded-lg shadow p-4 space-y-2">
          <h2 className="font-semibold text-gray-700">Items from API</h2>
          <ul className="space-y-1">
            {items.map((item, i) => (
              <li key={i} className="text-gray-600 text-sm py-1 border-b last:border-0">{item}</li>
            ))}
          </ul>
        </div>

        {/* Add item form */}
        <form onSubmit={addItem} className="flex gap-2">
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="Add an item..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            Add
          </button>
        </form>

      </div>
    </div>
  )
}

export default App
