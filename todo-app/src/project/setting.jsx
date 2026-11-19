import { useContext } from "react";
import UserContext from "./indexcontext";

export function Setting() {
  const { toggle, setToggle, users } = useContext(UserContext);

  return (
    <div className="container-fluid p-4">
      <h1 className="fw-bold mb-4">⚙️ Settings</h1>

      <div className="row g-4">

        {/* Profile Card */}
        <div className="col-md-6">
          <div
            className={`card shadow border-0 ${
              toggle ? "bg-secondary text-light" : ""
            }`}
          >
            <div className="card-body">
              <h4 className="mb-3">
                <i className="bi bi-person-circle me-2"></i>
                Profile Settings
              </h4>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={users?.username || ""}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={users?.email || ""}
                  readOnly
                />
              </div>

              <button className="btn btn-primary">
                Update Profile
              </button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="col-md-6">
          <div
            className={`card shadow border-0 ${
              toggle ? "bg-secondary text-light" : ""
            }`}
          >
            <div className="card-body">
              <h4 className="mb-3">
                <i className="bi bi-moon-stars me-2"></i>
                Appearance
              </h4>

              <div className="d-flex justify-content-between align-items-center">
                <span>Dark Mode</span>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={toggle}
                    onChange={() => setToggle(!toggle)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="col-md-6">
          <div
            className={`card shadow border-0 ${
              toggle ? "bg-secondary text-light" : ""
            }`}
          >
            <div className="card-body">
              <h4 className="mb-3">
                <i className="bi bi-bell me-2"></i>
                Notifications
              </h4>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked
                />
                <label className="form-check-label">
                  Email Notifications
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked
                />
                <label className="form-check-label">
                  Appointment Reminders
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="col-md-6">
          <div
            className={`card shadow border-0 ${
              toggle ? "bg-secondary text-light" : ""
            }`}
          >
            <div className="card-body">
              <h4 className="mb-3">
                <i className="bi bi-shield-lock me-2"></i>
                Security
              </h4>

              <button className="btn btn-warning me-2">
                Change Password
              </button>

              <button className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}