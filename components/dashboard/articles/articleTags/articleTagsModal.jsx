import { Modal } from 'react-bootstrap';

const ArticleTagsModal = ({
    mode = "add",
    onSubmit,
    data = {},
    isLoading,
    show,
    onHide
}) => {
    const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "افزودن تگ های مقاله";
    const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <p className="mb-0 text-secondary font-14 fw-bold">{modalTitle}</p>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={onSubmit}>
                    {mode === "edit" && (
                        <input
                            type="hidden"
                            className="form-control floating"
                            name="editArticleTagID"
                            value={data._id}
                        />
                    )}

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            عنوان <span className="text-danger">*</span>
                        </label>
                        <div className="col p-0">
                            <input
                                className="form-control floating inputPadding rounded"
                                type="text"
                                name={mode == "edit" ? "editArticleTagTitle" : "articleTagTitle"}
                                defaultValue={mode == "edit" ? data.Title : ""}
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
                                name={mode == "edit" ? "editArticleTagEngTitle" : "articleTagEngTitle"}
                                defaultValue={mode == "edit" ? data.EngTitle : ""}
                                key={data.EngTitle}
                                required
                            />
                        </div>
                    </div>

                    <div className="submit-section">
                        {!isLoading ? (
                            <button
                                type="submit"
                                className="btn btn-primary rounded btn-save font-13"
                            >
                                {submitText}
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="btn btn-primary rounded font-13"
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
            </Modal.Body>
        </Modal>
    );
};

export default ArticleTagsModal;