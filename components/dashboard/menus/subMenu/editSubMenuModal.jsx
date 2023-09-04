import { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";

const EditSubMenuModal = ({
  data,
  editSubMenu,
  permissionsList,
  handleCheckedSubMenuPermissions,
  editSubMenuCheckList,
}) => {
  useEffect(() => {
    editSubMenuCheckList(data);
  }, [data]);

  return (
    <div
      className="modal fade contentmodal"
      id="editSubMenuModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              ویرایش اطلاعات
            </p>
            <button
              type="button"
              className="close-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i>
                <FeatherIcon icon="x-circle" />
              </i>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={editSubMenu}>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control floating"
                  name="editSubMenuID"
                  value={data._id}
                />

                <label className="lblAbs font-12">
                  عنوان <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editSubMenuName"
                    defaultValue={data.Name}
                    key={data.Name}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  url <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    dir="ltr"
                    type="text"
                    name="editSubMenuUrl"
                    defaultValue={data.Url}
                    key={data.Url}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  اولویت <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="number"
                    name="editSubMenuPriority"
                    defaultValue={data.Priority}
                    key={data.Priority}
                    min="0"
                    required
                  />
                </div>
              </div>

              <hr />

              <p className="mb-4 text-secondary font-14 marginR-1" dir="rtl">
                بخش های قابل دسترس زیر منو
              </p>
              <div className="form-group permissionsCheckboxList">
                {permissionsList?.map((permission, index) => (
                  <div className="checkbox marginR-1" dir="rtl" key={index}>
                    <div className="marginb-sm d-flex align-items-center">
                      <input
                        type="checkbox"
                        value={permission._id}
                        name="editSubMenuAccessList"
                        id={"EditSubMenuPer" + permission._id}
                        defaultValue={permission._id}
                        onChange={handleCheckedSubMenuPermissions}
                        className="EditSubMenuPerCheckBox"
                      />
                      <label
                        className="permissionLabel font-13 text-secondary"
                        htmlFor={"EditSubMenuPer" + permission._id}
                      >
                        {permission.Name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary btn-save rounded"
                >
                  ثبت تغییرات
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubMenuModal;
