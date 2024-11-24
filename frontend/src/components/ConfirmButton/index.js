import api from "../../Api.js";
import { useForm } from "react-hook-form";

export default function ConfirmButton() {
  const { handleSubmit } = useForm();

  async function handleConfirm(data) {
    // Enviando a requisição
    try {
      const response = await api.patch("/ride/confirmation");
      console.log("Resposta:", response.data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleConfirm)}>
      <button type="submit">Submit</button>
    </form>
  );
}
