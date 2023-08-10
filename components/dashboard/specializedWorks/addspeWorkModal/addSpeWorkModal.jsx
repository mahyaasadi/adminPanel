import FeatherIcon from "feather-icons-react";

const AddSpeWorkModal = ({ addSpeWork }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addSpeWorkModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              اضافه کردن کار تخصصی{" "}
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
            <form onSubmit={addSpeWork} id="frmAddSpeWork">
              <div className="form-group ">
                <label className="lblAbs font-12">
                  نام پزشک <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  type="text"
                  id="AddSpeName"
                  required
                />
              </div>

              <div className="form-group ">
                <label className="lblAbs font-12">
                  عنوان <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  type="text"
                  id="AddSpeTitle"
                  required
                />
              </div>

              <div className="form-group ">
                <label className="lblAbs font-12">
                  تخصص <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control floating inputPadding rounded"
                  type="text"
                  id="AddSpeEngName"
                  required
                />
              </div>

              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary btn-save rounded"
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
export default AddSpeWorkModal;
