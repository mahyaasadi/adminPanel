import Header from "components/commonComponents/header";
import Sidebar from "components/commonComponents/sidebar";

export default function DashboardLayout({ children, UserData }) {
  return (
    <div>
      <Header className="pb-2" UserData={UserData} />
      <Sidebar UserData={UserData} />
      {children}
      <Footer />
    </div>
  );
}

import Footer from "components/commonComponents/footer";
