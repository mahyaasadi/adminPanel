import FeatherIcon from "feather-icons-react";

const AddCenterModal = ({ addCenter }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addCenterModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">مرکز جدید</p>
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
            <form onSubmit={addCenter} id="frmAddCenter">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="lblAbs font-12">
                      نام مرکز <span className="text-danger">*</span>
                    </label>
                    <div className="col p-0">
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        // name="addMenuName"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <label className="lblAbs font-12">نام انگلیسی</label>
                    <div className="col p-0">
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        // name="addMenuName"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label className="lblAbs font-12">
                      شهر <span className="text-danger">*</span>
                    </label>
                    <div className="col p-0">
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        // name="addMenuIcon"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <label className="lblAbs font-12">
                      استان <span className="text-danger">*</span>
                    </label>
                    <div className="col p-0">
                      <input
                        className="form-control floating inputPadding rounded"
                        type="text"
                        // name="addMenuUrl"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="lblAbs font-12">
                    آدرس <span className="text-danger">*</span>
                  </label>
                  <div className="col p-0">
                    <textarea
                      className="form-control floating inputPadding rounded"
                      type="text"
                      // name="addMenuUrl"
                      required
                    ></textarea>
                  </div>
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
export default AddCenterModal;
