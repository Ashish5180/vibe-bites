'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '../../../components/Toaster'
import { Plus, X, Loader2 } from 'lucide-react'

const CATEGORY_ENUM = ['Makhana', 'Chips', 'Bites', 'Nuts', 'Seeds']

const CreateProductPage = () => {
  const router = useRouter()
  const { addToast } = useToast()
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: CATEGORY_ENUM[0],
    image: '',
    images: [''],
    sizes: [{ size: '', price: '', stock: '' }],
    ingredients: '',
    nutrition: { calories: '', protein: '', carbs: '', fat: '', fiber: '' },
    featured: false
  })

  // Auth check
  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem('token')
      if (!token) { router.push('/login'); return }
      try {
        const res = await fetch(`${apiBase}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        if (!res.ok) throw new Error('Auth failed')
        const data = await res.json()
        if (data.success && data.data.role === 'admin') {
          setUser(data.data)
        } else {
          addToast('Admin access required', 'error')
          router.push('/')
        }
      } catch (e) {
        router.push('/login')
      } finally {
        setLoadingAuth(false)
      }
    }
    check()
  }, [apiBase, router, addToast])

  const updateField = (field, value) => setForm(f => ({ ...f, [field]: value }))
  const updateNutrition = (nField, value) => setForm(f => ({ ...f, nutrition: { ...f.nutrition, [nField]: value } }))

  const updateSize = (idx, key, value) => {
    setForm(f => ({
      ...f,
      sizes: f.sizes.map((s, i) => i === idx ? { ...s, [key]: value } : s)
    }))
  }

  const addSize = () => setForm(f => ({ ...f, sizes: [...f.sizes, { size: '', price: '', stock: '' }] }))
  const removeSize = (idx) => setForm(f => ({ ...f, sizes: f.sizes.filter((_, i) => i !== idx) }))

  const addImage = () => setForm(f => ({ ...f, images: [...f.images, ''] }))
  const updateImage = (idx, value) => setForm(f => ({ ...f, images: f.images.map((im, i) => i === idx ? value : im) }))
  const removeImage = (idx) => setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))

  const validateClient = () => {
    const errors = []
    if (!form.name.trim()) errors.push('Name required')
    if (form.description.trim().length < 10) errors.push('Description min 10 chars')
    if (!form.image.trim()) errors.push('Main image required')
    if (!form.ingredients.trim()) errors.push('Ingredients required')
    form.sizes.forEach((s, i) => {
      if (!s.size) errors.push(`Size #${i+1} label required`)
      if (s.price === '' || isNaN(parseFloat(s.price))) errors.push(`Size #${i+1} price invalid`)
      if (s.stock === '' || isNaN(parseInt(s.stock))) errors.push(`Size #${i+1} stock invalid`)
    })
    Object.entries(form.nutrition).forEach(([k,v]) => { if (!v) errors.push(`Nutrition ${k} required`) })
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateClient()
    if (errs.length) { errs.slice(0,6).forEach(m => addToast(m, 'error')); return }
    setSubmitting(true)
    try {
      const token = localStorage.getItem('token')
      const payload = {
        ...form,
        sizes: form.sizes.map(s => ({ size: s.size.trim(), price: parseFloat(s.price), stock: parseInt(s.stock) })),
        images: form.images.filter(im => im.trim())
      }
      const res = await fetch(`${apiBase}/admin/products/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      })
      const data = await res.json().catch(()=>({}))
      if (res.ok && data.success) {
        addToast('Product created', 'success')
        router.push('/admin')
      } else {
        if (data.errors) data.errors.slice(0,6).forEach(er => addToast(er.msg, 'error'))
        else addToast(data.message || 'Create failed', 'error')
      }
    } catch (e) {
      addToast('Network error', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingAuth) return <div className='min-h-screen flex items-center justify-center bg-vibe-bg text-vibe-brown'>Checking auth...</div>

  return (
    <div className='min-h-screen bg-vibe-bg px-4 py-8 max-w-5xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-vibe-brown'>Create Product</h1>
        <button onClick={() => router.push('/admin')} className='px-4 py-2 rounded-md bg-white border border-vibe-cookie text-vibe-brown hover:bg-vibe-cookie/30'>Back</button>
      </div>
      <form onSubmit={handleSubmit} className='space-y-8'>
        <section className='bg-white border border-vibe-cookie rounded-lg p-6 space-y-4'>
          <h2 className='text-lg font-semibold text-vibe-brown'>Basic Info</h2>
          <div className='grid md:grid-cols-2 gap-4'>
            <input className='input' placeholder='Name' value={form.name} onChange={e=>updateField('name', e.target.value)} />
            <select className='input' value={form.category} onChange={e=>updateField('category', e.target.value)}>
              {CATEGORY_ENUM.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input className='input md:col-span-2' placeholder='Main Image URL' value={form.image} onChange={e=>updateField('image', e.target.value)} />
            <textarea className='input md:col-span-2' rows={3} placeholder='Description' value={form.description} onChange={e=>updateField('description', e.target.value)} />
            <textarea className='input md:col-span-2' rows={2} placeholder='Ingredients' value={form.ingredients} onChange={e=>updateField('ingredients', e.target.value)} />
          </div>
        </section>

        <section className='bg-white border border-vibe-cookie rounded-lg p-6 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-vibe-brown'>Images (optional list)</h2>
            <button type='button' onClick={addImage} className='flex items-center gap-1 text-sm px-3 py-1 rounded bg-vibe-cookie text-vibe-brown hover:bg-vibe-brown hover:text-white'><Plus className='h-4 w-4'/>Add</button>
          </div>
          <div className='space-y-2'>
            {form.images.map((img, idx) => (
              <div key={idx} className='flex gap-2'>
                <input className='input flex-1' placeholder={`Image URL #${idx+1}`} value={img} onChange={e=>updateImage(idx, e.target.value)} />
                {form.images.length>1 && <button type='button' onClick={()=>removeImage(idx)} className='px-2 rounded bg-red-100 text-red-700 hover:bg-red-200'><X className='h-4 w-4'/></button>}
              </div>
            ))}
          </div>
        </section>

        <section className='bg-white border border-vibe-cookie rounded-lg p-6 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-vibe-brown'>Sizes & Pricing</h2>
            <button type='button' onClick={addSize} className='flex items-center gap-1 text-sm px-3 py-1 rounded bg-vibe-cookie text-vibe-brown hover:bg-vibe-brown hover:text-white'><Plus className='h-4 w-4'/>Add Size</button>
          </div>
          <div className='space-y-3'>
            {form.sizes.map((s, idx) => (
              <div key={idx} className='grid md:grid-cols-4 gap-3 items-start'>
                <input className='input' placeholder='Size label (e.g. 100g)' value={s.size} onChange={e=>updateSize(idx,'size',e.target.value)} />
                <input className='input' placeholder='Price' value={s.price} onChange={e=>updateSize(idx,'price',e.target.value)} />
                <input className='input' placeholder='Stock' value={s.stock} onChange={e=>updateSize(idx,'stock',e.target.value)} />
                <div className='flex items-center'>
                  {form.sizes.length>1 && <button type='button' onClick={()=>removeSize(idx)} className='px-2 rounded bg-red-100 text-red-700 hover:bg-red-200 h-9'><X className='h-4 w-4'/></button>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='bg-white border border-vibe-cookie rounded-lg p-6 space-y-4'>
            <h2 className='text-lg font-semibold text-vibe-brown'>Nutrition</h2>
            <div className='grid md:grid-cols-5 gap-3'>
              {Object.keys(form.nutrition).map(key => (
                <input key={key} className='input' placeholder={key} value={form.nutrition[key]} onChange={e=>updateNutrition(key, e.target.value)} />
              ))}
            </div>
        </section>

        <div className='pt-2'>
          <button disabled={submitting} type='submit' className='px-6 py-3 rounded-md bg-vibe-cookie text-vibe-brown font-semibold hover:bg-vibe-brown hover:text-white transition-colors disabled:opacity-50 flex items-center gap-2'>
            {submitting && <Loader2 className='h-4 w-4 animate-spin'/>}
            {submitting ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>

      <style jsx global>{`
        .input { @apply px-3 py-2 border border-vibe-cookie rounded-md focus:outline-none focus:ring-2 focus:ring-vibe-cookie bg-white text-vibe-brown placeholder-gray-400; }
      `}</style>
    </div>
  )
}

export default CreateProductPage
