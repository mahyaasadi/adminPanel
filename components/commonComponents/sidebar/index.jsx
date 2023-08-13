"use client"; //This is a client component
import Link from "next/link";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";

const Sidebar = () => {
  const router = useRouter();

  return (
    <>
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>اصلی</span>
              </li>
              <li className={router.pathname == "/dashboard" ? "active" : ""}>
                <Link href="/dashboard">
                  <FeatherIcon icon="home" />

                  <span>داشبورد</span>
                </Link>
              </li>

              <li
                className={
                  router.pathname == "/menusManagement" ? "active" : ""
                }
              >
                <Link href="/menusManagement">
                  <FeatherIcon icon="list" className="width-15" />

                  <span>مدیریت منوهای سامانه</span>
                </Link>
              </li>

              <li
                className={
                  router.pathname == "/centersManagement" ? "active" : ""
                }
              >
                <Link href="/centersManagement">
                  <FeatherIcon icon="settings" className="width-15" />

                  <span>مدیریت مراکز </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;