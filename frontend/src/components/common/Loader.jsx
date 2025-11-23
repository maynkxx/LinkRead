const Loader = ({ fullScreen = false, message = "Loading..." }) => {
  const wrapperClass = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-black/60 z-50"
    : "flex items-center justify-center py-8";

  return (
    <div className={wrapperClass}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gray-500 border-t-white rounded-full animate-spin" />
        {message && (
          <p className="text-sm text-gray-300">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;
