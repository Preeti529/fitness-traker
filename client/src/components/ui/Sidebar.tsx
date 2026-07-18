
import { HomeIcon, UtensilsIcon, ActivityIcon, UserIcon, MoonIcon, SunIcon, PersonStandingIcon } from "lucide-react"
import { useTheme } from "../../context/ThemeContext"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
    const navItems = [
        { path: '/', label: 'Home', icon: HomeIcon },
        { path: '/Food', label: 'Food', icon: UtensilsIcon },
        { path: '/activity', label: 'Activity', icon: ActivityIcon },
        { path: '/profile', label: 'Profile', icon: UserIcon },
    ]

    const { theme, toggleTheme } = useTheme()

    return (
        <>
            {/* Desktop Sidebar */}
            <nav className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 p-4 min-h-screen">
                <div className="flex items-center gap-3 mb-8">
                    <div className="size-10 rounded-xl bg-emerald-500 flex items-center justify-center"><PersonStandingIcon className="size-5 text-white" />
                        {/* <span className="text-white font-bold text-lg">F</span> */}
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">fitTrack</h1>
                </div>

                <div className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <NavLink key={item.path} to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2.5 border-l-4 transition-all duration-200 ${isActive
                                    ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 border-emerald-500'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-300 border-transparent'
                                }`}>
                             <item.icon className="size-5" />
                            <span className="text-base">{item.label}</span>
                        </NavLink>
                    ))}
                </div>

                <div className="mt-auto border-t dark:border-slate-700 pt-2">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-700 dark:hover:text-slate-300 rounded-md px-4 py-2.5 transition-colors duration-200 w-full"
                    >
                        {theme === 'light' ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
                        <span className="text-base">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                    </button>
                </div>
            </nav>

            {/* Mobile Bottom Nav */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-around px-2 py-2">
                    {navItems.map((item) => (
                        <NavLink key={item.path} to={item.path}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${isActive
                                    ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                                    : 'text-slate-400 dark:text-slate-500'
                                }`}
                        >
                            <item.icon className="size-5" />
                            <span className="text-xs">{item.label}</span>
                         </NavLink>
                    ))}

                    {/* Theme toggle in mobile nav */}
                    <button
                        onClick={toggleTheme}
                        className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-slate-400 dark:text-slate-500 transition-all duration-200"
                    >
                        {theme === 'light' ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
                        <span className="text-xs">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Sidebar 

















