import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import { useEffect } from "react";

const ModalitiesNavLink = ({ data, getDepServices, activeClass }) => {
  useEffect(() => {
    if (activeClass == "active") {
      // getDepServices(data._id);
      console.log("activeClass", activeClass);
    }
  }, []);

  return (
    <>
      <li className="nav-item">
        <a
          className={"nav-link ServiceNav " + activeClass}
          href={"#Tab" + data._id}
          data-bs-toggle="tab"
          onClick={() => getDepServices(data._id)}
        >
          {data.PerFullName}
        </a>
      </li>
    </>
  );
};

export default ModalitiesNavLink;
