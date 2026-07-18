import { Ruler } from "lucide-react";
import { ScaleIcon } from "lucide-react";
import { Scale, TrendingUpIcon, ZapIcon } from "lucide-react";
import { getMotivationalMessage } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import type { ActivityEntry, FoodEntry } from "../types";
import ProgressBar from "../components/ui/ProgressBar";
import { Activity, FlameIcon, HamburgerIcon } from "lucide-react";
import CaloriesChart from "../assets/CaloriesChart";
//import { text } from "stream/consumers";

const Dashboard = () => {
  const { user, allActivityLogs, allFoodLogs } = useAppContext();
  const [todayFood, setTodayFood] = useState<FoodEntry[]>([]);
  const [todayActivity, setTodayActivity] = useState<ActivityEntry[]>([]);

  const DAILY_CALORIE_LIMIT: number = user?.dailyCalorieIntake || 2000;

  const loadUserData = () => {
    const today = new Date().toISOString().split('T')[0];
    const FoodData = allFoodLogs.filter((f: FoodEntry) => f.createdAt?.split('T')[0] === today);
    setTodayFood(FoodData);
    const ActivityData = allActivityLogs.filter((a: any) => a.createdAt?.split('T')[0] === today);
    setTodayActivity(ActivityData);
  };

  useEffect(() => {
    if (!allFoodLogs || !allActivityLogs) return;
    (() => { loadUserData(); })();
  }, [allActivityLogs, allFoodLogs]);

  const totalCalories: number = todayFood.reduce((sum, item) => sum + (item.calories ?? 0), 0);
  const remainingCalories: number = DAILY_CALORIE_LIMIT - totalCalories;
  const totalActivityMinutes: number = todayActivity.reduce((sum, item) => sum + (item.duration ?? 0), 0);
  const totalBurned: number = todayActivity.reduce((sum, items) => sum + (items.calories ?? 0), 0);

  if (!user) return null;

  const motivation = getMotivationalMessage(totalCalories, totalActivityMinutes, DAILY_CALORIE_LIMIT);

  return (
    <div className="page-container">
      {/* header */}
      <div className="dashboard-header">
        <p className="text-emerald-100 text-sm font-medium">Welcome to your dashboard</p>
        <h1 className="text-2xl font-bold mt-1">{`hi there! ${user?.username}`}</h1>

        {/* motivational card */}
        <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-3">{motivation.emoji}</span>
            <p className="text-white font-medium">{motivation.text}</p>
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="dashboard-grid">
        {/* calories card */}
        <Card className="shadow-lg col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100/50 rounded-full flex items-center justify-center">
                <HamburgerIcon className='w-6 h-6 text-orange-500'/>
                
              </div>
              <div>
                <p className="text-sm text-slate-500 
                dark:text-slate-400">calories Consumed</p>
                <p className="text-2xl
                 font-bold">{totalCalories}</p>
              </div>


            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 dark:text-slate-400">limit</p>
              <p className="text-2xl font-bold">{DAILY_CALORIE_LIMIT}</p>


            </div>
          </div>

          <ProgressBar value={totalCalories} max={DAILY_CALORIE_LIMIT} />

          <div className="flex items-center justify-between mb-4">
            <div className={`px-3 py-1.5 rounded-lg ${remainingCalories >=0 ?
               'bg-emerald-50 dark:bg-emerald-900/10 text-red-700 dark:text-red-400':
                'bg-red-100 dark:bg-red-900/10 text-red-700 dark:text-red-400'}`}>
              <span className="text-sm font-medium">
                 {remainingCalories>=0?`${remainingCalories} kcal remaining` :`${Math.abs(remainingCalories)}kcal over`}
              </span>
            </div>
            <span>{Math.round((totalCalories/DAILY_CALORIE_LIMIT) * 100)}%</span>
          </div>



          <div className="border-t border-slate-200 dark:border-slate-600 my-4"></div>

          <div className="flex items-center justify-between mb-4">

<div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100/50 rounded-full flex items-center justify-center">
                <FlameIcon className='w-6 h-6 text-orange-500'/>
                
              </div>
              <div>
                <p className="text-sm text-slate-500 
                dark:text-slate-400">calories burned</p>
                <p className="text-2xl
                 font-bold">{totalBurned}</p>
              </div>

              
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500 dark:text-slate-400">goal</p>
              <p className="text-2xl font-bold">{user?.dailyCalorieBurn || 400}</p>


            </div>
          </div>


          <ProgressBar value={totalBurned} max={user?.dailyCalorieBurn || 400} />
        </Card>

        {/* stats row */}
        <div className="dashboard-card-grid">
{/* active minutes */}
  <Card>
    <div className="flex items-center gap-3 mb-4">
      {/* <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center"></div> */}

<div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
  <Activity  className='w-5 h-5 text-blue-500'/>
</div>
<p className="text-sm text-slate-500 dark:text-slate-400">Active</p>
      </div>
      <p className="text-2xl font-bold">{totalActivityMinutes}</p>
      <p>minutes today</p>

  </Card>

{/* active count */}
  <Card>
    <div className="flex items-center gap-3 mb-4">
      {/* <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center"></div> */}

<div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
  <ZapIcon className='w-5 h-5 text-purple-500'/>
</div>
<p className="text-sm text-slate-500 dark:text-slate-400">workout</p>
      </div>
      <p className="text-2xl font-bold">{todayActivity.length}</p>
      <p>activities logged</p>

  </Card>

        </div>

{/* goal card */}
       

<Card className="bg-gradient-to-r from-slate-800 to-slate-700">
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
      <TrendingUpIcon className="w-6 h-6 text-emerald-400" />
    </div>

    <div>
      <p className="text-slate-300 text-sm">
        Your Goal
      </p>

      <p className="text-white font-semibold text-lg">
        {user?.goal || "Maintain Weight"}
      </p>

      <p className="text-slate-400 text-sm mt-1">
        Track your progress every day.
      </p>
    </div>
  </div>
</Card>

{/* body matrces card */}

{user && user.weight &&(
  <Card>
    <div className="flex items-center gap-4 mb-6">
<div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
<Scale className="w-6 h-6 text-indigo-500" />
    </div>
    <div>
      <h3 className="font-semibold text-slate-800 dark:text-white">
        body matrices 
      </h3>
      <p className="text-slate-500 text-sm">your status</p>
    </div>
    </div>


<div className="space-y-4">
  <div className="flex justify-between items-center">
<div className="flex items-center gap-2">
<div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
  <ScaleIcon  className="w-4 h-4 text-slate-500" />
</div>
<span className="text-sm text-slate-500 dark:text-slate-400">weight</span>
</div>
<span className="text-sm text-slate-500 dark:text-slate-400">{user.weight} kg</span>
  </div>
  {user.height &&(
    <div className="flex justify-between items-center">
<div className="flex items-center gap-2">
<div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
  <Ruler className="w-4 h-4 text-slate-500" />
</div>
<span className="text-sm text-slate-500 dark:text-slate-400">Height</span>
</div>
<span className="text-sm text-slate-500 dark:text-slate-400">{user.height} cm</span>
  </div>

  )}

{user.height && (
  <div className="pt-2 border-t border-slate-200 dark:border-slate-600">

    <div className="flex justify-between items-center mb-2">
      <span className="text-sm text-slate-500 dark:text-slate-400">
        BMI
      </span>

      {(() => {
        const bmi = (
          user.weight / Math.pow(user.height / 100, 2)
        ).toFixed(1);

        const getStatus = (b: number) => {
          if (b < 18.5)
            return {
              color: "text-blue-500",
              bg: "bg-blue-500",
            };

          if (b < 25)
            return {
              color: "text-emerald-500",
              bg: "bg-emerald-500",
            };

          if (b < 30)
            return {
              color: "text-orange-500",
              bg: "bg-orange-500",
            };

          return {
            color: "text-red-500",
            bg: "bg-red-500",
          };
        };

        const status = getStatus(Number(bmi));

        return (
          <span className={`text-lg font-semibold ${status.color}`}>
            {bmi}
          </span>
        );
      })()}
    </div>

    {/* BMI Scale Visual */}
    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex mt-2">
      <div className="flex-1 bg-blue-400 opacity-30"></div>
      <div className="flex-1 bg-emerald-400 opacity-30"></div>
      <div className="flex-1 bg-orange-400 opacity-30"></div>
      <div className="flex-1 bg-red-400 opacity-30"></div>
    </div>

    {/* BMI Range Labels */}
    <div className="flex justify-between text-xs text-slate-500 mt-2">
      <span>18.5</span>
      <span>25</span>
      <span>30</span>
    </div>

  </div>
)}
</div>
  </Card>
) }

 {/* quick summery card */}
 <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
  <h3 className="font-semibold text-slate-800 dark:text-white mb-4 ">today's Summary</h3>
<div className ="space-y-4">
  <div className="flex items-center py-2 border-b border-slate-100 dark:border-slate-800">
    <span className="text-slate-500 dark:text-slate-400">meals logged</span>
    <span className="font-medium text-slate-700 dark:text-slate-200 ml-auto">{todayFood.length}</span>
    
  </div>
   <div className="flex items-center py-2 border-b border-slate-100 dark:border-slate-800">
    <span className="text-slate-500 dark:text-slate-400">total calories</span>
    <span className="font-medium text-slate-700 dark:text-slate-200 ml-auto">{totalCalories} kcal</span>
    
  </div>
   <div className="flex items-center py-2 ">
    <span className="text-slate-500 dark:text-slate-400">active time</span>
    <span className="font-medium text-slate-700 dark:text-slate-200 ml-auto">{totalActivityMinutes} min</span>
    
  </div>
</div>

 </Card>

 {/* activity &intake  */}
 <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
  <h3 className="font-semibold text-slate-800 dark:text-white mb-4">this week progress</h3>
  <CaloriesChart />
 </Card>

      </div>
    </div>
  );
};

export default Dashboard;




