const styles = {
  wrapper: {
    textAlign: "left",
  },
  titleRow: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
    marginBottom: 6,
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: "#1a1a2e",
    margin: 0,
  },
  description: {
    fontSize: "1rem",
    color: "#666",
    margin: "0 0 12px",
    lineHeight: 1.6,
  },
  whyBox: {
    background: "linear-gradient(135deg, #eff6ff, #f0f9ff)",
    border: "1px solid #bfdbfe",
    borderRadius: 10,
    padding: "14px 18px",
    marginBottom: 20,
  },
  whyTitle: {
    fontSize: "0.85rem",
    fontWeight: 700,
    color: "#1e40af",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  whyList: {
    margin: 0,
    paddingLeft: 20,
    fontSize: "0.95rem",
    color: "#334155",
    lineHeight: 1.8,
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  card: (type) => ({
    borderRadius: 12,
    overflow: "hidden",
    border: `1.5px solid ${type === "problem" ? "#fca5a5" : "#86efac"}`,
    background: "white",
    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
  }),
  cardHeader: (type) => ({
    padding: "10px 16px",
    fontWeight: 700,
    fontSize: "0.95rem",
    letterSpacing: 0.5,
    background: type === "problem"
      ? "linear-gradient(135deg, #dc2626, #ef4444)"
      : "linear-gradient(135deg, #16a34a, #22c55e)",
    color: "white",
  }),
  cardBody: {
    padding: 20,
    fontSize: "0.95rem",
    lineHeight: 1.6,
  },
}

function PatternLayout({ title, description, whyPoints, problem, solution }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.titleRow}>
        <h2 style={styles.title}>{title}</h2>
      </div>
      {description && <p style={styles.description}>{description}</p>}

      {whyPoints && whyPoints.length > 0 && (
        <div style={styles.whyBox}>
          <div style={styles.whyTitle}>Why this pattern?</div>
          <ul style={styles.whyList}>
            {whyPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={styles.stack}>
        <div style={styles.card("problem")}>
          <div style={styles.cardHeader("problem")}>PROBLEM</div>
          <div style={styles.cardBody}>{problem}</div>
        </div>

        <div style={styles.card("solution")}>
          <div style={styles.cardHeader("solution")}>SOLUTION -- {title}</div>
          <div style={styles.cardBody}>{solution}</div>
        </div>
      </div>
    </div>
  )
}

export default PatternLayout
