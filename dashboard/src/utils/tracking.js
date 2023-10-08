import { statusMap, statusObj } from "../configs";




export const statusToId = (status) => {
    if (!status) return '1';

    switch (status) {
        case "TRANSIT":
            return "2";
        case "OUT_FOR_DEL":
            return "3";
        case "UNDELIVERED":
            return "4";
        case "DELIVERED":
            return "5";
        case "RTO":
            return "6";
        default:
            return "1";
    }
}


export const getStatusColor = (status) => {
    if (!status) return 'default';

    switch (status) {
        case "2":
            return "primary";
        case "3":
            return "warning";
        case "4":
            return "warning";
        case "5":
            return "success";
        case "6":
            return "error";
        default:
            return "default";
    }
}


export const getStatusLabel = (status) => {
    if (!status) return '';

    return statusObj[status] || ''
}

export const getStatusId = (status) => {
    // for all return all
    if (status !== 'all') {
        const keys = Object.keys(statusMap);

        for (let i = 0; i < keys.length; i += 1) {
            if (status === statusMap[keys[i]]) {
                return keys[i];
            }
        }
    }

    return 'all';
}
