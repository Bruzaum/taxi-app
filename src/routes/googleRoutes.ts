import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

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
        value: number; // Distância em metros
      };
      duration: {
        value: number; // Duração em segundos
      };
    }>;
  }>;
  status: string;
}

// Função para obter as coordenadas de um endereço
const getCoordinates = async (address: string) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;

  console.log(`Making request to Geocode API: ${url}`);

  try {
    const response = await axios.get<GeocodeResponse>(url);

    console.log("Geocode API response:", response.data);

    if (response.data.status === "OK") {
      const location = response.data.results[0]?.geometry?.location;
      return {
        lat: location?.lat,
        lng: location?.lng,
      };
    } else {
      console.error("Geocode API error: ", response.data.status);
      throw new Error("Unable to geocode address");
    }
  } catch (error) {
    console.error("Error fetching coordinates: ", error);
    throw new Error("Error fetching coordinates");
  }
};

// Função para calcular a distância e duração entre dois pontos usando a API de Distance Matrix
const getDistanceAndDuration = async (
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number }
) => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${destination.lat},${destination.lng}&key=${API_KEY}`;

  console.log(`Making request to Distance Matrix API: ${url}`);

  try {
    const response = await axios.get<DistanceMatrixResponse>(url);

    console.log("Distance Matrix API response:", response.data);

    if (response.data.status === "OK") {
      const element = response.data.rows[0].elements[0];
      return {
        distance: element.distance.value, // Distância em metros
        duration: element.duration.value, // Duração em segundos
      };
    } else {
      console.error("Distance Matrix API error: ", response.data.status);
      throw new Error("Unable to calculate distance or duration");
    }
  } catch (error) {
    console.error("Error fetching distance and duration: ", error);
    throw new Error("Error fetching distance and duration");
  }
};

// Manipulador da rota
const getCoordinatesHandler: express.RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { origin, destination } = req.body;

  if (!origin || !destination) {
    res.status(400).send("Both origin and destination are required.");
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
      distance: distance, // Distância em metros
      duration: duration, // Duração em segundos
    });
  } catch (error) {
    console.error("Error in route handler:", error);
    res.status(500).send("Error retrieving distance and duration");
  }
};

// Usando o getCoordinatesHandler como manipulador da rota
router.post("/get-coordinates", getCoordinatesHandler);

export default router;
