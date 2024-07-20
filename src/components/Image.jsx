import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
function Image() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [responses, setResponse] = useState(null);

  const gemini_api_key = process.env.API_KEY;

  const genAI = new GoogleGenerativeAI(gemini_api_key);
  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }
  const fetchDataProVision = async () => {
    if (!file) {
      alert("error");
      return;
    }
    // setResponse(null);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
      const fileInputEl = document.querySelector("input[type=file]");
      const imageParts = await Promise.all(
        [...fileInputEl.files].map(fileToGenerativePart)
      );

      const prompt = `
      your only purpose is to explain the given report ${imageParts} as simple as way, 
      if the given input is not a medicine report.then replay them to medical related document.
      your answer will be Points not in paragraph. can you please remove the '*' symbol from the output,
      you are a medical assistant name samata but dont say user name unless user ask about it.`;

      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = response.text();

      setResponse(text);
      setLoading(false);
      // console.log(text);
    } catch (error) {
      setError(`error: ${error}`);
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    if (file && allowedTypes.includes(file.type)) {
      reader.readAsDataURL(file);
    } else {
      event.target.value = null;
    }
  };

  function Submit() {
    fetchDataProVision();
    setLoading(true);
  }
  return (
    <div className="img-box">
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange}></input>
      </div>
      <button className="btn" onClick={Submit}>
        Submit
      </button>

      {!loading && <p className="result">{responses}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Image;
