import { useState, useEffect } from "react"
import PatternLayout from "./PatternLayout"

// Problem: Fetch + UI mixed
function MixedProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users?_limit=4")
      .then(r => r.json())
      .then(data => setProducts(data.map(u => ({
        id: u.id, name: u.company.name, desc: u.company.catchPhrase, price: (u.id * 29.99).toFixed(2)
      }))))
      .finally(() => setLoading(false))
  }, [])
  if (loading) return <div className="d-flex align-items-center gap-2 small"><span className="spinner-border spinner-border-sm" /> Loading products...</div>
  return (
    <div className="row g-2">
      {products.map(p => (
        <div key={p.id} className="col-6">
          <div className="card h-100">
            <div className="card-body py-2">
              <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: "0.72rem", color: "#888" }}>{p.desc}</div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0d6efd", marginTop: 4 }}>${p.price}</div>
              <button className="btn btn-sm btn-primary mt-1" style={{ fontSize: "0.7rem" }}>Add to Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Solution: Separated
function ProductCard({ product }) {
  return (
    <div className="card h-100">
      <div className="card-body py-2">
        <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>{product.name}</div>
        <div style={{ fontSize: "0.72rem", color: "#888" }}>{product.desc}</div>
        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0d6efd", marginTop: 4 }}>${product.price}</div>
        <button className="btn btn-sm btn-primary mt-1" style={{ fontSize: "0.7rem" }}>Add to Cart</button>
      </div>
    </div>
  )
}

function ProductGrid({ products }) {
  return (
    <div className="row g-2">
      {products.map(p => <div key={p.id} className="col-6"><ProductCard product={p} /></div>)}
    </div>
  )
}

function ProductGridContainer() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users?_limit=4")
      .then(r => r.json())
      .then(data => setProducts(data.map(u => ({
        id: u.id, name: u.company.name, desc: u.company.catchPhrase, price: (u.id * 29.99).toFixed(2)
      }))))
      .finally(() => setLoading(false))
  }, [])
  if (loading) return <div className="d-flex align-items-center gap-2 small"><span className="spinner-border spinner-border-sm" /> Loading products...</div>
  return <ProductGrid products={products} />
}

function ProductGridMock() {
  const mockProducts = [
    { id: 101, name: "Premium Widget", desc: "Best-in-class performance", price: "49.99" },
    { id: 102, name: "Basic Widget", desc: "Great value starter pack", price: "19.99" },
  ]
  return <ProductGrid products={mockProducts} />
}

function ContainerPresentationalPattern() {
  return (
    <PatternLayout
      title="Container / Presentational"
      description="Separate data-fetching logic from pure UI for reusability and testability."
      whyPoints={[
        "UI components become pure -- easy to test with mock data, no network needed",
        "Same ProductCard works with API, mock data, Storybook, or test harness",
        "Swap fetch for GraphQL, WebSocket, or local state without touching UI",
        "Modern alternative: custom hooks replace containers, but the separation principle remains",
      ]}
      problem={
        <div>
          <div className="label-problem">Data fetching + UI tangled in one component:</div>
          <div className="code-demo-row">
            <div className="code-block">{`function MixedProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then(setProducts)
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="grid">
      {products.map(p => (
        <div className="card">
          <h3>{p.name}</h3>
          <p>{p.price}</p>
        </div>
      ))}
    </div>
  )
}

// Can't reuse cards with mock data
// Can't test UI without network
// Can't use in Storybook`}</div>
            <div className="demo-area">
              <MixedProductList />
              <p className="text-danger small mt-2 mb-0">Fetch + UI tightly coupled -- untestable without network</p>
            </div>
          </div>
        </div>
      }
      solution={
        <div>
          <div className="label-solution">Container fetches, Presentational renders -- decoupled:</div>
          <div className="code-demo-row">
            <div className="code-block">{`// Presentational -- pure UI, no fetch:
function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  )
}

// Container -- data logic only:
function ProductGridContainer() {
  const [products] = useFetch("/api/products")
  return <ProductGrid products={products} />
}

// Storybook / Test -- mock data:
<ProductGrid products={mockProducts} />`}</div>
            <div className="demo-area">
              <div style={{ fontSize: "0.75rem", fontWeight: 600, marginBottom: 4 }}>From API:</div>
              <ProductGridContainer />
              <div style={{ fontSize: "0.75rem", fontWeight: 600, marginBottom: 4, marginTop: 10 }}>Same UI with mock data (Storybook / tests):</div>
              <ProductGridMock />
              <p className="text-success small mt-2 mb-0">Same ProductGrid, different data sources -- fully decoupled</p>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default ContainerPresentationalPattern
