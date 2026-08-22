export default function Footer() {
  return (
    <footer className="bg-navy-800 text-sand/70 mt-20">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-12 text-center">
        <p className="font-display italic text-2xl text-sand mb-2">Marsa Estates</p>
        <p className="text-sm text-sand/50 max-w-sm mx-auto mb-6">
          Homes across Cairo and the coast, listed clearly, no surprises.
        </p>
        <p className="text-xs text-sand/30">
          © {new Date().getFullYear()} Marsa Estates. A fictional agency built for portfolio purposes.
        </p>
      </div>
    </footer>
  );
}
