import FeatherIcon from "feather-icons-react";

const EditSubModalityModal = ({ data, isLoading, editSubModality }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="editSubModalityModal"
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
            <form onSubmit={editSubModality}>
              <div className="form-group">
                <input
                  type="hidden"
                  className="form-control floating"
                  name="editSubModalityId"
                  value={data._id}
                />

                <label className="lblAbs font-12">
                  عنوان <span className="text-danger">*</span>
                </label>
                <div className="col p-0">
                  <input
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editSubModalityTitle"
                    defaultValue={data.Title}
                    key={data.Title}
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
                    className="form-control floating inputPadding rounded"
                    name="editSubModalityLink"
                    defaultValue={data.Link}
                    key={data.Link}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="lblAbs font-12">توضیحات</label>
                <div className="col p-0">
                  <textarea
                    className="form-control floating inputPadding rounded"
                    type="text"
                    name="editSubModalityDes"
                    defaultValue={data.Des}
                    key={data.Des}
                  ></textarea>
                </div>
              </div>

              <div className="submit-section">
                {!isLoading ? (
                  <button
                    type="submit"
                    className="btn btn-primary btn-save rounded"
                  >
                    ثبت تغییرات
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

export default EditSubModalityModal;
