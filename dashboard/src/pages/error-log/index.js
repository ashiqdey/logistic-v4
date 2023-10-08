import { useSelector } from "react-redux";
import moment from "moment";

export default function ErrorLog() {
    const error = useSelector(state => state.error.value);

    return (
        <div className="p50 p1-xl">
            <div className="p50">
                <h3>Error log</h3>
                <div className="cgraya">View all error logs</div>
            </div>

            {
                error.upload.map((e, i) => <div className='p50 flex-md' key={i}>
                    <div className="badge grayd f08 mr50">{moment(e.ts).format('LT')}</div>
                    <div>{e.v}</div>
                </div>)
            }
        </div>
    )
}