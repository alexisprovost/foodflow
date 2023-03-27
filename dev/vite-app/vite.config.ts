import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		https: true,
		hmr: {
			host: "localhost",
		},
		host: "0.0.0.0",
		port: 5173,
		proxy: {
			"/api": {
				target: "http://api:3000",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
		watch: {
			usePolling: true,
		},
	},
	plugins: [react(), mkcert()],
});
