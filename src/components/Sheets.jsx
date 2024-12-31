// import React, { useState } from "react";
// import { gapi } from "gapi-script";

// const Sheets = ({ user }) => {
//   const [spreadsheetId, setSpreadsheetId] = useState("");
//   const [sheetName, setSheetName] = useState("Sheet1");
//   const [values, setValues] = useState([
//     ["Name", "Age"],
//     ["Alice", 30],
//     ["Bob", 25],
//   ]);

//   const createSpreadsheet = () => {
//     const spreadsheet = {
//       properties: {
//         title: "New Spreadsheet",
//       },
//     };
//     gapi.client.sheets.spreadsheets.create({}, spreadsheet).then((response) => {
//       setSpreadsheetId(response.result.spreadsheetId);
//       console.log("Spreadsheet created:", response.result);
//     });
//   };

//   const updateSheet = () => {
//     const range = `${sheetName}!A1`;
//     const valueRangeBody = {
//       range,
//       majorDimension: "ROWS",
//       values,
//     };
//     gapi.client.sheets.spreadsheets.values
//       .update({
//         spreadsheetId,
//         range,
//         valueInputOption: "RAW",
//         resource: valueRangeBody,
//       })
//       .then((response) => {
//         console.log("Sheet updated:", response.result);
//       });
//   };

//   return (
//     <div>
//       <button onClick={createSpreadsheet}>Create Spreadsheet</button>
//       <button onClick={updateSheet} disabled={!spreadsheetId}>
//         Update Sheet
//       </button>
//     </div>
//   );
// };

// export default Sheets;
