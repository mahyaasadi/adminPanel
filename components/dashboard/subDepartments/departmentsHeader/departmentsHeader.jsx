import DepNavLink from "./DepNavLink";

const DepartmentsHeader = ({ data, getSubDepartments }) => {
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
                      getSubDepartments={getSubDepartments}
                    />
                  );
                } else {
                  return (
                    <DepNavLink
                      activeClass=""
                      key={index}
                      data={nav}
                      getSubDepartments={getSubDepartments}
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
