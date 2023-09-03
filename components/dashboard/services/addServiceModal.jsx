import FeatherIcon from "feather-icons-react";

const AddServiceModal = ({ addService, isLoading }) => {
  return (
    <>
      <div
        className="modal fade contentmodal"
        id="addServiceModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content media-modal-content">
            <div className="modal-header media-modal-header">
              <p className="mb-0 text-secondary font-14 fw-bold">سرویس جدید</p>
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

            <div className="modal-body media-modal-body">
              <form onSubmit={addService}>
                <div className="row media-flex-col align-end">
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        کد خدمت <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        required
                        name="addSrvId"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        نام خدمت <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        required
                        name="addServiceName"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        نام گروه <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        required
                        name="srvGroupName"
                      />
                    </div>
                  </div>
                </div>

                <div className="row media-flex-col">
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">ضریب K</label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="total_K"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">ضریب فنی K</label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="tech_K"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">ضریب حرفه ای K</label>
                      <input
                        type="text"
                        className="form-control floating inputPadding rounded"
                        name="pro_K"
                      />
                    </div>
                  </div>
                </div>

                <div className="row media-flex-col">
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">مبلغ K فنی-خصوصی</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="ptk_price"
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        مبلغ K حرفه ای-خصوصی
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="ppk_price"
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">مبلغ K فنی-دولتی</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="gtk_price"
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        مبلغ K حرفه ای-دولتی{" "}
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="gpk_price"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="row media-flex-col">
                  <div className="col">
                    <div className="form-group ">
                      <label className="lblAbs font-12">
                        تعرفه دولتی<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        required
                        name="govTariff"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group ">
                      <label className="lblAbs font-12">
                        تعرفه خصوصی<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        required
                        name="privateTariff"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">تعرفه آزاد</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="freeTariff"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="row media-flex-col">
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">
                        سهم بیمار خدمات و تامین{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="patientCost"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">سهم بیمار ارتش</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="arteshPatientCost"
                        min="0"
                        // required
                      />
                    </div>
                  </div>
                </div>

                <div className="row media-flex-col">
                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">سهم تامین</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="taminShare"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">سهم سلامت</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="salamatShare"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-group">
                      <label className="lblAbs font-12">سهم ارتش</label>
                      <input
                        type="number"
                        className="form-control floating inputPadding rounded"
                        name="arteshShare"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="submit-section">
                  {!isLoading ? (
                    <button
                      type="submit"
                      className="btn btn-primary btn-save rounded"
                    >
                      ثبت
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary rounded"
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
    </>
  );
};
export default AddServiceModal;
