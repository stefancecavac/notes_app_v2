import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import SettingsPage from "./pages/SettingsPage";
import { SingleNotePage } from "./pages/SingleNotePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />

        <Route
          path="/"
          element={
            <Layout>
              <p className="text-base-content">notes app</p>
            </Layout>
          }
        />

        <Route
          path="/:noteId"
          element={
            <Layout>
              <SingleNotePage />
            </Layout>
          }
        />

        <Route
          path="/settings"
          element={
            <Layout>
              <SettingsPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
