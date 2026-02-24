export default function DashboardCard({ title, subtitle, children, bgColor = "white" }) {
  return (
    <div style={styles.outer}>
      <div style={{ ...styles.card, background: bgColor }}>
        {title && <h1 style={styles.title}>{title}</h1>}
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}

const styles = {
  outer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",      // ensures vertical center
    width: "100vw",           // full width
    padding: "20px",
    background: "linear-gradient(135deg, #667eea, #764ba2)", // same background
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "1000px",        // card max width
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: { marginBottom: "10px", fontSize: "1.8rem", color: "#333" },
  subtitle: { marginBottom: "20px", fontSize: "1rem", color: "#555" },
};