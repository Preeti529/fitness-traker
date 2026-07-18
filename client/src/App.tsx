


import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard";
import Foodlog from "./Pages/Foodlog";
import Activitylog from "./Pages/ActivityLog";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Loading from "./components/ui/loading";
import Onboarding from "./Pages/onboarding";
import { useAppContext } from "./context/AppContext";
import { Toaster } from "react-hot-toast";

// const App = () => {
//   const { user, isUserFetched, onboardingComplete } = useAppContext();

//   // Show loading spinner while fetching user
//   if (!isUserFetched) {
//     return <Loading />;
//   }

//   // If no user logged in
//   if (!user) {
//     return <Login />;
//   }

//   // If user exists but onboarding not completed
//   if (!onboardingComplete) {
//     return <Onboarding />;
//   }

//   // Otherwise, render main layout with routes
//   return (
//     <Routes>
//       {/* Protected Routes */}
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Dashboard />} />
//         <Route path="food" element={<Foodlog />} />
//         <Route path="activity" element={<Activitylog />} />
//         <Route path="profile" element={<Profile />} />
//       </Route>

//       {/* Public Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/onboarding" element={<Onboarding />} />

//       {/* Fallback redirect */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// };

// export default App;


const App = () => {
  const { user, isUserFetched, onboardingComplete } = useAppContext();

  return (
    <>
      <Toaster />

      {!isUserFetched ? (
        <Loading />
      ) : !user ? (
        <Login />
      ) : !onboardingComplete ? (
        <Onboarding />
      ) : (
        <Routes>
          {/* Protected Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="food" element={<Foodlog />} />
            <Route path="activity" element={<Activitylog />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  );
};

export default App;