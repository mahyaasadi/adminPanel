import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import ModalitiesNavLink from "./ModalitiesNavLink";

const ModalitiesHeader = ({ data, getDepServices }) => {
  let counter = 1;

  return (
    <>
      <div className="departmentsCategory w-100">
        <div className="categoryCard">
          <div className="card-body w-100">
            <ul className="nav nav-tabs nav-tabs-bottom nav-tabs-scroll font-14 padding-bottom-md">
              {/* {data.map((item, index) => {
                return (
                  <ModalitiesNavLink
                    activeClass=""
                    key={index}
                    data={item}
                    getDepServices={getDepServices}
                  />
                );
              })} */}

              {data.map((nav, index) => {
                if (nav.Disabled === false) {
                  if ((counter++ === 1)) {
                    return (
                      <ModalitiesNavLink
                        activeClass="active"
                        key={index}
                        data={nav}
                        getDepServices={getDepServices}
                      />
                    );
                  } else {
                    return (
                      <ModalitiesNavLink
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
