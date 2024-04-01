import { Modal } from 'react-bootstrap';
import { axiosClient } from '@/class/axiosConfig';
import { ErrorAlert } from "class/AlertManage"

const ArticleFAQsModal = ({
    show,
    onHide,
    mode,
    onSubmit,
    data = {},
    isLoading,
    setIsLoading,
    ActiveArticleID
}) => {
    const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "افزودن سوال متداول";
    const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";

    const addFAQ = (e) => {
        e.preventDefault();
        setIsLoading(true);

        let formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        let url = `Article/addFAQ/${ActiveArticleID}`;
        let data = {
            Qu: formProps.FAQuestion,
            Ans: formProps.FAQAnswer,
        };

        axiosClient
            .post(url, data)
            .then((response) => {
                onSubmit(response.data)
                onHide()
                setIsLoading(false);
                e.target.reset();
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                ErrorAlert("خطا", "افزودن سوال متداول با خطا مواجه گردید!");
            });
    };

    const editFaq = (e) => {
        e.preventDefault();
        setIsLoading(true);

        let formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        let FAQID = formProps.editFAQId;

        let url = `Article/updateFAQ/${ActiveArticleID}/${FAQID}`;
        let data = {
            Qu: formProps.FAQuestion,
            Ans: formProps.FAQAnswer,
        };

        console.log({ data });

        axiosClient
            .put(url, data)
            .then((response) => {
                console.log(response.data);

                onSubmit(response.data)
                onHide()
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
            });
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <p className="mb-0 text-secondary font-14 fw-bold">{modalTitle}</p>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={mode == "add" ? addFAQ : editFaq}>
                    <div className="form-group">
                        <input type="hidden" value={data._id} name="editFAQId" />

                        <label className="lblAbs font-12">
                            پرسش <span className="text-danger">*</span>
                        </label>
                        <div className="col p-0">
                            <input
                                type="text"
                                className="form-control floating inputPadding rounded"
                                name="FAQuestion"
                                defaultValue={mode == "edit" ? data.Qu : ""}
                                key={mode == "edit" ? data.Qu : ""}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            پاسخ <span className="text-danger">*</span>
                        </label>
                        <div className="col p-0">
                            <textarea
                                type="text"
                                className="form-control floating inputPadding rounded"
                                name="FAQAnswer"
                                defaultValue={mode == "edit" ? data.Ans : ""}
                                key={mode == "edit" ? data.Ans : ""}
                            ></textarea>
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

export default ArticleFAQsModal;