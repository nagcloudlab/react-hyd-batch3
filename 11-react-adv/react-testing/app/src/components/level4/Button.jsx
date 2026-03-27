// LEVEL 4 — Reusable Component
export default function Button({ label, onClick, disabled = false, variant = "primary" }) {
  const base = "px-4 py-2 rounded-lg font-medium transition-colors";
  const styles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {label}
    </button>
  );
}
