"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";

const Sidebar = ({ UserData }) => {
  const router = useRouter();

  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handlesidebarmobilemenu = () => {
    document.body.classList.toggle("slide-nav");
    $(".sidebar-overlay").attr(
      "style",
      "background-color: transparent !important"
    );

    $(".sidebar-overlay").attr("style", "display: contents !important");
  };

  useEffect(() => {
    const articleSubroutes = ["/articles", "/articleGroups", "/articleTags"];
    if (articleSubroutes.includes(router.pathname)) {
      setSubmenuOpen(true);
    }
  }, []);

  return (
    <>
      <div className="sidebar shadow" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>اصلی</span>
              </li>
              <li
                className={router.pathname == "/dashboard" ? "active" : ""}
                onClick={handlesidebarmobilemenu}
              >
                <Link href="/dashboard">
                  <FeatherIcon icon="home" />

                  <span>داشبورد</span>
                </Link>
              </li>

              {/* {UserData?.Admin === true && UserData?.Basic === false ? ( */}
              <li className={router.pathname == "/menus" ? "active" : ""}>
                <Link href="/menus">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>

                  <span>مدیریت منوها</span>
                </Link>
              </li>
              {/* ) : (
                ""
              )} */}

              <li
                className={
                  router.pathname == "/centersManagement" ? "active" : ""
                }
              >
                <Link href="/centersManagement">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                    />
                  </svg>

                  <span>مدیریت مراکز</span>
                </Link>
              </li>

              <li className={router.pathname == "/clinics" ? "active" : ""}>
                <Link href="/clinics">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                    />
                  </svg>

                  <span>مدیریت مطب ها</span>
                </Link>
              </li>

              <li
                className={router.pathname == "/neighbourhoods" ? "active" : ""}
              >
                <Link href="/neighbourhoods">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                    />
                  </svg>

                  <span>مدیریت محله ها</span>
                </Link>
              </li>

              <li className="submenu">
                <a href="#" onClick={() => setSubmenuOpen(!submenuOpen)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                    />
                  </svg>

                  <span>مدیریت مقالات</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul
                  className={`hiddenSidebar ${
                    submenuOpen ? "d-block" : "hidden"
                  }`}
                >
                  <li
                    className={router.pathname == "/articles" ? "active" : ""}
                  >
                    <Link href="/articles" className="font-12">
                      مقالات
                    </Link>
                  </li>
                  <li
                    className={
                      router.pathname == "/articleGroups" ? "active" : ""
                    }
                  >
                    <Link href="/articleGroups" className="font-12">
                      گروه مقالات
                    </Link>
                  </li>

                  <li
                    className={
                      router.pathname == "/articleTags" ? "active" : ""
                    }
                  >
                    <Link href="/articleTags" className="font-12">
                      تگ مقالات
                    </Link>
                  </li>
                </ul>
              </li>

              <li className={router.pathname == "/modalities" ? "active" : ""}>
                <Link href="/modalities">
                  <FeatherIcon
                    icon="grid"
                    style={{ width: "15px", height: "15px" }}
                  />
                  <span>مدیریت بخش ها</span>
                </Link>
              </li>

              <li className={router.pathname == "/services" ? "active" : ""}>
                <Link href="/services">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                  </svg>

                  <span>مدیریت سرویس ها</span>
                </Link>
              </li>

              <li
                className={
                  router.pathname == "/referringDoctors" ? "active" : ""
                }
              >
                <Link href="/referringDoctors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>

                  <span>پزشکان ارجاع دهنده</span>
                </Link>
              </li>

              <li
                className={
                  router.pathname == "/referringDoctors" ? "active" : ""
                }
              >
                <Link href="/centersReports">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                    />
                  </svg>

                  <span>گزارش تعداد نوبت مراکز</span>
                </Link>
              </li>

              <li
                className={
                  router.pathname == "/styleLinkCreator" ? "active" : ""
                }
              >
                <Link href="/styleLinkCreator">
                  <FeatherIcon
                    icon="link"
                    style={{ width: "15px", height: "15px" }}
                  />

                  <span>لینک سازی داخلی</span>
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
