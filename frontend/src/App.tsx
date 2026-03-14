import { IconButton } from "@mui/material";
import logoUrl from "./assets/penguin.svg";
import DashboardPage from "./entities/pages/DashboardPage";

function App() {
  return (
    <div className="min-h-screen w-screen text-white">
      <nav className="flex w-full items-center justify-between bg-gray-800 py-2 px-4">
        <div className="text-xl font-bold tracking-wide">Club Penguin</div>

        <IconButton
          sx={{
            width: 40,
            height: 40,
            p: 0.5,
          }}
        >
          <img
            src={logoUrl}
            alt="Logo"
            className="h-full w-full object-contain"
          />
        </IconButton>
      </nav>

      <main className="w-full">
        <DashboardPage />
      </main>
    </div>
  );
}

export default App;
