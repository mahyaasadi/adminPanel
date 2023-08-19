import { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";

const EditMenuModal = ({
  data,
  editMenu,
  permissionsList,
  editMenuCheckList,
  handleCheckedMenuPermissions,
}) => {
  // if (data.empty != 1) {
  //   for (let i = 0; i < permissionsList.length; i++) {
  //     permissionsList[i].Checked = false;
  //   }
  //   data.Permissions.map((per) => {
  //     let findIndexPer = permissionsList.findIndex(
  //       (x) => x._id === per.PermisionID
  //     );
  //     permissionsList[findIndexPer].Checked = true;
  //   });
  // }

  useEffect(() => {
    editMenuCheckList(data);
  }, [data]);

  return (
    <div
      className="modal fade contentmodal"
      id="editMenuModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <div className="loeing-header">
              <p className="mb-0 text-secondary font-14 fw-bold">
                ویرایش اطلاعات
              </p>
              <p className="mb-0 text-secondary font-13">منوی {data.Name}</p>
            </div>

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
            <form onSubmit={editMenu}>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control floating"
                  name="editMenuID"
                  value={data._id}
                />

                <label className="lblAbs font-12">
                  عنوان <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editMenuName"
                    defaultValue={data.Name}
                    key={data.Name}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  عنوان آیکون<span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editMenuIcon"
                    defaultValue={data.Icon}
                    key={data.Icon}
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
                    name="editMenuUrl"
                    defaultValue={data.Url}
                    key={data.Url}
                    required
                  />
                </div>
              </div>

              <hr />

              <p
                className="mb-4 text-secondary font-14 marginR-1 padding-r-10 "
                dir="rtl"
              >
                بخش های قابل دسترس منو
              </p>
              <div className="form-group permissionsCheckboxList">
                {permissionsList?.map((permission, index) => (
                  <div className="checkbox marginR-1" dir="rtl" key={index}>
                    <div className="marginb-sm d-flex align-items-center">
                      <input
                        type="checkbox"
                        name="editPermissions"
                        value={permission._id}
                        id={"EditPer" + permission._id}
                        className="permission-checkbox-input EditPerCheckBox"
                        onChange={handleCheckedMenuPermissions}
                      />
                      <label
                        className="permissionLabel font-13 text-secondary"
                        htmlFor={"EditPer" + permission._id}
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

export default EditMenuModal;
