import { useState } from "react"

export const useForm = (initialForm = {}) => {
  const [ formState, setFormState ] = useState( initialForm )

  const onInputChange = (ev) => {
    setFormState({
      ...formState,
      [ev.target.name]: ev.target.value 
    })
  }

  const onResetForm = () => {
    setFormState( initialForm )
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm
  }
}
