import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import NavLink from "./NavLink";

const ModalitiesHeader = ({ data, getDepServices }) => {
  let counter = 1;

  return (
    <>
      <div className="w-100 marginb-3">
        <div className="categoryCard">
          <div className="card-body w-100">
            <ul className="nav nav-tabs nav-tabs-bottom nav-tabs-scroll font-14 padding-bottom-md flex-nowrap">
              {data.map((nav, index) => {
                if (nav.Disabled === false) {
                  if (counter++ === 1) {
                    return (
                      <NavLink
                        activeClass="active"
                        key={index}
                        data={nav}
                        getDepServices={getDepServices}
                      />
                    );
                  } else {
                    return (
                      <NavLink
                        activeClass=""
                        key={index}
                        data={nav}
                        getDepServices={getDepServices}
                      />
                    );
                  }
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalitiesHeader;
