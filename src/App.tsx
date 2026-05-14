import { atom, DEFAULT_THEME, TLUserPreferences, Tldraw } from "tldraw";
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

const themes = {
  default: {
    ...DEFAULT_THEME,
    fonts: {
      ...DEFAULT_THEME.fonts,
      mono: {
        fontFamily: '"Iosevka", monospace',
        faces: [],
      },
    },
  },
} satisfies Partial<import("tldraw").TLThemes>;

export default function App() {
  useActivityPing();

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw persistenceKey="tldraw-local" user={user} themes={themes} />
    </div>
  );
}
