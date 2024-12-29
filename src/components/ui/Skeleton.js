function Skeleton({ className }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ animationDuration: "2s" }}
    />
  );
}

export default Skeleton;

