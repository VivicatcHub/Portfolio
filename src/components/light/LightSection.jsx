const LightSection = ({ title, subtitle, children }) => (
  <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
    {title && (
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
        <div className="mt-3 h-1 w-16 rounded-full bg-ayu-purple" />
        {subtitle && <p className="mt-4 text-gray-500 max-w-2xl">{subtitle}</p>}
      </div>
    )}
    {children}
  </section>
);

export default LightSection;
