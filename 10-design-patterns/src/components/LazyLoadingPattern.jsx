import { useState, useRef, useEffect } from "react"
import PatternLayout from "./PatternLayout"

const imageIds = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]

// Problem: All images load eagerly
function EagerGallery() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
        {imageIds.map(id => (
          <div key={id} style={{ borderRadius: 6, overflow: "hidden", aspectRatio: "4/3" }}>
            <img src={`https://picsum.photos/200/150?random=${id}`} alt="" width="100%" style={{ display: "block", objectFit: "cover", height: "100%" }} />
          </div>
        ))}
      </div>
      <p className="text-danger small mt-2 mb-0">All 12 images fetched on page load -- 600KB+ wasted bandwidth for off-screen images</p>
    </div>
  )
}

// Solution: IntersectionObserver lazy loading
function LazyImage({ src, alt }) {
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.unobserve(el) }
    }, { rootMargin: "100px" })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ borderRadius: 6, overflow: "hidden", aspectRatio: "4/3", background: "#e2e8f0" }}>
      {inView ? (
        <img src={src} alt={alt} width="100%" onLoad={() => setLoaded(true)}
          style={{ display: "block", objectFit: "cover", height: "100%", opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }} />
      ) : (
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: "0.7rem" }}>Loading...</div>
      )}
    </div>
  )
}

function LazyGallery() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
        {imageIds.map(id => (
          <LazyImage key={id} src={`https://picsum.photos/200/150?random=${id + 1}`} alt={`Product ${id}`} />
        ))}
      </div>
      <p className="text-success small mt-2 mb-0">Images load only when scrolled into view -- with smooth fade-in. Check Network tab!</p>
    </div>
  )
}

function LazyLoadingPattern() {
  return (
    <PatternLayout
      title="Lazy Loading"
      description="Defer off-screen content using IntersectionObserver until it's needed."
      whyPoints={[
        "Saves bandwidth -- off-screen images and widgets are not fetched until visible",
        "Improves initial page load time and Largest Contentful Paint (LCP) metric",
        "IntersectionObserver is native browser API, performant, and non-blocking",
        "Combine with fade-in transitions and loading placeholders for polished UX",
      ]}
      problem={
        <div>
          <div className="label-problem">All product images loaded eagerly on page mount:</div>
          <div className="code-demo-row">
            <div className="code-block">{`function ProductGallery({ images }) {
  return (
    <div className="grid">
      {images.map(img => (
        <img src={img.url} alt={img.name} />
      ))}
    </div>
  )
}

// 12 images x ~50KB = 600KB on page load
// User sees only 4 above the fold
// 8 images wasted on first load
// Slow on mobile / 3G connections`}</div>
            <div className="demo-area"><EagerGallery /></div>
          </div>
        </div>
      }
      solution={
        <div>
          <div className="label-solution">IntersectionObserver loads images only when visible:</div>
          <div className="code-demo-row">
            <div className="code-block">{`function LazyImage({ src, alt }) {
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.unobserve(ref.current)
        }
      },
      { rootMargin: "100px" }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {inView
        ? <img src={src}
            onLoad={() => setLoaded(true)}
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.5s"
            }} />
        : <Placeholder />
      }
    </div>
  )
}`}</div>
            <div className="demo-area"><LazyGallery /></div>
          </div>
        </div>
      }
    />
  )
}

export default LazyLoadingPattern
