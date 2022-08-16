import React from 'react'

interface ButtonInterface{
  title: string
}

export default function ButtonSubmit({title} : ButtonInterface) {
  return (
    <div className='form_content btn_final_div'>
      <button type='submit' className='button_submit'>{title}</button>
    </div>
  )
}
