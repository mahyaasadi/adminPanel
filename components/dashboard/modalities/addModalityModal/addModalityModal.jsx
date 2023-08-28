import FeatherIcon from "feather-icons-react";

const AddModalityModal = ({}) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addModalityModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              اضافه کردن بخش
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
            <form id="frmAddModality">
              <div className="form-group">
                <label className="lblAbs font-12">
                  نام بخش <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addModalityName"
                    className="form-control floating inputPadding rounded font-12"
                    placeholder="مثال: CT"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  نام کامل بخش <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addModalityFullName"
                    className="form-control floating inputPadding rounded font-12"
                    placeholder="مثال: CT Scan"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  نام فارسی بخش <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addModalityFullName"
                    className="form-control floating inputPadding rounded font-12"
                    placeholder="مثال: سی تی اسکن"
                    required
                  />
                </div>
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
export default AddModalityModal;
