import Box from '@mui/material/Box';


export default function ExcelPreview({ data }) {

    return (<Box>
        {JSON.stringify(data)}
    </Box>)
}



