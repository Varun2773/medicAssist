import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
function Chat() {
  const [loading, setLoading] = useState(false);
  const [texts, setText] = useState("");
  const [apiData, setApiData] = useState();
  // const [sumbit, setSubmit] = useState();
  const gemini_api_key = process.env.API_KEY;

  const genAI = new GoogleGenerativeAI(gemini_api_key);
  const fetchData = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
     your only purpose is to explain the given medicines name :${texts} and benifites, 
     if the given input is not a medicine name.then replay ask me about medicine related questions.
     your answer will be Points not in paragraph. can you please remove the '*' symbol from the output,
     you are a medical assistant name samata but dont say user name unless user ask about it.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setApiData(text);
    setLoading(false);
  };

  function handleChange(event) {
    const newVal = event.target.value;
    if (newVal == "") {
      alert(err);
    }
    setText(newVal);
  }

  function Submit() {
    // setSubmit(apiData);
    fetchData();
    setLoading(true);
  }

  return (
    <div className="img-box">
      <div>
        <input
          onChange={handleChange}
          type="text"
          value={texts}
          placeholder="enter medicine name"
        ></input>
      </div>

      <button className="btn" onClick={Submit}>
        Submit
      </button>
      {!loading && <p className="result">{apiData}</p>}
      {loading && <p >Loading...</p>}
    </div>
  );
}

export default Chat;

// import { useState } from "react";
// // import "./App.css";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// function App() {
//   const [loading, setLoading] = useState(false);
//   const [apiData, setApiData] = useState([]);
//   const [place, setPlace] = useState("Bangkok");
//   const [days, setDays] = useState(3);
//   const [preferences, setPreferences] = useState("");

//   const genAI = new GoogleGenerativeAI("AIzaSyB4Sih55970eFscJx6dOpHFP1KgD8JpAH4");
//   const fetchData = async () => {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const prompt = `
//     You are an expert tour guide. User is planning a trip to ${place} for ${days} days.
//     Create an vacation itinerary for the user based on this info.
//     Any other information relavant for the trip provided by user is ${preferences}. consider this while making the plan.
//     `;
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     setApiData(text);
//     setLoading(false);
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     console.log(place, days, preferences);
//     fetchData();
//   };

//   return (
//     <div className="container">
//       <h1>Google Gemini Pro AI Integration With React</h1>
//       <h3>Vacation Planner</h3>
//       <div className="mt-5 mb-5">
//         <form onSubmit={handleSubmit}>
//           <div className="row d-flex align-items-end">
//             <div className="col-lg-2">
//               <label htmlFor="place" className="form-label">
//                 Place
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="place"
//                 value={place}
//                 onChange={(e) => setPlace(e.target.value)}
//               />
//             </div>
//             <div className="col-lg-2">
//               <label htmlFor="days" className="form-label">
//                 How many days?
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="days"
//                 value={days}
//                 onChange={(e) => setDays(e.target.value)}
//               />
//             </div>
//             <div className="col-lg-2">
//               <label htmlFor="hobbies" className="form-label">
//                 Any preferences?
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="preferences"
//                 value={preferences}
//                 onChange={(e) => setPreferences(e.target.value)}
//               />
//             </div>
//             <div className="col-lg-2">
//               <button type="submit" className="btn btn-primary mt-3 col-lg-12">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//       <div className="">
//         {!loading && <p className="text-align-left">{apiData}</p>}
//         {loading && <p>Loading...</p>}
//       </div>
//       <div className="mt-4">
//         Developed By <a href="https://amankumar.ai">Aman</a> | Say Hi
//       </div>
//     </div>
//   );
// }
// export default App;
