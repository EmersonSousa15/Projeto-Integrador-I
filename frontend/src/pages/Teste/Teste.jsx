import React, { useState } from "react";
import { useForm } from 'react-hook-form';

const Teste = () => {
  const { register, 
    handleSubmit, /* Trata o envio */
    formState: { errors },
    setValue } = useForm();
  const [data, setData] = useState("");

  const onSubmit = (data) => {
    setData(JSON.stringify(data));
    console.log(data); // Imprime os dados do formulário no console
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName", {required: true, minLength:2  })} placeholder="First name" />
        {errors.firstName?.type === 'required' && <p>Este campo é obrigatório.</p>}

        <input type="number" {...register("age", {required: true, min:16 , max: 120 })} placeholder="Idade" />
        {errors.age?.type === 'min' && <p>Idade precisa ser entre 16 e 120 anos.</p>}

        <select {...register("category", { required: true })}>
          <option value="">Select...</option>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
        </select>

        <textarea {...register("aboutYou")} placeholder="About you" />

        <p>{data}</p>

        <input type="submit" />

      </form>

      <button onClick={()=> setValue('age',18)}>Definir como maior de idade</button>
    </div>
  );

}

export default Teste
