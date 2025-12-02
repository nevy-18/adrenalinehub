export default function SearchPage({ searchParams }) {
  // This grabs the ?q=... from the URL
  const query = searchParams.q; 

  return (
    <div className="pt-32 px-8 text-white">
      <h1 className="text-3xl font-bold">Search Results</h1>
      <p>You searched for: <span className="text-cyan-400">{query}</span></p>
      </div>
  )
}