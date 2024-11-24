import { useForm } from "react-hook-form";
import api from "../../Api.js";

export default function CreateForm() {
  const { register, handleSubmit } = useForm();

  function formDataToJsonMapper(customer_id, origin, destination) {
    let formatedData = {
      customer_id: customer_id,
      origin: origin,
      destination: destination,
    };

    return JSON.stringify(formatedData);
  }

  async function handleRequest(data) {
    // Extraindo os dados do formulário
    const { customer_id, origin, destination } = data;

    // Transformando os dados para JSON
    const jsonData = formDataToJsonMapper(customer_id, origin, destination);

    const axiosConfig = { headers: { "Content-Type": "application/json" } };

    // Enviando a requisição
    try {
      const response = await api.post("/ride/estimate", jsonData, axiosConfig);
      console.log("Resposta:", response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleRequest)}>
      <input
        placeholder="ID do usuário"
        {...register("customer_id", { required: true })}
      />
      <input
        placeholder="Endereço de origem"
        {...register("origin", { required: true })}
      />
      <input
        placeholder="Endereço de destino"
        {...register("destination", { required: true })}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
