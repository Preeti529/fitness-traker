
// import { GoogleGenAI } from "@google/genai";
// import fs from "fs"

// const client = new GoogleGenAI({});
// export const analyzeImage=async(filepath:string)=>{
//     const base64ImageFile = fs.readFileSync(filepath, {
//   encoding: "base64",
// });

// const interaction = await client.interactions.create({
//     model: "gemini-2.5-flash",

//     const config={
//        responseMimeType:"application/json" ,
//        responseJsonSchema:{
//         type:"object",
//         properties:{
//             name:{
//                 type:"String",
//             },
//             calories:{
//                 type:"number"
//             },
//         }
//        }
//     }
//     input: [
//         {
//             type: "text",
//             text: "Extract the food name and estimated calories from this image in a JSON object."
//         },
//         {
//             type: "image",
//             data: base64ImageFile,
//             mime_type: "image/jpeg"
//         }
//     ]
// });

     
// }


import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const analyzeImage = async (filepath: string) => {
    try{
  const base64ImageFile = fs.readFileSync(filepath, {
    encoding: "base64",
  });

  const response = await client.models.generateContent({
    model: "gemini-3.1-flash-lite",

    contents: [
      {
        role: "user",
        parts: [
          {
            text: "Extract the food name and estimated calories from this image.",
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64ImageFile,
            },
          },
        ],
      },
    ],

    config: {
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          calories: {
            type: "number",
          },
        },
        required: ["name", "calories"],
      },
    },
  });

  return JSON.parse(response.text ?? "{}");
}catch(error){
   console.log(error) 
   throw error;
}
};
