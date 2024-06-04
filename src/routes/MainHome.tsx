import { containerCSS } from 'common';

const MainHome = () => {
  return (
    <div className={containerCSS}>
      <h1>Apps</h1>
      <ul>
        <li>
          <a href="/stocks">Stocks</a>
        </li>
      </ul>
    </div>
  );
};

export default MainHome;
