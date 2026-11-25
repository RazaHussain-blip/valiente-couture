/** Woven label used above section headings (drawn in CSS, see "Textile details"). */
export function FabricLabel({ children, as: Tag = "p", className = "" }) {
  return <Tag className={`fabric-label ${className}`}>{children}</Tag>;
}
