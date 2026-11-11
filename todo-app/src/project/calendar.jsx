import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import UserContext from "./indexcontext";
import { useContext } from "react";

export function Calendar() {

    const [date, setDate] = useState(new Date());

    const {toggle, setToggle} = useContext(UserContext);

    return (
        <div className={`container-fluid p-4 ${toggle ? 'bg-dark bg-body-secondary' : 'bg-white'}  `}>

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-header border-0 p-4">

                    <h4 className="fw-bold mb-1">
                        <i className="bi bi-calendar3 text-primary me-2"></i>
                        Calendar
                    </h4>

                    <small className="text-secondary">
                        Select and manage your dates
                    </small>

                </div>

                <div className="card-body p-4">

                    <div className="border rounded-3 p-3">

                        <ReactCalendar
                            className={`w-100 ${toggle ? 'bg-dark' : 'bg-light'} `}
                            value={date}
                            onChange={setDate}
                        />

                    </div>

                    <div className={`mt-4 p-3 ${toggle ? 'bg-dark' : 'bg-light'} rounded-3`}>

                        <span className="text-secondary">
                            Selected Date:
                        </span>

                        <h5 className="mt-1 mb-0 fw-semibold">
                            {date.toDateString()}
                        </h5>

                    </div>

                </div>

            </div>

        </div>
    );
}
