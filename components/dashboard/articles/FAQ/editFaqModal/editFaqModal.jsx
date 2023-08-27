import FeatherIcon from "feather-icons-react";

const EditFAQModal = ({ data, editFAQ }) => {
  return (
    <div
      className="modal fade contentmodal"
      id="editFAQModal"
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
            <form onSubmit={editFAQ}>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <input type="hidden" value={data._id} name="editFAQId" />

                    <label className="lblAbs font-12">
                      پرسش <span className="text-danger">*</span>
                    </label>
                    <div className="col p-0">
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="editFAQuestion"
                        defaultValue={data.Qu}
                        key={data.Qu}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <label className="lblAbs font-12">
                      پاسخ <span className="text-danger">*</span>
                    </label>
                    <div className="col p-0">
                      <input
                        dir="ltr"
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="editFAQAnswer"
                        defaultValue={data.Ans}
                        key={data.Ans}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="submit-section">
                <button
                  type="submit"
                  className="btn btn-primary rounded btn-save mt-4"
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

export default EditFAQModal;
