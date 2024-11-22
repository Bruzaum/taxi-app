"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const client_1 = require("@prisma/client");
const drivers_1 = require("./drivers");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
const API_KEY = "AIzaSyBFsUUBnK9EIob48O54ckEqJ34-6-Q5hls";
// Função para obter as coordenadas de um endereço
const getCoordinates = async (address) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;
    try {
        // Adicionando tipagem explícita ao axios para garantir que response tenha o tipo esperado
        const response = await axios_1.default.get(url);
        if (response.data.status === "OK") {
            const location = response.data.results[0]?.geometry?.location;
            return {
                latitude: location?.lat,
                longitude: location?.lng,
            };
        }
        else {
            throw new Error("Unable to geocode address");
        }
    }
    catch (error) {
        throw new Error("Error fetching coordinates");
    }
};
// Função para calcular a distância e duração entre dois pontos usando a API de Distance Matrix
const getDistanceAndDuration = async (origin, destination) => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${API_KEY}`;
    try {
        // Tipagem explícita para a resposta da API
        const response = await axios_1.default.get(url);
        if (response.data.status === "OK") {
            const element = response.data.rows[0].elements[0];
            // Converter distância para quilômetros
            const distanceInKm = (element.distance.value / 1000).toFixed(2); // Formatar para 2 casas decimais
            // Converter duração para o formato "10min33s"
            const durationInMinutes = Math.floor(element.duration.value / 60); // Minutos inteiros
            const durationInSeconds = element.duration.value % 60; // Segundos restantes
            const durationFormatted = `${durationInMinutes}min${durationInSeconds}s`;
            return {
                distance: parseFloat(distanceInKm),
                duration: durationFormatted,
            };
        }
        else {
            throw new Error("Unable to calculate distance or duration");
        }
    }
    catch (error) {
        throw new Error("Error fetching distance and duration");
    }
};
// Função para lidar com a requisição
const getCoordinatesHandler = async (req, res) => {
    const { customer_id, origin, destination } = req.body;
    if (!customer_id || !origin || !destination) {
        res.status(400).send({
            error_code: "INVALID_DATA",
            error_description: "Todos os campos obrigatórios não foram preenchidos.",
        });
        return;
    }
    if (origin == destination) {
        res.status(400).send({
            error_code: "INVALID_DATA",
            error_description: "O endereço de origem não pode ser igual ao de destino.",
        });
        return;
    }
    try {
        // Obter as coordenadas dos endereços
        const originCoordinates = await getCoordinates(origin);
        const destinationCoordinates = await getCoordinates(destination);
        if (!originCoordinates || !destinationCoordinates) {
            res.status(500).send("Unable to geocode the addresses.");
            return;
        }
        // Calcular a distância e duração
        const { distance, duration } = await getDistanceAndDuration(originCoordinates, destinationCoordinates);
        // Obter os motoristas ordenados
        const drivers = await (0, drivers_1.sortedDrivers)(); // Resolva a Promise aqui
        // Criar o log da viagem (solicitação de viagem)
        const newRideRequest = await prisma.rideRequest.create({
            data: {
                customer_id: parseInt(customer_id), // Convertendo o customer_id para número
                originLat: originCoordinates.latitude.toString(),
                originLng: originCoordinates.longitude.toString(),
                originAdress: origin,
                destinationLat: destinationCoordinates.latitude.toString(),
                destinationLng: destinationCoordinates.longitude.toString(),
                destinationAdress: destination,
                distance, // Distância calculada
                duration, // Duração calculada
                // options: {
                //   connect: drivers.map((driver) => ({ id: driver.id })), // Associando os motoristas disponíveis à solicitação
                // },
            },
        });
        res.json({
            message: "Ride request created successfully.",
            rideRequest: newRideRequest,
        });
    }
    catch (error) {
        console.error("Error creating ride request:", error);
        res.status(500).send("Error creating ride request.");
    }
};
// Usando o getCoordinatesHandler como manipulador da rota
router.post("/ride/estimate", getCoordinatesHandler);
exports.default = router;
//# sourceMappingURL=googleRoutes.js.map