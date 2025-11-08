export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">PinealVision</h1>
        <p className="text-gray-600 mb-6">3rd Eye CrossTraining</p>
        <a href="/login" className="bg-purple-600 text-white px-6 py-3 rounded-lg">
          Enter the Vision
        </a>
      </div>
    </div>
  );
}
