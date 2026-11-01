const RoomHeader = ({ title, meta, intro, name = false, children }) => (
  <header className="room-header">
    {title && (
      <h1 className={`page-title ${name ? "page-title--name" : ""}`}>
        {title}
      </h1>
    )}
    {meta && <p className="page-meta">{meta}</p>}
    {intro && <p className="page-intro">{intro}</p>}
    {children}
  </header>
);

export default RoomHeader;
