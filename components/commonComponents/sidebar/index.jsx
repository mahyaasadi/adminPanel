"use client"; //This is a client component
import Link from "next/link";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import { organ, neighbourhoods, article } from "components/imagepath";
import { useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const Sidebar = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  // const { data: usersInfo, isError } = useQuery(
  //   ['userToken'],
  //   () => axiosClient.get(`CenterProfile/getCenterPhysician/${CenterID}`).then((response) => response.data)
  // );

  // const getUserToken = () => {
  //   let data = { Token: sessionStorage.getItem("SEID") };
  //   return useMutation(userToken, {
  //     onSuccess: async (data) => {
  //       console.log(data);
  //     },
  //   });
  // };

  // const mutation = useMutation({
  //   mutationFn: (data) => {
  //     return axios.post("InoAdmin/getUserByToken", data);
  //   },
  // });

  // const getUserToken = () => {
  //   let data = { Token: sessionStorage.getItem("SEID") };
  //   let url = "InoAdmin/getUserByToken";

  //   axiosClient.post(url, data);
  // };

  // const mutation = useMutation({
  //   getUserToken,
  //   onSuccess: (newArticle) => {
  //     // update article view directly via setQueryData
  //     queryClient.setQueryData(["articles", id], newArticle);
  //   },
  //   onError: (error, variables, context) => {
  //     console.log(error);
  //   },
  // });

  // useEffect(() => {}, []);

  //  let url = "InoAdmin/getUserByToken";
  //   let data = { Token: sessionStorage.getItem("SEID") };

  //   if (data) {
  //     axiosClient
  //       .post(url, data)
  //       .then(function (response) {
  //         console.log(response.data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         ErrorAlert("خطا", "ارتباط با سرور در حال حاضر امکان پذیر نمی باشد!");
  //       });

  // console.log(doctors);
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
                <a href="#">
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
                    class="w-6 h-6"
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
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
