import { axiosClient } from "class/axiosConfig.js";
import { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import Loading from "components/commonComponents/loading/loading";

const AddToMenuModal = ({
  permissionsList,
  addToMenu,
  handleCheckedMenuPermissions,
}) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addToMenuModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">افزودن منو</p>
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
            <form onSubmit={addToMenu} id="frmAddToMenu">
              <div className="form-group">
                <label className="lblAbs font-12">
                  عنوان <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addMenuName"
                    className="form-control floating inputPadding rounded"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  عنوان آیکون <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addMenuIcon"
                    className="form-control floating inputPadding rounded"
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
                    dir="ltr"
                    type="text"
                    name="addMenuUrl"
                    className="form-control floating inputPadding rounded"
                    required
                  />
                </div>
              </div>

              <hr />

              <p className="mb-4 text-secondary font-14 marginR-1" dir="rtl">
                بخش های قابل دسترس منو
              </p>
              <div className="form-group permissionsCheckboxList">
                {permissionsList?.map((permission, index) => (
                  <div className="checkbox marginR-1" dir="rtl" key={index}>
                    <div className="marginb-sm d-flex align-items-center">
                      <input
                        type="checkbox"
                        id={permission._id}
                        value={permission._id}
                        name="menuAccessList"
                        onChange={handleCheckedMenuPermissions}
                      />
                      <label
                        className="permissionLabel font-13 text-secondary"
                        htmlFor={permission._id}
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
                  className="btn btn-primary rounded btn-save"
                >
                  ثبت
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddToMenuModal;
