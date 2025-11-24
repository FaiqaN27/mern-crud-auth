import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    // ✅ Proxy only in development
    server:
      env.NODE_ENV === "development"
        ? {
            proxy: {
              "/api": {
                target: "http://localhost:3000",
                secure: false,
                changeOrigin: true,
              },
            },
          }
        : undefined,
  };
});
