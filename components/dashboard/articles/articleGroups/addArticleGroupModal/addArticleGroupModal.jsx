import FeatherIcon from "feather-icons-react";

const AddArticleGroupModal = ({ addArticleGroup }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="addArticleGroupModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content doctor-profile">
          <div className="modal-header">
            <p className="mb-0 text-secondary font-14 fw-bold">
              افزودن گروه مقاله
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
            <form onSubmit={addArticleGroup}>
              <div className="form-group">
                <label className="lblAbs font-12">
                  عنوان<span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="articleGroupTitle"
                    className="form-control floating inputPadding rounded"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  عنوان انگلیسی<span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="articleGroupEngTitle"
                    className="form-control floating inputPadding rounded"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">توضیحات</label>
                <div className="col p-0">
                  <input
                    type="text"
                    name="articleGroupDescription"
                    className="form-control floating inputPadding rounded"
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

export default AddArticleGroupModal;
