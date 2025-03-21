const DeveloperContent = () => (
  <div className="p-8 max-w-7xl mx-auto animate-content-fade">
    <h3 className="text-2xl font-semibold mb-6 text-primary">Developer Resources</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-base-100 p-6 rounded-xl border border-base-content/10">
        <h4 className="text-lg font-medium mb-4 text-base-content">API Integration</h4>
        <p className="text-base-content/80">
          Seamlessly integrate our simulation engine into your applications with our robust API.
        </p>
      </div>
      <div className="bg-base-100 p-6 rounded-xl border border-base-content/10">
        <h4 className="text-lg font-medium mb-4 text-base-content">Custom Models</h4>
        <p className="text-base-content/80">
          Build and deploy custom simulation models using our developer toolkit.
        </p>
      </div>
    </div>
  </div>
);

export default DeveloperContent; 