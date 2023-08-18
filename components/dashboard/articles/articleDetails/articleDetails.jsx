import Link from "next/link"
import FeatherIcon from "feather-icons-react";

const ArticleDetails = ({ data }) => {
    return (
        <div
            className="modal fade contentmodal"
            id="articleDetailsModal"
            tabIndex="-1"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content doctor-profile">
                    <div className="modal-header">
                        <div className="loeing-header">
                            <p className="mb-0 font-14 fw-bold">جزییات مقاله</p>
                            <p className='font-semibold font-12 text-secondary'>{data.Title}</p>
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

                    <div className="modal-body d-flex">
                        {/* description */}
                        <div className=''>
                            <div className="">
                                <p> نویسنده : {data.Creator}</p>
                                <p>مدت زمان مطالعه : {data.POT} دقیقه</p>
                                <div className=''>
                                    {/* <Link
                                        href={}
                                        className=""
                                    >
                                        مشاهده کامل
                                    </Link> */}
                                </div>
                            </div>
                        </div>

                        {/* modalPhoto */}
                        <div className="">
                            <img
                                src={"https://irannobat.ir/blog/images/" + data.Img}
                                className="w-50 border-rounded"
                                alt="articleImage"
                            />
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetails;
