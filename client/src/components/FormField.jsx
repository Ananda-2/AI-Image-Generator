//rafce
import React from 'react'

const FormField = ({LabelName , type , name , placeholder , value , 
                    handleChange , isSurpriseMe , handleSurpriseMe}) =>  (
    <div>
      <div className="flex flex-col gap-2 mb-2">
        <div>
          <label htmlFor = {name} 
                  className='text-sm font-medium text-gray-900'>     
            {LabelName}
          </label>

          {isSurpriseMe && (
            <button
                type='button'
                onClick={handleSurpriseMe}
                className='bg-gray-300 text-black font-semibold  
                            text-xs px-2 py-1 rounded-[5px] m-3 '>
              Surprise Me
            </button>
          )}
        </div>

        <input
            type={type}
            name = {name}
            placeholder={placeholder}
            id={name}
            value={value}
            onChange={handleChange}
            required

            className='bg-gray-100 border border-gray-300 text-gray-800 text-sm
                        rounded-lg p-2 focus:ring-[#4649ff] focus:border-[#4649ff]  
                        outline-none w-full '
        />

      </div>
    </div>
  )


export default FormField