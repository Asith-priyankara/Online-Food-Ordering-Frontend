import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/customUI/Navbar";
import Home from "@/pages/Home";
import Restaurant from "@/pages/Restaurant";
import Cart from "@/pages/Cart";
import Orders from "@/pages/Orders";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import RestaurantDashboard from "@/pages/RestaurantDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import SearchResults from "@/pages/SearchResults";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <Toaster />

          <main className="pt-4 pb-8 sm:pt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />

              <Route path="/login" element={<Login />} />

              <Route path="/register" element={<Register />} />

              <Route path="/restaurant/:id" element={<Restaurant />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route
                path="/restaurant-dashboard"
                element={<RestaurantDashboard />}
              />

              {/* <Route element={<ProtectedRoute requiredRole='ROLE_RESTAURANT_OWNER'/>}>
                <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
              </Route> */}

              <Route element={<ProtectedRoute requiredRole="ROLE_ADMIN" />}>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </Route>

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          {/* <Toaster /> */}
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
