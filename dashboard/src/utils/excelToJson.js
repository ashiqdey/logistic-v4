import * as XLSX from 'xlsx';

const excelToJson = (excelFile) => {

  if (excelFile === null) {
    return [];
  }

  return new Promise(resolve => {

    const reader = new FileReader();
    reader.readAsArrayBuffer(excelFile);

    reader.onload = (e) => {
      const fileRaw = e.target.result;

      // parse excel to json
      if (fileRaw === null) {
        return [];
      }
      const workbook = XLSX.read(fileRaw, { type: 'buffer', dateNF: "YYYY-MM-DD", cellDates: true });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      console.log(22, data)
      resolve(data);
    }
  })

}

export default excelToJson;