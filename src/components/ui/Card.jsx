export function Card({ title, subtitle, tools, children, padded = true, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {(title || tools) && (
        <div className="card-head">
          <div>
            {title && <div className="card-title">{title}</div>}
            {subtitle && <div className="card-sub">{subtitle}</div>}
          </div>
          {tools && <div className="card-tools">{tools}</div>}
        </div>
      )}
      <div className={padded ? 'card-pad' : ''}>{children}</div>
    </div>
  )
}
