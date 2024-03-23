import { Modal } from 'react-bootstrap';
import { Dropdown } from 'primereact/dropdown';

const AddEntityToArticleModal = ({
    mode = "group", // Default is 'group'
    FUSelectEntity,
    options,
    onSubmit,
    isLoading,
    show,
    onHide,
    selectedOption
}) => {
    const modalTitle = mode === "group" ? "افزودن گروه مقالات" : mode === "tag" ? "افزودن تگ مقالات" : "افزودن مقالات مرتبط";
    const labelText = mode === "group" ? "گروه" : mode === "tag" ? "تگ" : "مقاله مرتبط";
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <p className="mb-0 text-secondary font-14 fw-bold">{modalTitle}</p>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form onSubmit={onSubmit}>
                    <div className="col media-w-100 font-12">
                        <label className="lblAbs font-12">{labelText}</label>
                        <Dropdown
                            value={selectedOption}
                            onChange={(e) => FUSelectEntity(e.value)}
                            options={options}
                            optionLabel="label"
                            placeholder="انتخاب کنید"
                            filter
                            showClear
                        />
                    </div>

                    <div className="submit-section">
                        {!isLoading ? (
                            <button
                                type="submit"
                                className="btn btn-primary rounded btn-save font-13"
                            >
                                ثبت
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
    )
}
export default AddEntityToArticleModal