export const initTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
        document.documentElement.classList.add("dark");
    }
};

export const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
};
