import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { DistanceContext } from "../../DistanceContext";
import api from "../../Api.js";
import MapComponent from "../Map";

export default function FormEstimate() {
  const { register, handleSubmit } = useForm();
  const [mapData, setMapData] = useState({ origin: null, destination: null });
  const { setDistance } = useContext(DistanceContext); // Acessa a função para atualizar a distância

  const handleRequest = async (data) => {
    const { customer_id, origin, destination } = data;

    if (!origin || !destination) {
      setMapData({ origin: null, destination: null });
      return;
    }

    const payload = { customer_id, origin, destination };

    try {
      const response = await api.post("/ride/estimate", payload);
      const distance = response.data.rideRequest.distance;

      setDistance(distance);

      setMapData({ origin, destination });
    } catch (error) {
      console.error("Erro no POST /ride/estimate:", error);
      setMapData({ origin: null, destination: null });
    }
  };

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
          placeholder="Endereço de origem"
          {...register("origin", { required: true })}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          placeholder="Endereço de destino"
          {...register("destination", { required: true })}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>

      {/* Componente de Mapa */}
      <div className="mt-8">
        <MapComponent
          origin={mapData.origin}
          destination={mapData.destination}
        />
      </div>
    </div>
  );
}
