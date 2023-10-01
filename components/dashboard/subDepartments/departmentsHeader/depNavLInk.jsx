import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import { useEffect } from "react";

const DepNavLink = ({ data, activeClass, getSubDepartments }) => {
  // useEffect(() => {
  //   if (activeClass == "active") {
  //     getSubDepartments(data);
  //   }
  // }, []);

  return (
    <>
      <li className="nav-item">
        <a
          className={"nav-link ServiceNav " + activeClass}
          // href={"#Tab" + data._id}
          data-bs-toggle="tab"
          onClick={() => getSubDepartments(data)}
        >
          {data.PerFullName}
        </a>
      </li>
    </>
  );
};

export default DepNavLink;
