import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header className="bg-slate-800">
        <div className="mx-auto max-w-6xl py-10">
          <h1 className="text-4xl font-extrabold text-white text-center">
            Product management
          </h1>
        </div>
      </header>
      {/* Outlet is the view for the other files such as home, about, etc */}
      <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
