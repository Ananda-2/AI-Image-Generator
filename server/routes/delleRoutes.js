// import express from 'express'
// import * as dotenv from 'dotenv' 
// import OpenAI from 'openai';
// import OpenAIApi from "openai"
// import Configuration from "openai"

// dotenv.config() ;

// const router = express.Router();

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(configuration);

// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
// // });

// router.route('/').post(async(req,res) =>{
//     try{
//         const {prompt} = req.body ;
//         const aiResponce = await openai.images.generate({

//             prompt,
//             n:1,
//             size : '256x256',
//             response_format : 'b64_json' , 
//         }
//         )
//         console.log(aiResponce)
//         const image = aiResponce.data.data[0].b64_json ;
//         res.status(200).json({photo:image}) ;
//     } catch(error){
//         console.error(error) ;
//         res.status(500).send(error);
//         //res.status(500).send(error?.response.data.error.message);
//     }
// })

// export default router ;









import express from 'express';
import * as dotenv from 'dotenv';
// import { Configuration, OpenAIApi } from 'openai';
import OpenAIApi from "openai"
import Configuration from "openai"

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// router.route('/').get((req, res) => {
//   res.status(200).json({ message: 'Hello from DALL-E!' });
// });

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt) ;
    const aiResponse = await openai.images.generate({
        prompt ,
        n: 1,
        size: "256x256",
      });
    //   image_url = response.data.data[0].url;

    // console.log(aiResponse) ;
    // console.log(aiResponse.data) ;
    // console.log(1) ;
    // console.log(aiResponse.data[0]) ;

    const image = aiResponse.data[0].url ;

    // console.log(image);

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;