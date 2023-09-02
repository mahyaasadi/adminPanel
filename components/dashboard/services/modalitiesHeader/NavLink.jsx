import Link from "next/link";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
// import { useRouter } from "next/router";
// import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NavLink = ({ data, getDepServices, activeClass }) => {
  // const router = useRouter();
  
  // useEffect(() => {
  //   if (activeClass == "active") {
  //     getDepServices(data._id, data.PerFullName);
  //   }
  // }, []);


  return (
    <>
      <li className="nav-item">
        {/* <Link href={data?.modality}> */}
        <a
          // className={`nav-link ServiceNav ${
          //   router.usePathname === data.modality ? "active" : " "
          // }`}
          className={"nav-link ServiceNav " + activeClass}
          href={"#Tab" + data._id}
          data-bs-toggle="tab"
          onClick={() => getDepServices(data._id, data.PerFullName)}
        >
          {data.PerFullName}
        </a>
        {/* </Link> */}
      </li>
    </>
  );
};

export default NavLink;
