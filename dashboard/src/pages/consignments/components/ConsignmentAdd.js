// 
import TrackingDetailsForm from "../../../sections/TrackingDetailsForm";
import useTracking from "../../../hooks/useTracking";

// ----------------------------------------------------------------------

export default function Consignment() {
    const { uploadConsignments } = useTracking();
    return (<TrackingDetailsForm onSubmit={(data) => uploadConsignments([{ ...data }])} />);
}
