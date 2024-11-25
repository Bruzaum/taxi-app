import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../Api.js";
import RideLogDataGrid from "../DataGrid/index.js";

export default function FormSearch() {
  const { register, handleSubmit } = useForm();
  const [rideLogs, setRideLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleRequest(data) {
    const { customer_id, driver_id } = data;

    setIsLoading(true); // Inicia o estado de carregamento

    try {
      // Faz a requisição para obter todos os motoristas
      const driversResponse = await api.get(`/drivers`);
      const driver = driversResponse.data.find(
        (driver) => driver.id === parseInt(driver_id)
      );
      const driverName = driver ? driver.name : "Desconhecido";

      // Faz a requisição para buscar os dados das corridas
      const response = await api.get(
        `/ride/${customer_id}?driver_id=${driver_id}`
      );

      // Verifica se a resposta contém a chave 'rides'
      if (response.data && Array.isArray(response.data.rides)) {
        const logs = response.data.rides.map((log) => ({
          id: log.id,
          originAdress: log.originAdress,
          destinationAdress: log.destinationAdress,
          distance: log.distance.toFixed(2),
          duration: log.duration,
          driverName: driverName,
          value: log.value.toFixed(2),
          createdAt: new Date(log.createdAt).toLocaleDateString(),
        }));

        setRideLogs(logs); // Atualiza os logs
      } else {
        console.error(
          "A resposta não contém a chave 'rides' ou não é um array.",
          response.data
        );
        setRideLogs([]); // Limpa os dados em caso de resposta inesperada
      }
    } catch (error) {
      // Exibe mais detalhes sobre o erro
      if (error.response) {
        console.error(
          `Erro na API (status ${error.response.status}):`,
          error.response.data
        );
      } else if (error.request) {
        console.error("Nenhuma resposta recebida da API:", error.request);
      } else {
        console.error("Erro na configuração da requisição:", error.message);
      }

      setRideLogs([]); // Limpa os dados em caso de erro
    } finally {
      setIsLoading(false); // Finaliza o estado de carregamento
    }
  }

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit(handleRequest)}
        className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0 w-auto p-4 bg-gray-100 rounded shadow"
      >
        <input
          placeholder="ID do usuário"
          {...register("customer_id", { required: true })}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          placeholder="ID do motorista"
          {...register("driver_id", { required: true })}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className={`${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded`}
          disabled={isLoading}
        >
          {isLoading ? "Carregando..." : "Buscar"}
        </button>
      </form>

      <div className="mt-8 w-full flex justify-center">
        <RideLogDataGrid rideLogs={rideLogs} />
      </div>
    </div>
  );
}
