import PrivateNavbar from './PrivateNavbar.jsx';
import SchoolHeader from './SchoolHeader.jsx';
import Footer from './Footer.jsx';

export default function DashboardLayout({ children, title, showSchoolHeader = true }) {
  return (
    <div className="page-container dashboard-container">
      <PrivateNavbar />
      {showSchoolHeader && <SchoolHeader />}
      <main className="main-content dashboard-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}