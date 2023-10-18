//rafce
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {preview} from '../assets' 
import {GetRandomPrompt} from '../utils' ;
import { FormField , Loader} from "../components"

const CreatePost = () => {
  const navigate = useNavigate() ;
  const [form, setForm] = useState({
    name: '' ,
    prompt:'',
    photo:'',
  }) ;

  const [generatingImg, setgeneratingImg] = useState(false) ;
  const [loading, setloading] = useState(false) ;

  const generateImage = async ()=>{ 
    if(form.prompt){
      try{
        setgeneratingImg(true) ;
        const response = await fetch('http://localhost:8080/api/v1/delle',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        // console.log(data);
        // console.log(1);
        // console.log(data.photo);
        // console.log(1);
        // console.log(data.photo.photo);

        setForm({ ...form, photo: data.photo });
      } catch (err) {
        alert(err);
      } finally {
        setgeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault() ;

    if(form.prompt && form.photo){
      setloading(true) ;

      try{
        const response =  await fetch('http://localhost:8080/api/v1/post',{
          method:'POST' ,
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(form)
        })

        await response.json() ;
        navigate('/') ;
      }
      catch(err){
        alert(err) ;
      }finally{
        setloading(false) ;
      }
    }
    else{
      alert("Please Enter Name and a Prompt and Genreate an Image first ")

    }

   
  }

  const handleChange = (e) =>{
   setForm({...form , [e.target.name] : e.target.value})
  }
  const handleSurpriseMe = () =>{
    const randomPrompt =  GetRandomPrompt(form.prompt) ;
    setForm({...form , prompt:randomPrompt})
  }


  return (
    <section className=' max-w-7xl mx-auto '>

      <div>
        <h1 className=' font-extrabold text-[32px] '>
          Create
        </h1>
        <p className=' mt-3 text-[15px] text-gray-400 '>
          Create imaginative and visually stunning image generated through DALL-E-AI and share them with the community 
        </p>
      </div>

      <form className = 'mt-16 max-w-2xl' onSubmit = {handleSubmit} >

        <div className='flex flex-col gap-5'>

          <FormField
              LabelName = "Your Name"
              type = "text"
              name = "name"
              placeholder = "Ananda"
              value = {form.name}
              handleChange  = {handleChange}
          />
          <FormField
              LabelName = "Prompt"
              type = "text"
              name = "prompt"
              placeholder = "an oil pastel drawing of an annoyed cat in a spaceship"
              value = {form.prompt}
              handleChange  = {handleChange}
              isSurpriseMe
              handleSurpriseMe = {handleSurpriseMe} 
          />

          <div className="relative bg-gray-50 border bg-gray-300
                        text-gray-900 text-sm rounded-lg focus:ring-blue-500
                        w-64 h-64 p-3 flex justify-center items-center ">

              {form.photo ? (
                  <img  src={form.photo} 
                        alt= {form.prompt} 
                        className='w-full h-full object-contain' 
                  />
              ) : (

                <img  src={preview} 
                      alt="preview"
                      className='w-full h-full object-contain opacity-40' 
                />

              )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex 
                        justify-center items-center rounded-lg 
                        bg-[rgba(63,62,62,0.5)] ">
                  <Loader/>
                </div>
              )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type='button'
            onClick={generateImage}
            className='text-white bg-green-700 font-medium
                  rounded-md text-sm px-5 py-1.5 text-center ' 
          >
            {generatingImg ? 'Generating...' : 'Generate' }

          </button>
        </div>

        <div className="mt-10 ">
          <p className=' text-gray-500 text-[14px] '>Once you have generated , you can share with community</p>
          <button
            type='submit'
            className='text-white bg-blue-700 font-medium mt-5
                  rounded-md text-sm w-full sm:w-auto px-5 py-1.5 text-center ' 
          >
            {loading ? 'sharing...' : 'Share with community' }

          </button>
        </div>

      </form>


    </section>
  )
}

export default CreatePost