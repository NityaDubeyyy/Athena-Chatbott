// import {OpenAI} from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
// }); 

// export default openai

// //we have created an api key in ggoogle gemini..and then i ahve added that key in environment variable


import dotenv from "dotenv";
dotenv.config();  // Load env here too

import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export default openai;
