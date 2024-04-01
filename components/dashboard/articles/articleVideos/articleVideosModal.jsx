import { Modal } from "react-bootstrap";
import { ErrorAlert } from "class/AlertManage"
import { axiosClient } from "@/class/axiosConfig";
import { convertBase64 } from "utils/convertBase64";
import FeatherIcon from "feather-icons-react";

const ArticleVideosModal = ({
    mode,
    show,
    onHide,
    isLoading,
    setIsLoading,
    data,
    onSubmit,
    ActiveArticleID,
    ActiveVideoID
}) => {
    const displayVideoPreview = (e) => {
        var urlCreator = window.URL || window.webkitURL;
        if (e.target.files.length !== 0) {
            var videoUrl = urlCreator.createObjectURL(e.target.files[0]);
            $("#ArticleVideoPreview").attr("src", videoUrl);
        }
    };

    let articleVideo = null;
    const addVideoToArticle = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        if (formProps.addVideoToArticle && formProps.addVideoToArticle.size != 0) {
            articleVideo = await convertBase64(formProps.addVideoToArticle);
        }

        let url = `/Article/addVideo/${ActiveArticleID}`;
        let data = {
            Title: formProps.videoTitle,
            Video: articleVideo,
        };

        axiosClient
            .post(url, data)
            .then((response) => {
                onSubmit(response.data)
                onHide()
                setIsLoading(false);

                // reset
                e.target.reset();
                articleVideo = null;
                $("#ArticleVideoPreview").attr("src", "");
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                ErrorAlert("خطا", "افزودن ویدیو با خطا مواجه گردید!");
            });
    };

    const editArticleVideo = (e) => {
        e.preventDefault();
        setIsLoading(true);

        let formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        let url = `Article/updateVideo/${ActiveArticleID}/${ActiveVideoID}`;
        let data = {
            Title: formProps.videoTitle,
            Name: formProps.editVideoName,
        };

        console.log({ data });

        axiosClient
            .post(url, data)
            .then((response) => {
                console.log(response.data);
                onSubmit(formProps.editVideoID, response.data);

                // reset
                onHide()
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
            });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <p className="mb-0 text-secondary font-14 fw-bold">
                        {mode == "edit" ? "ویرایش" : " افزودن ویدیو به مقاله"}
                    </p>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={mode == "add" ? addVideoToArticle : editArticleVideo}>
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

                    <div className="form-group col">
                        <label className="lblAbs font-12">
                            عنوان <span className="text-danger">*</span>
                        </label>
                        <div className="col p-0">
                            <input
                                type="text"
                                name="videoTitle"
                                className="form-control floating inputPadding rounded"
                                defaultValue={mode == "edit" ? data.Title : ""}
                                key={mode == "edit" ? data.Title : ""}
                                required
                            />
                        </div>
                    </div>

                    {mode == "add" && (
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
                    )}

                    {mode == "add" && (
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
                    )}

                    <div className="submit-section">
                        {!isLoading ? (
                            <button
                                type="submit"
                                className="btn btn-primary rounded btn-save"
                            >
                                ثبت
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
            </Modal.Body>
        </Modal>
    )
}

export default ArticleVideosModal