const SubDepartmentsList = ({
  data,
  handleCheckedSubDepartments,
  checkAllSubDeps,
  unCheckAllSubDeps,
  selectAllMode,
  handleSubmitSubCheckbox,
  checkedSubDepartments,
  submitIsLoading
}) => {
  return (
    <>
      <div className="d-flex justify-center p-25 subDepScroller">
        <form className="subDepContainer" onSubmit={handleSubmitSubCheckbox}>
          <div className="subDepFrm">
            {data.map((subDepartment, index) => (
              <div className="checkbox" key={index}>
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    className="checkbox-input subDepartment"
                    id={"subDep" + subDepartment._id}
                    value={subDepartment._id}
                    onChange={handleCheckedSubDepartments}
                    checked={checkedSubDepartments.includes(subDepartment._id)}
                  />
                  <div className="checkbox-tile subCheckbox-tile">
                    <span className="checkbox-icon"></span>
                    <div className="checkbox-items">
                      <span className="checkbox-label">
                        {subDepartment.Name}
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>

          {data.length > 0 ? (
            <div className="submit-section margint-5 marginb-md1 d-flex media-flex-col gap-1">
              {!submitIsLoading ? (
                <button
                  type="submit"
                  className="btn btn-primary padding-right-2 padding-left-2"
                >
                  ثبت تغییرات
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-secondary d-flex align-items-center"
                  disabled
                >
                  در حال ثبت
                  <span
                    className="spinner-border spinner-border-sm margin-right-1"
                    role="status"
                  ></span>
                </button>
              )}

              {!selectAllMode ? (
                <button
                  type="button"
                  className="btn btn-outline-secondary font-14 padding-right-2 padding-left-2"
                  onClick={checkAllSubDeps}
                >
                  انتخاب همه
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-secondary font-14 padding-right-2 padding-left-2"
                  onClick={unCheckAllSubDeps}
                >
                  انصراف
                </button>
              )}
            </div>
          ) : (
            " "
          )}
        </form>
      </div>
    </>
  );
};

export default SubDepartmentsList;
