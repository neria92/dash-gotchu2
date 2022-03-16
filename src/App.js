import React from "react";
import { AppRouter } from "./routers/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store/store";
import 'tailwindcss/tailwind.css'

function App() {
  return (
    <Provider store={store}>
      <div className='min-h-screen bg-blue-900'>
        <AppRouter />
      </div>
    </Provider>

  );
}

export default App;
