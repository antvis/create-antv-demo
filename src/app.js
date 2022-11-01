import { Home } from './pages/home';
import { Header } from './components/header';
import { Bottom } from './components/bottom';

import style from './app.module.scss';

function App() {
  return (
    <div className={style.container}>
      <Header />
      <Home />
      <Bottom />
    </div>
  );
}

export default App;
