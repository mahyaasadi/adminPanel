import { useEffect } from "react";

const SubDepartmentsList = ({ data }) => {

  console.log("data in list", data);
  useEffect(() => {

  }, [data])
  return (
    <>
      <div className="m-auto p-4">
        {/* <div className="content container-fluid"> */}
        <form>
          {data.map((subDepartment, index) => (
            <div className="checkbox text-secondary permissionCheckbox" key={index}>
              <div className="checkbox-wrapper checkbox-wrapper-per">
                <div className="permissionCheckboxTile permissionItem">
                  {/* <div
                      // className="checkbox"
                      // key={index}
                    > */}
                  <div className="marginb-sm d-flex align-items-center">
                    <input
                      type="checkbox"
                      id={subDepartment._id}
                      value={subDepartment.Name}
                      name="roleAccessList"
                      className="PerCheckbox-input"
                    // onChange={() =>
                    //   dropCheckedPermission(
                    //     item.id.toString(),
                    //     item.category
                    //   )
                    // }
                    />
                    <label
                      className="permissionLabel font-13"
                      htmlFor={subDepartment.Name}
                    >
                      {subDepartment.Name}
                    </label>
                  </div>
                </div>
                {/* </div>
                </div> */}
              </div>
            </div>


          ))}

        </form>
      </div>
      {/* </div> */}
    </>
  );
};
export default SubDepartmentsList;
