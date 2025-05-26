import { AuthProvider } from "../context/AuthContext"
import { DataProvider } from "../context/DataContext"
import LandingPage from "../components/LandingPage"

export default function Home() {
  return (
    <AuthProvider>
      <DataProvider>
        <LandingPage />
      </DataProvider>
    </AuthProvider>
  )
}