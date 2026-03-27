import PatternLayout from "./PatternLayout"

// Problem: Rigid widget -- all via string props
function RigidWidget({ title, subtitle, value, unit, trend, actionText }) {
  return (
    <div className="card mb-2">
      <div className="card-body py-2">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div style={{ fontSize: "0.7rem", color: "#888", textTransform: "uppercase" }}>{title}</div>
            {subtitle && <div style={{ fontSize: "0.68rem", color: "#aaa" }}>{subtitle}</div>}
          </div>
          {trend && <span className={`badge ${trend === "up" ? "bg-success" : "bg-danger"}`}>{trend === "up" ? "+12%" : "-5%"}</span>}
        </div>
        <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{value} <span style={{ fontSize: "0.75rem", color: "#888" }}>{unit}</span></div>
        {actionText && <button className="btn btn-sm btn-primary mt-1">{actionText}</button>}
      </div>
    </div>
  )
}

// Solution: Slot Pattern
function Widget({ header, children, footer }) {
  return (
    <div className="card mb-2">
      {header && <div className="card-header py-2" style={{ fontSize: "0.82rem" }}>{header}</div>}
      <div className="card-body py-2">{children}</div>
      {footer && <div className="card-footer py-2">{footer}</div>}
    </div>
  )
}

function SlotPattern() {
  return (
    <PatternLayout
      title="Slot Pattern"
      description="Accept JSX via named props (header, children, footer) for infinitely flexible layouts."
      whyPoints={[
        "Components accept any JSX in named slots -- no new props needed, ever",
        "Inspired by Web Components <slot> and Vue's named slots",
        "Consumers independently control each section -- header, body, footer, sidebar",
        "Perfect for dashboard widgets, cards, modals, page layouts, dialog boxes",
      ]}
      problem={
        <div>
          <div className="label-problem">Rigid widget -- every variation needs a new prop:</div>
          <div className="code-demo-row">
            <div className="code-block">{`<RigidWidget
  title="Revenue"
  subtitle="This month"
  value="$34,200"
  unit="USD"
  trend="up"
  actionText="View Report"
/>

// Want a chart in the body? Add chartProp
// Want 2 buttons in footer? Add secondaryAction
// Want an avatar in header? Add avatarProp
// Props. Keep. Growing.`}</div>
            <div className="demo-area">
              <RigidWidget title="Revenue" subtitle="This month" value="$34,200" unit="USD" trend="up" actionText="View Report" />
              <RigidWidget title="Active Users" value="1,247" unit="users" trend="down" />
              <p className="text-danger small mb-0">Want a chart? A progress bar? Need more props every time.</p>
            </div>
          </div>
        </div>
      }
      solution={
        <div>
          <div className="label-solution">Slots accept any JSX -- infinitely composable:</div>
          <div className="code-demo-row">
            <div className="code-block">{`<Widget
  header={
    <div className="d-flex justify-content-between">
      <strong>Revenue</strong>
      <Badge>+12%</Badge>
    </div>
  }
  footer={
    <div className="d-flex gap-2">
      <Button>View Report</Button>
      <Button>Export CSV</Button>
    </div>
  }
>
  <h3>$34,200</h3>
  <ProgressBar value={78} />
  <small>78% of monthly goal</small>
</Widget>`}</div>
            <div className="demo-area">
              <Widget
                header={<div className="d-flex justify-content-between align-items-center"><strong>Revenue</strong><span className="badge bg-success">+12%</span></div>}
                footer={<div className="d-flex gap-2"><button className="btn btn-sm btn-primary">View Report</button><button className="btn btn-sm btn-outline-secondary">Export CSV</button></div>}
              >
                <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>$34,200 <span style={{ fontSize: "0.75rem", color: "#888" }}>USD</span></div>
                <div className="progress mt-1" style={{ height: 6 }}><div className="progress-bar bg-success" style={{ width: "78%" }} /></div>
                <small className="text-muted">78% of $44,000 monthly goal</small>
              </Widget>
              <Widget
                header={<div className="d-flex justify-content-between align-items-center"><strong>Active Users</strong><span className="badge bg-danger">-5%</span></div>}
                footer={<small className="text-muted">Updated 2 min ago</small>}
              >
                <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>1,247 <span style={{ fontSize: "0.75rem", color: "#888" }}>users</span></div>
                <div className="d-flex gap-1 mt-1">
                  <span className="badge bg-primary">Desktop: 820</span>
                  <span className="badge bg-info">Mobile: 427</span>
                </div>
              </Widget>
              <p className="text-success small mb-0">Any JSX in any slot -- badges, charts, buttons, forms. No new props.</p>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default SlotPattern
