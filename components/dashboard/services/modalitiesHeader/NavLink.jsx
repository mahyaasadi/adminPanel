import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import { useEffect } from "react";

const NavLink = ({ data, getDepServices, activeClass }) => {
  useEffect(() => {
    if (activeClass == "active") {
      getDepServices(data._id, data.PerFullName);
    }
  }, []);

  return (
    <>
      <li className="nav-item">
        <a
          className={"nav-link ServiceNav " + activeClass}
          data-bs-toggle="tab"
          onClick={() => getDepServices(data._id, data.PerFullName)}
        >
          {data.PerFullName}
        </a>
      </li>
    </>
  );
};

export default NavLink;
