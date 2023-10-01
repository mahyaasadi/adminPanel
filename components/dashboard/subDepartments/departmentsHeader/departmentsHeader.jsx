import DepNavLink from "./depNavLink";

const DepartmentsHeader = ({ data, handleDepartmentClick }) => {
  let counter = 1;

  return (
    <>
      <div className="w-100 marginb-3">
        <div className="categoryCard">
          <div className="card-body w-100">
            <ul className="nav nav-tabs nav-tabs-bottom nav-tabs-scroll font-14 padding-bottom-md flex-nowrap">
              {data.map((nav, index) => {
                if (counter++ === 1) {
                  return (
                    <DepNavLink
                      activeClass="active"
                      key={index}
                      data={nav}
                      handleDepartmentClick={handleDepartmentClick}
                    />
                  );
                } else {
                  return (
                    <DepNavLink
                      activeClass=""
                      key={index}
                      data={nav}
                      handleDepartmentClick={handleDepartmentClick}
                    />
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentsHeader;
