// ✅ Step 1: Load from localStorage (already doing this)
window.userSettings = JSON.parse(localStorage.getItem("userSettings")) || {
  Layout: "vertical",
  SidebarType: "full",
  BoxedLayout: true,
  Direction: "ltr",
  Theme: "light",
  ColorTheme: "Blue_Theme",
  cardBorder: false,
};

// ✅ Step 2: Helper - settings update + localStorage save
function updateSetting(key, value) {
  userSettings[key] = value;
  localStorage.setItem("userSettings", JSON.stringify(userSettings));
} 