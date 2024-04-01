import FeatherIcon from "feather-icons-react";

const EditAboutUsModal = ({ data, isLoading, editCenterAboutUs }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="editCenterAboutUsModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
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
            <form onSubmit={editCenterAboutUs}>
              <div className="row">
                <div className="form-group">
                  <div className="col p-0">
                    <input
                      type="hidden"
                      name="editCenterAboutUsID"
                      defaultValue={data._id}
                      key={data._id}
                    />

                    <label className="lblAbs font-15 fw-bold">درباره ما</label>
                    <textarea
                      type="text"
                      className="form-control floating inputPadding rounded font-13"
                      name="editAboutUsText"
                      defaultValue={data.AboutUs}
                      key={data.AboutUs}
                      rows="6"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="submit-section">
                {!isLoading ? (
                  <button
                    type="submit"
                    className="btn btn-primary btn-save rounded font-13"
                  >
                    ثبت تغییرات
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary rounded"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm me-2 font-13"
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

export default EditAboutUsModal;
