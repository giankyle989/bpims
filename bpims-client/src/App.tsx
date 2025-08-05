import { Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RecordForm from "./pages/RecordForm";
import NotFound from "./pages/NotFound";
import AuthChecker from "./pages/AuthChecker";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <AuthChecker>
            <RootLayout />
          </AuthChecker>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<RecordForm />} />
        <Route path="/update/:id" element={<RecordForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
