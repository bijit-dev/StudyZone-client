import { useNavigate } from "react-router";

const StudyScssionCard = ({ session, now }) => {
    const navigate = useNavigate();
    
    const hendelreadmore = (id) => {
        navigate(`/session/${id}`)
    }
    
    return (
        <div className="card bg-base-100 shadow-sm relative">
            <figure>
                <img
                    src={session.photoURL || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                    alt="session image" />
            </figure>
            <p
                className={` absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${new Date(session.registrationEnd) >= now
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
            >
                {new Date(session.registrationEnd) >= now ? "Ongoing" : "Closed"}
            </p>
            <div className="card-body">
                <h2 className="card-title">{session.title}</h2>
                <p>{session.description}</p>
                <div className="card-actions justify-end">
                    <button onClick={()=>hendelreadmore(session._id)} className="btn btn-accent text-white">read more</button>
                </div>
            </div>
        </div>
    );
};

export default StudyScssionCard;