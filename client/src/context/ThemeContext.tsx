import {createContext, useContext, useEffect, useState} from 'react'
//import { ReactNode } from "react";


interface ThemeContextType{
    theme:string;
    toggleTheme:()=>void;
}
const ThemeContext = createContext<ThemeContextType|undefined>(undefined);

export function ThemeProvider({children}: {children: React.ReactNode}){
    
    // const value: ThemeContextType = {
    //     theme: 'light',  
    //     toggleTheme: () => {}
    // };

    const [theme,setTheme]= useState(()=>
        localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme:dark)")
    .matches?"dark":"light"));

//update theme when satate changes
useEffect(()=>{
    const root=window.document.documentElement;
    root.classList.remove('light','dark');
    root.classList.add(theme)
    localStorage.setItem("theme",theme)}
,[theme]
)



// const toggleTheme=()=>{
//     setTheme((prev)=>(prev==='light' ?'light':'dark'))

// }
const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
};
    return<ThemeContext.Provider value={{theme,toggleTheme}}>
                {children}
    </ThemeContext.Provider>
}
export function useTheme(){
    const context =useContext(ThemeContext)
    if(context ===undefined){
        throw new Error('usetheme must be used within a themeprovider')
    }
    return context;
}