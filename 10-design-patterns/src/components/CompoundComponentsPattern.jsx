import { useState, createContext, useContext } from "react"
import PatternLayout from "./PatternLayout"

// Problem: Rigid tabs — all config via data array
function RigidTabs({ tabs, activeIndex, onTabChange }) {
  return (
    <div>
      <div style={{ display: "flex", borderBottom: "2px solid #dee2e6" }}>
        {tabs.map((tab, i) => (
          <button key={i}
            style={{ padding: "8px 16px", border: "none", borderBottom: activeIndex === i ? "2px solid #0d6efd" : "2px solid transparent", background: "none", fontWeight: activeIndex === i ? 600 : 400, color: activeIndex === i ? "#0d6efd" : "#666", cursor: "pointer", fontSize: "0.85rem" }}
            onClick={() => onTabChange(i)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ padding: "12px 0", fontSize: "0.85rem" }}>{tabs[activeIndex]?.content}</div>
    </div>
  )
}

// Solution: Compound Components
const TabsCtx = createContext()

function Tabs({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const tabs = []
  const panels = []

  children.forEach((child) => {
    if (child.type === Tabs.Tab) tabs.push(child)
    if (child.type === Tabs.Panel) panels.push(child)
  })

  return (
    <TabsCtx.Provider value={{ activeIndex, setActiveIndex }}>
      <div>
        <div style={{ display: "flex", borderBottom: "2px solid #dee2e6" }}>
          {tabs.map((tab, i) => (
            <button key={i}
              style={{ padding: "8px 16px", border: "none", borderBottom: activeIndex === i ? "2px solid #0d6efd" : "2px solid transparent", background: "none", fontWeight: activeIndex === i ? 600 : 400, color: activeIndex === i ? "#0d6efd" : "#666", cursor: "pointer", fontSize: "0.85rem" }}
              onClick={() => setActiveIndex(i)}>
              {tab.props.children}
            </button>
          ))}
        </div>
        <div style={{ padding: "12px 0", fontSize: "0.85rem" }}>
          {panels[activeIndex]}
        </div>
      </div>
    </TabsCtx.Provider>
  )
}

Tabs.Tab = function Tab({ children }) { return <>{children}</> }
Tabs.Panel = function Panel({ children }) { return <div>{children}</div> }

function CompoundComponentsPattern() {
  const [tab, setTab] = useState(0)

  const rigidTabs = [
    { label: "Description", content: <p>Premium wireless headphones with 30hr battery life, ANC, and Bluetooth 5.2.</p> },
    { label: "Reviews (128)", content: <p>"Best headphones I've owned!" -- 4.5/5 stars avg</p> },
    { label: "Shipping", content: <p>Free shipping on orders over $50. Delivers in 3-5 business days.</p> },
  ]

  return (
    <PatternLayout
      title="Compound Components"
      description="Related components share implicit state via Context -- flexible, composable APIs."
      whyPoints={[
        "Avoids prop explosion -- no more showIcon, disabledTabs, renderTab, onTabRender...",
        "Sub-components communicate via Context implicitly -- consumers don't manage wiring",
        "Consumers compose only what they need -- skip a tab, add an icon, reorder freely",
        "Used by Radix UI, Headless UI, Reach UI, and Material UI",
      ]}
      problem={
        <div>
          <div className="label-problem">Rigid tabs -- everything through config arrays:</div>
          <div className="code-demo-row">
            <div className="code-block">{`<RigidTabs
  tabs={[
    { label: "Description", content: <p>...</p> },
    { label: "Reviews", content: <p>...</p> },
    { label: "Shipping", content: <p>...</p> },
  ]}
  activeIndex={tab}
  onTabChange={setTab}
/>

// Want an icon on a tab? Add iconProp
// Want to disable a tab? Add disabledProp
// Want a badge? Add badgeProp
// Every feature = another prop`}</div>
            <div className="demo-area">
              <RigidTabs tabs={rigidTabs} activeIndex={tab} onTabChange={setTab} />
            </div>
          </div>
        </div>
      }
      solution={
        <div>
          <div className="label-solution">Composable tabs -- build exactly what you need:</div>
          <div className="code-demo-row">
            <div className="code-block">{`<Tabs defaultIndex={0}>
  <Tabs.Tab>Description</Tabs.Tab>
  <Tabs.Tab>Reviews (128)</Tabs.Tab>
  <Tabs.Tab>Shipping</Tabs.Tab>

  <Tabs.Panel>
    <p>Premium wireless headphones...</p>
  </Tabs.Panel>
  <Tabs.Panel>
    <StarRating /> {/* Any JSX! */}
  </Tabs.Panel>
  <Tabs.Panel>
    <ShippingCalculator />
  </Tabs.Panel>
</Tabs>`}</div>
            <div className="demo-area">
              <Tabs defaultIndex={0}>
                <Tabs.Tab>Description</Tabs.Tab>
                <Tabs.Tab>Reviews (128)</Tabs.Tab>
                <Tabs.Tab>Shipping</Tabs.Tab>
                <Tabs.Panel>
                  <p style={{ margin: 0 }}>Premium wireless headphones with <strong>30hr battery</strong>, Active Noise Cancellation, and Bluetooth 5.2.</p>
                  <p style={{ margin: "6px 0 0", color: "#0d6efd", fontWeight: 600 }}>$249.99</p>
                </Tabs.Panel>
                <Tabs.Panel>
                  <div style={{ display: "flex", gap: 4, color: "#f59e0b", marginBottom: 4 }}>{"*****"}</div>
                  <p style={{ margin: 0 }}>"Best headphones I've ever owned! Crystal clear audio." -- <em>Sarah K.</em></p>
                  <p style={{ margin: "4px 0 0", color: "#888", fontSize: "0.78rem" }}>128 reviews | 4.5/5 average</p>
                </Tabs.Panel>
                <Tabs.Panel>
                  <p style={{ margin: 0 }}>Free shipping on orders over $50.</p>
                  <p style={{ margin: "4px 0 0" }}>Express (1-2 days): <strong>$9.99</strong></p>
                  <p style={{ margin: "4px 0 0" }}>Standard (3-5 days): <strong>FREE</strong></p>
                </Tabs.Panel>
              </Tabs>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default CompoundComponentsPattern
