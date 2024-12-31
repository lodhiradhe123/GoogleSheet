import React, { useState, useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID =
  "464207482985-ltn7asth6bj25maqd6gvrqliq4hj5ua4.apps.googleusercontent.com"; // Use environment variable
const API_KEY = "AIzaSyBqSK5sLML_PXT0-ahdOnFqH7qqkAK9Pk0"; // Use environment variable
const SCOPES =
  "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [sheetName, setSheetName] = useState("Sheet1");
  const [sheetData, setSheetData] = useState([]);

  // Initialize GAPI Client
  useEffect(() => {
    const initializeGapi = () => {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
          })
          .then(() => {
            const authInstance = gapi.auth2.getAuthInstance();
            setIsSignedIn(authInstance.isSignedIn.get());
            if (authInstance.isSignedIn.get()) {
              setUser(authInstance.currentUser.get().getBasicProfile());
            }
            authInstance.isSignedIn.listen((isSignedIn) => {
              setIsSignedIn(isSignedIn);
              if (isSignedIn) {
                setUser(authInstance.currentUser.get().getBasicProfile());
              } else {
                setUser(null);
              }
            });
          })
          .catch((error) => {
            console.error("Error initializing GAPI client:", error);
          });
      });
    };

    initializeGapi();
  }, []);

  const handleSignIn = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance
      .signIn()
      .then(() => {
        setUser(authInstance.currentUser.get().getBasicProfile());
        setIsSignedIn(true);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  const handleSignOut = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signOut().then(() => {
      setIsSignedIn(false);
      setUser(null);
      setSpreadsheetId("");
      setSheetData([]);
    });
  };

  const createSpreadsheet = () => {
    const spreadsheet = {
      properties: { title: "My New Spreadsheet" },
    };
    gapi.client.sheets.spreadsheets
      .create({ resource: spreadsheet })
      .then((response) => {
        setSpreadsheetId(response.result.spreadsheetId);
        alert(`Spreadsheet created: ${response.result.spreadsheetId}`);
      })
      .catch((error) => {
        console.error("Error creating spreadsheet:", error);
      });
  };

  const addDataToSheet = () => {
    if (!spreadsheetId) {
      alert("Please create or select a spreadsheet first!");
      return;
    }
    const range = `${sheetName}!A1`;
    const values = [
      ["Name", "Age"],
      ["Alice", 30],
      ["Bob", 25],
    ];
    const body = { values };
    gapi.client.sheets.spreadsheets.values
      .update({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        resource: body,
      })
      .then(() => {
        alert("Data added to the sheet!");
      })
      .catch((error) => {
        console.error("Error adding data:", error);
      });
  };

  const readDataFromSheet = () => {
    if (!spreadsheetId) {
      alert("Please create or select a spreadsheet first!");
      return;
    }
    const range = `${sheetName}!A1:Z1000`;
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId,
        range,
      })
      .then((response) => {
        setSheetData(response.result.values || []);
      })
      .catch((error) => {
        console.error("Error reading data:", error);
      });
  };

  return (
    <div className="App">
      <h1>Google Sheets Integration</h1>
      {!isSignedIn ? (
        <button onClick={handleSignIn}>Sign in with Google</button>
      ) : (
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
          <h2>Welcome, {user?.getGivenName()}</h2>
          <button onClick={createSpreadsheet}>Create Spreadsheet</button>
          {spreadsheetId && (
            <>
              <button onClick={addDataToSheet}>Add Data to Sheet</button>
              <button onClick={readDataFromSheet}>Read Data from Sheet</button>
            </>
          )}
          {sheetData.length > 0 && (
            <table>
              <thead>
                <tr>
                  {sheetData[0].map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sheetData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
