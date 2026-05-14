import { createServer } from "vite";

// NOTE: keep INACTIVITY_TIMEOUT > frontend PING_INTERVAL (useActivityPing.ts)
const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const CHECK_INTERVAL = 60 * 1000; // check every minute

const server = await createServer({
  configFile: "./vite.config.ts",
  plugins: [
    {
      name: "activity-ping",
      configureServer(s) {
        s.middlewares.use("/_ping", (req, res, next) => {
          if (req.method === "POST") {
            markActive();
            res.statusCode = 204;
            res.end();
          } else {
            next();
          }
        });
      },
    },
  ],
});

await server.listen();

let lastActivity = Date.now();

function markActive() {
  lastActivity = Date.now();
}

// Only explicit pings count as activity. Ignore all other HTTP traffic.

const checkInterval = setInterval(() => {
  const idleMs = Date.now() - lastActivity;
  if (idleMs > INACTIVITY_TIMEOUT) {
    console.log(
      `No activity for ${Math.round(idleMs / 60000)}min. Shutting down...`,
    );
    clearInterval(checkInterval);
    server.close().then(() => process.exit(0));
  }
}, CHECK_INTERVAL);

markActive();
console.log(
  `Managed dev server running on port ${server.config.server.port}. ` +
    `Auto-shutdown after ${INACTIVITY_TIMEOUT / 60000}min of inactivity.`,
);
