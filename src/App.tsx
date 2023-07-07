import React, {useContext} from 'react';
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import ThemeContext from "./context/ThemeContext";

const App: React.FC = () => {
  const themeContext = useContext(ThemeContext)
  
  if (!themeContext) {
    return null;
  }
  
  const { isDark} = themeContext;
  
  return (
    <div className={`App ${isDark && 'dark'}`}>
      <Header/>
      <Home/>
    </div>
  );
}

export default App;
