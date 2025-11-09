import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import storyService from '../features/stories/storyService'
import { fetchStories } from '../features/stories/storySlice'

export default function Explore() {
  const dispatch = useAppDispatch()
  const { list } = useAppSelector((state) => state.stories)
  const user = useAppSelector((state) => state.auth.user)
  const location = useLocation()
  const [selected, setSelected] = useState(null)
  const [likes, setLikes] = useState({}) // { [storyId]: { count, liked } }
  const [filter, setFilter] = useState('all') // all | my | popular

  useEffect(() => { dispatch(fetchStories()) }, [dispatch])

  useEffect(() => {
    // initialize likes map when list changes
    const map = {}
    list.forEach((s) => {
      const liked = Array.isArray(s.likes) && user ? s.likes.includes(user._id) : false
      map[s._id] = { count: s.likesCount ?? (Array.isArray(s.likes) ? s.likes.length : 0), liked }
    })
    setLikes(map)
  }, [list, user])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const f = params.get('filter')
    if (f === 'my' || f === 'popular' || f === 'all') {
      setFilter(f)
    }
  }, [location.search])

  const toggleLike = async (e, story) => {
    e.stopPropagation()
    try {
      const res = await storyService.toggleLike(story._id)
      setLikes((prev) => ({
        ...prev,
        [story._id]: { count: res.likesCount, liked: res.liked },
      }))
      if (selected && selected._id === story._id) {
        setSelected({ ...selected }) // trigger re-render for modal
      }
    } catch (_) {
      // ignore for now
    }
  }

  return (
    <div className="container my-5">
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="m-0">Explore Stories</h2>
        <div className="dropdown">
          <button className="btn btn-light border dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-funnel"></i>
            {filter === 'all' && 'All Stories'}
            {filter === 'my' && 'My Stories'}
            {filter === 'popular' && 'Popular'}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><button className="dropdown-item" onClick={() => setFilter('all')}>All Stories</button></li>
            <li><button className="dropdown-item" onClick={() => setFilter('my')}>My Stories</button></li>
            <li><button className="dropdown-item" onClick={() => setFilter('popular')}>Popular</button></li>
          </ul>
        </div>
      </div>
      <div className="row mt-4">
        {list.length === 0 ? (
          <p>No stories found.</p>
        ) : (
          [...list]
            .filter((s) => {
              if (filter === 'my' && user) return s.userId === user._id
              return true
            })
            .sort((a, b) => {
              if (filter === 'popular') return (b.likesCount ?? 0) - (a.likesCount ?? 0)
              return 0
            })
            .map((story) => (
            <div key={story._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={story.image || 'https://picsum.photos/600/400'}
                  className="card-img-top"
                  alt="story"
                  style={{ height: 200, objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{story.title || 'Untitled'}</h5>
                  <p className="card-text text-muted">
                    {story.excerpt || ''}
                  </p>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <div className="d-flex align-items-center gap-2">
                      {story.user?.avatar ? (
                        <img
                          src={story.user.avatar}
                          alt={story.user?.name || 'User'}
                          className="rounded-circle"
                          style={{ width: 28, height: 28, objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: 28, height: 28, backgroundColor: 'var(--orange)', color: '#fff', fontSize: 12, fontWeight: 600 }}
                        >
                          {(story.user?.name || 'U').toUpperCase().charAt(0)}
                        </div>
                      )}
                      <span className="text-muted" style={{ fontSize: 13 }}>{story.user?.name || 'Unknown'}</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <button
                        type="button"
                        className="btn p-0 border-0 bg-transparent d-flex align-items-center"
                        aria-label="Like"
                        onClick={(e) => toggleLike(e, story)}
                      >
                        <i
                          className={likes[story._id]?.liked ? 'bi bi-heart-fill' : 'bi bi-heart'}
                          style={{ color: likes[story._id]?.liked ? 'var(--orange)' : '#6c757d', fontSize: 18, transition: 'transform 150ms ease' }}
                        />
                        <span className="ms-1 text-muted" style={{ fontSize: 14 }}>{likes[story._id]?.count ?? 0}</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-orange btn-sm"
                        onClick={() => setSelected(story)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {selected && (
        <>
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setSelected(null)}>
            <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selected.title || 'Untitled'}</h5>
                  <button type="button" className="btn-close" onClick={() => setSelected(null)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <img src={selected.image || 'https://picsum.photos/900/500'} alt="story" className="img-fluid rounded mb-3" />
                  <div className="d-flex align-items-center gap-2 mb-3">
                    {selected.user?.avatar ? (
                      <img src={selected.user.avatar} alt={selected.user?.name || 'User'} className="rounded-circle" style={{ width: 36, height: 36, objectFit: 'cover' }} />
                    ) : (
                      <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36, backgroundColor: 'var(--orange)', color: '#fff', fontSize: 14, fontWeight: 600 }}>
                        {(selected.user?.name || 'U').toUpperCase().charAt(0)}
                      </div>
                    )}
                    <span className="text-muted" style={{ fontSize: 14 }}>{selected.user?.name || 'Unknown'}</span>
                    <button
                      type="button"
                      className="btn p-0 ms-auto border-0 bg-transparent d-flex align-items-center"
                      aria-label="Like"
                      onClick={(e) => toggleLike(e, selected)}
                    >
                      <i
                        className={likes[selected._id]?.liked ? 'bi bi-heart-fill' : 'bi bi-heart'}
                        style={{ color: likes[selected._id]?.liked ? 'var(--orange)' : '#6c757d', fontSize: 20, transition: 'transform 150ms ease' }}
                      />
                      <span className="ms-1 text-muted" style={{ fontSize: 14 }}>{likes[selected._id]?.count ?? 0}</span>
                    </button>
                  </div>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{selected.excerpt || ''}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-orange" onClick={() => setSelected(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
