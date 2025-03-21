const ResearchContent = () => (
  <div className="p-8 max-w-7xl mx-auto animate-content-fade">
    <h3 className="text-2xl font-semibold mb-6 text-primary">Research Platform</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-base-100 p-6 rounded-xl border border-base-content/10">
        <h4 className="text-lg font-medium mb-4 text-base-content">Academic Research</h4>
        <p className="text-base-content/80">
          Access powerful simulation tools designed specifically for academic research and analysis.
        </p>
      </div>
      <div className="bg-base-100 p-6 rounded-xl border border-base-content/10">
        <h4 className="text-lg font-medium mb-4 text-base-content">Data Collaboration</h4>
        <p className="text-base-content/80">
          Collaborate with other researchers and share findings through our platform.
        </p>
      </div>
    </div>
  </div>
);

export default ResearchContent; 