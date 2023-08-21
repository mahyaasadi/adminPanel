import Link from "next/link";
import FeatherIcon from "feather-icons-react";

const ArticleVideosModal = ({ data }) => {
    return (
        <>
            <div
                className="modal fade contentmodal"
                id="articleVideosModal"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header padding-r-30">
                            <div className="loeing-header">
                                <p className="mb-1 font-16 fw-bold">ویدئوهای مقاله</p>
                                <p className="font-16 text-secondary">{data?.Title}</p>
                            </div>
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
                            <div className="row p-4">
                                {data?.map((video, index) => (
                                    <div className="col-sm-6 col-md-4 col-xl-3 articleCard" key={index}>
                                        <div className="card">
                                            <div className="card-body">
                                                {/* <div className="articleImgContainer">
                                    <img
                                        className="w-100 rounded-md articleImg"
                                        src={"https://irannobat.ir/blog/images/" + articleData.Img}
                                        alt="articleImg"
                                    ></img>

                                    <video src={video.link} width="320" height="240" controls>
                                        <source src="Video Link" />
                                    </video>
                                </div> */}

                                                <div className="px-4">
                                                    <p className="py-1 font-16 mt-2 fw-bold">
                                                        {video?.Title}
                                                    </p>
                                                </div>

                                                <hr />

                                                <div
                                                    className="d-flex justify-flex-end gap-1"
                                                    id="infoContainer"
                                                >
                                                    <button
                                                        button="button"
                                                        className="btn btn-sm btn-outline-secondary btn-border-left"
                                                        // onClick={() => updateArticle(articleData, articleData._id)}
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                        title="ویرایش"
                                                    >
                                                        <FeatherIcon
                                                            style={{ width: "14px", height: "14px" }}
                                                            icon="edit-3"
                                                        />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                        title="حذف"
                                                    // onClick={() => deleteArticle(articleData._id)}
                                                    >
                                                        <FeatherIcon
                                                            style={{ width: "14px", height: "14px" }}
                                                            icon="trash-2"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ArticleVideosModal;
