import { Activity,Home,Utensils, User } from 'lucide-react'
import { NavLink } from 'react-router'


const BottomNav = () => {

     const navItems =[
        {path:'/',label:'Home',icon:Home },
        {path:'/Food',label:'Food',icon:Utensils},
        {path:'/activity',label:'Activity',icon:Activity},
        {path:'/profile',label:'Profile',icon:User},

    ]
  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-slate-100
     dark:border-slate:800 px-4 pb-safe'>
        <div className='max-w-lg max-auto flex justify-around items-center h-16'>
            {navItems.map((item)=>(
                <NavLink key={item.path} to={item.path}
                className={({isActive })=>`flex flex-col items-center gap-1 px-4 py-2 rounded-xl ${isActive ?
                'text-emerald-600 dark:text-emerald-400' :'text-slate-400 dark:text-slate-500 hover:text-slate-600'}`}>
                    <item.icon className='size-5' />
                    <span className='text-xs font-medium'>{item.label}</span>
                </NavLink>
                ))}
        </div>
      
    </nav>
  )
}

export default BottomNav
