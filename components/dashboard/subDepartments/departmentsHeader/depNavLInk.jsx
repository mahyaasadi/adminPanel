import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import { useEffect } from "react";

const DepNavLink = ({ data, activeClass, handleDepartmentClick }) => {
  useEffect(() => {
    if (activeClass === "active") {
      handleDepartmentClick(data._id);
    }
  }, []);

  return (
    <>
      <li className="nav-item">
        <a
          className={"nav-link ServiceNav " + activeClass}
          data-bs-toggle="tab"
          onClick={() => handleDepartmentClick(data._id)}
        >
          {data.PerFullName}
        </a>
      </li>
    </>
  );
};

export default DepNavLink;
