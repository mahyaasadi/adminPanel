import FeatherIcon from "feather-icons-react";

const AddFAQModal = ({ addFAQ }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addFAQModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              افزودن سوال متداول
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
            <form onSubmit={addFAQ}>
              <div className="form-group">
                <label className="lblAbs font-12">
                  سوال <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="addFAQuestion"
                    className="form-control floating inputPadding rounded"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  پاسخ <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <textarea
                    type="text"
                    name="addFAQAnswer"
                    className="form-control floating inputPadding rounded"
                    required
                  ></textarea>
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

export default AddFAQModal;

