import FeatherIcon from "feather-icons-react";

const EditBusinessHourModal = ({ data }) => {
    return (
        <div
            className="modal fade contentmodal"
            id="editCenterBusinessHourModal"
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
                        <form>
                            <div className="row">
                                <div className="form-group col">
                                    <input
                                        type="hidden"
                                        className="form-control floating"
                                    // name="editArticleID"
                                    // value={data._id}
                                    />
                                    <label className="lblAbs font-12">
                                        عنوان<span className="text-danger">*</span>
                                    </label>
                                    <div className="col p-0">
                                        <input
                                            className="form-control floating inputPadding rounded"
                                            type="text"
                                            // name="editArticleTitle"
                                            // defaultValue={data.Title}
                                            // key={data.Title}
                                            required
                                        />
                                    </div>
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

export default EditBusinessHourModal;
