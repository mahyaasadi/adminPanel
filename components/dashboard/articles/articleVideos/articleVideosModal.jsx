import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import FeatherIcon from "feather-icons-react";

const ArticleVideosModal = ({
    mode = "add", // Default is 'add'
    onSubmit,
    data = {},
    isLoading,
    show,
    onHide
}) => {
    const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "افزودن ویدیو";
    const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";

    const displayVideoPreview = (e) => {
        var urlCreator = window.URL || window.webkitURL;
        if (e.target.files.length !== 0) {
            var videoUrl = urlCreator.createObjectURL(e.target.files[0]);
            $("#ArticleVideoPreview").attr("src", videoUrl);
        }
    };

    // useEffect(() => $("#ArticleVideoPreview").hide(""), []);
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <p className="mb-0 text-secondary font-14 fw-bold">{modalTitle}</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit}>
                    <div className="form-group col">
                        <label className="lblAbs font-12">
                            عنوان <span className="text-danger">*</span>
                        </label>
                        {/* <div className="col p-0"> */}
                        <input
                            type="text"
                            className="form-control floating inputPadding rounded"
                            // name={mode == "add" ? "addVideoTitle" : "editVideoName"}
                            // defaultValue={mode == "edit" ? data.Title : ""}
                            // key={data.Title}
                            required
                        />
                        {/* </div> */}
                    </div>

                    {/* {mode == "edit" && (
                        <div className="">
                            <input
                                type="hidden"
                                className="form-control floating"
                                name="editVideoID"
                                value={data._id}
                            />
                            <input
                                type="hidden"
                                className="form-control floating"
                                name="editVideoName"
                                value={data.Name}
                                key={data.Name}
                            />
                        </div>
                    )}

                    {mode === "add" && (
                        <div className="">
                            <div className="change-photo-btn">
                                <div>
                                    <i>
                                        <FeatherIcon icon="upload" />
                                    </i>
                                    <p>آپلود فایل</p>
                                </div>
                                <input
                                    type="file"
                                    className="upload"
                                    name="addVideoToArticle"
                                    onChange={displayVideoPreview}
                                    required
                                />
                            </div>

                            <div className="previewImgContainer">
                                <video
                                    src=""
                                    alt=""
                                    width="350"
                                    id="ArticleVideoPreview"
                                    className="d-block m-auto previewImg"
                                    controls
                                ></video>
                            </div>
                        </div>
                    )} */}

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

export default ArticleVideosModal;