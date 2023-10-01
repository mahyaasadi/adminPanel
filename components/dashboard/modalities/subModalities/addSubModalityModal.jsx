import FeatherIcon from "feather-icons-react";

const AddSubModalityModal = ({ addSubModality, isLoading }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addSubModalityModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              افزودن زیر مجموعه
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
            <form onSubmit={addSubModality}>
              <div className="row">
                <div className="form-group col">
                  <label className="lblAbs font-12">
                    نام <span className="text-danger">*</span>
                  </label>
                  <div className="col p-0">
                    <input
                      type="text"
                      name="addSubModalityName"
                      className="form-control floating inputPadding rounded"
                      required
                    />
                  </div>
                </div>

                <div className="form-group col">
                  <label className="lblAbs font-12">
                    عنوان <span className="text-danger">*</span>
                  </label>
                  <div className="col p-0">
                    <input
                      type="text"
                      name="addSubModalityTitle"
                      className="form-control floating inputPadding rounded"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="lblAbs font-12">
                    لینک <span className="text-danger">*</span>
                  </label>
                  <div className="col p-0">
                    <input
                      dir="ltr"
                      type="text"
                      name="addSubModalityLink"
                      className="form-control floating inputPadding rounded"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">توضیحات</label>
                <div className="col p-0">
                  <textarea
                    type="text"
                    name="addSubModalityDes"
                    className="form-control floating inputPadding rounded"
                  ></textarea>
                </div>
              </div>

              <div className="submit-section">
                {!isLoading ? (
                  <button
                    type="submit"
                    className="btn btn-primary rounded btn-save"
                  >
                    ثبت
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-secondary font-13"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    در حال ثبت
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubModalityModal;
