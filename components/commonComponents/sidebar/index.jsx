"use client"; //This is a client component
import Link from "next/link";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import { organ, neighbourhoods, article } from "components/imagepath";

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
                  <FeatherIcon icon="list" className="width-22" />

                  <span>مدیریت منوها</span>
                </Link>
              </li>

              <li
                className={
                  router.pathname == "/centersManagement" ? "active" : ""
                }
              >
                <Link href="/centersManagement">
                  <Image src={organ} alt="" width="21" height="21" />
                  <span>مدیریت مراکز</span>
                </Link>
              </li>

              <li
                className={router.pathname == "/neighbourhoods" ? "active" : ""}
              >
                <Link href="/neighbourhoods">
                  <Image src={neighbourhoods} alt="" width="20" height="20" />

                  <span>مدیریت محله ها</span>
                </Link>
              </li>

              <li className="submenu">
                <a href="#">
                  <Image src={article} alt="" width="18" height="18" />
                  <span>مدیریت مقالات</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul className="hidden hiddenSidebar">
                  <li
                    className={router.pathname == "/articles" ? "active" : ""}
                  >
                    <Link href="/articles" className="font-12">
                      مقالات
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname == "/articleGroupManagement"
                        ? "active"
                        : ""
                    }
                  >
                    <Link href="/articleGroupManagement" className="font-12">
                      گروه مقالات
                    </Link>
                  </li>

                  <li
                    className={
                      router.pathname == "/articleTagManagement" ? "active" : ""
                    }
                  >
                    <Link href="/articleTagManagement" className="font-12">
                      تگ مقالات
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
