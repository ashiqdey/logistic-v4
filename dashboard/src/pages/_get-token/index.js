import { useEffect } from "react"
import { Spinner } from "components/xbl";
import useGetToken from 'hooks/useGetToken';


export default function Dashboard() {
    const query = new URLSearchParams(window.location.search);
    let redirect = query.get('r') || "/dashboard";

    if (redirect.includes("/login")) {
        redirect = "/dashboard";
    }

    const getToken = useGetToken(redirect);

    useEffect(() => {
        getToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="p50 h100vh ic ">
            <Spinner /> :
        </div>
    )
}



