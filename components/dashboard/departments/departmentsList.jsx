const DepartmentsList = ({ departmentsData, handleCheckedDepartments }) => {
  return (
    <>
      {departmentsData.map((departmentData, index) => (
        <div className="checkbox" key={index}>
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              name="Dep"
              value={departmentData._id}
              id={"Dep" + departmentData._id}
              className="checkbox-input"
              defaultChecked={departmentData.Checked}
              onChange={handleCheckedDepartments}
            />
            <div className="checkbox-tile">
              <span className="checkbox-icon"></span>

              <div className="checkbox-items">
                <img
                  src={
                    "https://irannobat.ir/admin/assets/img/" +
                    departmentData.Icon
                  }
                  alt=""
                  width="55px"
                  height="55px"
                />

                <span className="checkbox-label" dir="rtl">
                  {departmentData.PerFullName}
                </span>
              </div>
            </div>
          </label>
        </div>
      ))}
    </>
  );
};
export default DepartmentsList;
