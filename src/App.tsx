import { Provider } from "react-redux"
import { store } from "./redux/store"
import CryptoTracker from "./Components/CryptoTracker"
import { ThemeProvider } from "./Components/theme/theme-provider"
import  "./App.css"

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark">
        <div className="min-h-screen bg-background">
          <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Crypto Price Tracker</h1>
            <CryptoTracker />
          </div>
        </div>
      </ThemeProvider>
    </Provider>
  )
}

export default App
