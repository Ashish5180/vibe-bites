'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Save, X, RefreshCw } from 'lucide-react'
import { useToast } from '../../../components/Toaster'

const AddCategoryPage = () => {
  const router = useRouter()
  const { addToast } = useToast()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ name: '', description: '', image: '' })
  const [creating, setCreating] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editValues, setEditValues] = useState({ name: '', description: '', image: '' })
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

  // Auth check (admin only)
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (!token) { router.push('/login'); return }
      try {
        const res = await fetch(`${apiBase}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        if (!res.ok) throw new Error('Auth failed')
        const data = await res.json()
        if (data.success && data.data.role === 'admin') {
          setUser(data.data)
          setIsLoading(false)
        } else {
          addToast('Admin access required', 'error')
          router.push('/')
        }
      } catch (e) {
        localStorage.removeItem('token')
        router.push('/login')
      }
    }
    checkAuth()
  }, [apiBase, router, addToast])

  useEffect(() => { if (user) loadCategories() }, [user])

  const loadCategories = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${apiBase}/categories/all`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        const data = await res.json()
        setCategories(data.data.categories)
      }
    } catch (e) {
      addToast('Error loading categories', 'error')
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return addToast('Name required', 'error')
    setCreating(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${apiBase}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok && data.success) {
        addToast('Category created', 'success')
        setForm({ name: '', description: '', image: '' })
        loadCategories()
      } else {
        addToast(data.message || 'Create failed', 'error')
      }
    } catch (e) {
      addToast('Create failed', 'error')
    } finally {
      setCreating(false)
    }
  }

  const startEdit = (cat) => {
    setEditingId(cat._id)
    setEditValues({ name: cat.name, description: cat.description || '', image: cat.image || '' })
  }
  const cancelEdit = () => { setEditingId(null); setEditValues({ name: '', description: '', image: '' }) }

  const saveEdit = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${apiBase}/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editValues)
      })
      const data = await res.json()
      if (res.ok && data.success) {
        addToast('Category updated', 'success')
        cancelEdit()
        loadCategories()
      } else {
        addToast(data.message || 'Update failed', 'error')
      }
    } catch (e) {
      addToast('Update failed', 'error')
    }
  }

  const toggleStatus = async (cat) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${apiBase}/categories/${cat._id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isActive: !cat.isActive })
      })
      if (res.ok) {
        addToast('Status updated', 'success')
        loadCategories()
      } else {
        addToast('Status change failed', 'error')
      }
    } catch (e) { addToast('Status change failed', 'error') }
  }

  const deleteCategory = async (id) => {
    if (!confirm('Delete this category?')) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${apiBase}/categories/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        addToast('Category deleted', 'success')
        loadCategories()
      } else {
        addToast('Delete failed', 'error')
      }
    } catch (e) { addToast('Delete failed', 'error') }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-vibe-bg text-vibe-brown">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-vibe-bg px-4 py-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-vibe-brown">Category Management</h1>
        <button onClick={loadCategories} className="flex items-center space-x-2 px-4 py-2 rounded-md bg-white border border-vibe-cookie text-vibe-brown hover:bg-vibe-cookie/30 transition-colors">
          <RefreshCw className="h-4 w-4" /> <span>Refresh</span>
        </button>
      </div>

      {/* Create Form */}
      <form onSubmit={handleCreate} className="bg-white border border-vibe-cookie rounded-lg p-6 mb-10 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-vibe-brown flex items-center gap-2"><Plus className="h-5 w-5" /> Add New Category</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-3 py-2 border border-vibe-cookie rounded-md focus:outline-none focus:ring-2 focus:ring-vibe-cookie"
            required
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="px-3 py-2 border border-vibe-cookie rounded-md focus:outline-none focus:ring-2 focus:ring-vibe-cookie"
          />
          <input
            type="text"
            placeholder="Short Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="px-3 py-2 border border-vibe-cookie rounded-md focus:outline-none focus:ring-2 focus:ring-vibe-cookie"
          />
        </div>
        <button disabled={creating} type="submit" className="px-5 py-2 bg-vibe-cookie text-vibe-brown font-medium rounded-md hover:bg-vibe-brown hover:text-white transition-colors disabled:opacity-50">
          {creating ? 'Creating...' : 'Create Category'}
        </button>
      </form>

      {/* Categories Table */}
      <div className="bg-white border border-vibe-cookie rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map(cat => (
              <tr key={cat._id} className="hover:bg-vibe-cookie/10">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-vibe-brown">
                  {editingId === cat._id ? (
                    <input value={editValues.name} onChange={(e) => setEditValues({ ...editValues, name: e.target.value })} className="px-2 py-1 border border-vibe-cookie rounded" />
                  ) : cat.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs">
                  {editingId === cat._id ? (
                    <input value={editValues.description} onChange={(e) => setEditValues({ ...editValues, description: e.target.value })} className="w-full px-2 py-1 border border-vibe-cookie rounded" />
                  ) : (cat.description || '-')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${cat.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{cat.isActive ? 'Active' : 'Inactive'}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {editingId === cat._id ? (
                    <>
                      <button onClick={() => saveEdit(cat._id)} className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"><Save className="h-4 w-4" /></button>
                      <button onClick={cancelEdit} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"><X className="h-4 w-4" /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(cat)} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => toggleStatus(cat)} className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200">
                        {cat.isActive ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                      </button>
                      <button onClick={() => deleteCategory(cat._id)} className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"><Trash2 className="h-4 w-4" /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-6 text-center text-sm text-gray-500">No categories yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-6">Note: Product schema still uses a fixed enum for categories; newly created categories here won't be usable for products until that enum is updated (left unchanged as requested).</p>
    </div>
  )
}

export default AddCategoryPage
