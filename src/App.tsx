import { atom, TLUserPreferences, Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useActivityPing } from "./useActivityPing";

const userPreferences = atom<TLUserPreferences>("tldraw-local-prefs", {
  id: "tldraw-local",
  colorScheme: "dark",
});

const user = {
  userPreferences,
  setUserPreferences: (prefs: TLUserPreferences) => userPreferences.set(prefs),
};

export default function App() {
  useActivityPing();

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw persistenceKey="tldraw-local" user={user} />
    </div>
  );
}
