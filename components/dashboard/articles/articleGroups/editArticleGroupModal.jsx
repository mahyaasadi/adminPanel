import FeatherIcon from "feather-icons-react";

const EditArticleGroupModal = ({ data, editArticleGroup }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="editArticleGroupModal"
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
            <form onSubmit={editArticleGroup}>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control floating"
                  name="editArticleGrpID"
                  value={data._id}
                />

                <label className="lblAbs font-12">
                  عنوان <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editArticleGrpTitle"
                    defaultValue={data.Title}
                    key={data.Title}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  عنوان انگلیسی <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editArticleGrpEngTitle"
                    defaultValue={data.EngTitle}
                    key={data.EngTitle}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">
                  توضیحات <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <textarea
                    className="form-control floating inputPadding rounded font-13"
                    type="text"
                    name="editArticleGrpDes"
                    defaultValue={data.Des}
                    key={data.Des}
                    required
                  ></textarea>
                </div>
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

export default EditArticleGroupModal;
