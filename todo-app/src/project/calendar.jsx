import ReactCalendar from "react-calendar";

export function Calendar() {

   

    return (
        <div className="modal fade" id="calendarmod">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">

                    <div className="modal-header">
                        <div className="modal-title">
                            Calendar
                        </div>
                        <button className="btn btn-close" data-bs-dismiss="modal">

                        </button>
                    </div>

                    <div className="modal-body p-0">
                        <ReactCalendar className="w-100" value={new Date()} onChange={()=>{}}/>
                    </div>
                    <div>

                    </div>
                </div>
            </div>

        </div>
    )
}