export default function Navbar() {
  <button
  onClick={() =>
    document.documentElement.classList.toggle("dark")
  }
  className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg"
>
  Toggle Theme
</button>

    return (
    <div className="bg-white/70 backdrop-blur-xl border border-gray-200 shadow-sm p-5 flex justify-between items-center rounded-2xl">

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Project Dashboard
        </h2>
        <p className="text-gray-500 text-sm">
          Manage your workflow efficiently
        </p>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location = "/";
        }}
        className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition shadow-md"
      >
        Logout
      </button>
    </div>
    
  );
  
}
