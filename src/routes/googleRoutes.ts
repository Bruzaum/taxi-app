import express, { Request, Response } from "express";
import axios from "axios";

import { sortedDrivers } from "./drivers";

const API_KEY = "AIzaSyBFsUUBnK9EIob48O54ckEqJ34-6-Q5hls";

const router = express.Router();

// Tipos de resposta para Geocode
interface GeocodeResponse {
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
  status: string;
}

// Tipos de resposta para Distance Matrix
interface DistanceMatrixResponse {
  rows: Array<{
    elements: Array<{
      distance: {
        value: number;
      };
      duration: {
        value: number;
      };
    }>;
  }>;
  status: string;
}

// Função para obter as coordenadas de um endereço
const getCoordinates = async (address: string) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;

  try {
    const response = await axios.get<GeocodeResponse>(url);

    if (response.data.status === "OK") {
      const location = response.data.results[0]?.geometry?.location;
      return {
        latitude: location?.lat,
        longitude: location?.lng,
      };
    } else {
      throw new Error("Unable to geocode address");
    }
  } catch (error) {
    throw new Error("Error fetching coordinates");
  }
};

// Função para calcular a distância e duração entre dois pontos usando a API de Distance Matrix
const getDistanceAndDuration = async (
  origin: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number }
) => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${API_KEY}`;

  try {
    const response = await axios.get<DistanceMatrixResponse>(url);

    if (response.data.status === "OK") {
      const element = response.data.rows[0].elements[0];

      // Converter distância para quilômetros
      const distanceInKm = (element.distance.value / 1000).toFixed(2); // Formatar para 2 casas decimais

      // Converter duração para o formato "10min33s"
      const durationInMinutes = Math.floor(element.duration.value / 60); // Minutos inteiros
      const durationInSeconds = element.duration.value % 60; // Segundos restantes
      const durationFormatted = `${durationInMinutes}min${durationInSeconds}s`;

      return {
        distance: distanceInKm,
        duration: durationFormatted,
      };
    } else {
      throw new Error("Unable to calculate distance or duration");
    }
  } catch (error) {
    throw new Error("Error fetching distance and duration");
  }
};

// Manipulador da rota
const getCoordinatesHandler: express.RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { customer_id, origin, destination } = req.body;

  if (!customer_id || !origin || !destination) {
    res.status(400).send({
      error_code: "INVALID_DATA",
      error_description: "Todos os campos não foram preenchidos",
    });
    return;
  }

  if (origin == destination) {
    res.status(400).send({
      error_code: "INVALID_DATA",
      error_description:
        "O endereço de origem não pode ser igual ao de destino",
    });
    return;
  }

  try {
    // Geocodificar os endereços para coordenadas
    const originCoordinates = await getCoordinates(origin);
    const destinationCoordinates = await getCoordinates(destination);

    // Verificar se as coordenadas são válidas
    if (!originCoordinates || !destinationCoordinates) {
      res.status(500).send("Unable to geocode the addresses.");
      return;
    }

    // Calcular a distância e a duração
    const { distance, duration } = await getDistanceAndDuration(
      originCoordinates,
      destinationCoordinates
    );

    // Retornar as coordenadas, distância e duração
    res.json({
      origin: originCoordinates,
      destination: destinationCoordinates,
      distance, // Distância em quilômetros
      duration, // Duração formatada em "minutos e segundos"
      options: sortedDrivers,
    });
  } catch (error) {
    res.status(500).send("Error retrieving distance and duration");
  }
};

// Usando o getCoordinatesHandler como manipulador da rota
router.post("/ride/estimate", getCoordinatesHandler);

export default router;