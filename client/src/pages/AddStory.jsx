import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import storyService from '../features/stories/storyService'

export default function AddStory() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const onSelectImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!title.trim() || !description.trim() || !imageFile) {
      setError('Please provide title, image, and description.')
      return
    }
    try {
      setSubmitting(true)
      const payload = {
        title: title.trim(),
        excerpt: description.trim(),
        image: imagePreview, // base64 data URL
        location: '',
      }
      await storyService.addStory(payload)
      navigate('/explore')
    } catch (err) {
      setError('Failed to submit story. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="shadow-sm rounded-4 border-0" style={{ backgroundColor: 'var(--white)' }}>
            <div className="p-4 p-md-5">
              <h2 className="fw-bold mb-1" style={{ color: 'var(--black)' }}>
                Share Your <span style={{ color: 'var(--orange)' }}>Travel</span> Story
              </h2>
              <p className="text-muted mb-4">Inspire others with a moment from your journey.</p>

              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Title</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Give your story a title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Cover Image</label>
                  <div
                    className="border rounded-4 p-3 d-flex flex-column flex-md-row align-items-center gap-3"
                    style={{ backgroundColor: '#fafafa' }}
                  >
                    <div
                      className="rounded-3 overflow-hidden d-flex align-items-center justify-content-center"
                      style={{ width: 180, height: 120, backgroundColor: '#f0f0f0' }}
                    >
                      {imagePreview ? (
                        <img src={imagePreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <img
                          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop"
                          alt="placeholder"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(10%)' }}
                        />
                      )}
                    </div>
                    <div className="flex-grow-1 w-100">
                      <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        onChange={onSelectImage}
                      />
                      <div className="form-text">Use a clear landscape image (JPG or PNG).</div>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    rows="6"
                    placeholder="Tell us about the moment, emotions, and what made it special..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-orange"
                    onClick={() => navigate(-1)}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-orange" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Publish Story'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
