import ReactCalendar from "react-calendar";

export function Calendar() {

    return (
        <div className="modal fade" id="calendarmod">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">

                    {/* Header */}
                    <div className="modal-header border-0 px-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                            <div
                                className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center"
                                style={{ width: "42px", height: "42px" }}
                            >
                                <i className="bi bi-calendar3 fs-5"></i>
                            </div>

                            <div>
                                <h5 className="modal-title fw-bold mb-0">
                                    Calendar
                                </h5>
                                <small className="text-secondary">
                                    Select a date
                                </small>
                            </div>
                        </div>

                        <button
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>

                    {/* Calendar */}
                    <div className="modal-body p-3">
                        <div className="border rounded-4 p-2 shadow-sm">
                            <ReactCalendar
                                className="w-100"
                                value={new Date()}
                                onChange={() => {}}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="modal-footer border-0 px-4 pb-4 pt-1">
                        <div className="w-100 d-flex align-items-center justify-content-between">
                            <small className="text-secondary">
                                <i className="bi bi-info-circle me-1"></i>
                                Choose a date from the calendar
                            </small>

                            <button
                                className="btn btn-outline-secondary btn-sm px-3"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}