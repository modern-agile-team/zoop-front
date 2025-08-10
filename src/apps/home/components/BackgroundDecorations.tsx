export default function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full animate-bounce"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-green-300 rounded-full animate-ping"></div>
      <div className="absolute bottom-32 right-32 w-8 h-8 bg-pink-300 rounded-full animate-pulse"></div>
    </div>
  );
}
