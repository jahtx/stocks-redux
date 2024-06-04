// import 'styles/sb-admin-2.css';
import 'styles/dash.scss';

const DashLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-light">
      <div className="sidebar"></div>
      <div className="mainArea"></div>
      {/* {children} */}
    </div>
  );
};

export default DashLayout;
