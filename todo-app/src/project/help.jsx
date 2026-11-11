
import { useState } from "react";
import UserContext from "./indexcontext";
import { useContext } from "react";

const faqs = [
    {
        id: 1,
        question: "How can I create a new project?",
        answer: "Go to the Projects section, click on New Project, enter project details and click Create Project.",
    },
    {
        id: 2,
        question: "How can I add a new task?",
        answer: "Go to the Tasks section, click on New Task, enter task details and save it.",
    },
    {
        id: 3,
        question: "How can I track project progress?",
        answer: "Visit the Projects or Reports section to view project progress and completed tasks.",
    },
    {
        id: 4,
        question: "How can I manage notifications?",
        answer: "Open the Notifications section to view, mark as read or delete notifications.",
    },
];

export function Help() {

    const {toggle} = useContext(UserContext)
    const [search, setSearch] = useState("");
    const [activeFaq, setActiveFaq] = useState(null);

    const [form, setForm] = useState({
        subject: "",
        category: "General",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    // Search FAQs
    const filteredFaqs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase())
    );

    // Submit Support Form
    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);

        setForm({
            subject: "",
            category: "General",
            message: "",
        });
    };

    return (
        <main className={`container-fluid py-4 px-3 bg-light min-vh-100 ${toggle ? 'bg-dark bg-body-secondary' : 'bg-white'}`}>

            {/* Header */}
            <div className="mb-4">
                <h2 className="fw-bold mb-1">Help & Support</h2>
                <p className="text-secondary mb-0">
                    Find answers to your questions and get support.
                </p>
            </div>

            {/* Help Search */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body text-center p-4 p-md-5">

                    <h4 className="fw-bold mb-2">How can we help you?</h4>

                    <p className="text-secondary">
                        Search for answers to common questions.
                    </p>

                    <div className="input-group mx-auto" style={{ maxWidth: "500px" }}>
                        <span className="input-group-text bg-white">
                            <i className="bi bi-search"></i>
                        </span>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search your questions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                </div>
            </div>

            <div className="row g-4">

                {/* FAQ Section */}
                <div className="col-lg-7">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-4">
                                Frequently Asked Questions
                            </h5>

                            {filteredFaqs.length > 0 ? (

                                filteredFaqs.map((faq) => (

                                    <div className="border-bottom py-3" key={faq.id}>

                                        <div
                                            className="d-flex justify-content-between align-items-center gap-2"
                                            role="button"
                                            onClick={() =>
                                                setActiveFaq(
                                                    activeFaq === faq.id ? null : faq.id
                                                )
                                            }
                                        >

                                            <h6 className="mb-0 fw-semibold">
                                                {faq.question}
                                            </h6>

                                            <i className={`bi ${
                                                activeFaq === faq.id
                                                    ? "bi-chevron-up"
                                                    : "bi-chevron-down"
                                            }`}></i>

                                        </div>

                                        {activeFaq === faq.id && (
                                            <p className="text-secondary small mt-3 mb-0">
                                                {faq.answer}
                                            </p>
                                        )}

                                    </div>

                                ))

                            ) : (

                                <p className="text-secondary text-center py-4 mb-0">
                                    No questions found.
                                </p>

                            )}

                        </div>

                    </div>

                </div>

                {/* Contact Support */}
                <div className="col-lg-5">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-2">Contact Support</h5>

                            <p className="text-secondary small mb-4">
                                Didn't find your answer? Send us a message.
                            </p>

                            {submitted && (
                                <div className="alert alert-success">
                                    Your support request has been submitted successfully.
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">Subject</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter subject"
                                        value={form.subject}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                subject: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Category</label>

                                    <select
                                        className="form-select"
                                        value={form.category}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                category: e.target.value,
                                            })
                                        }
                                    >
                                        <option>General</option>
                                        <option>Projects</option>
                                        <option>Tasks</option>
                                        <option>Account</option>
                                        <option>Technical Issue</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Message</label>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        placeholder="Describe your problem..."
                                        value={form.message}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                message: e.target.value,
                                            })
                                        }
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Submit Request
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}
