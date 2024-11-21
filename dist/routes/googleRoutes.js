"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_KEY = "AIzaSyBFsUUBnK9EIob48O54ckEqJ34-6-Q5hls";
const router = express_1.default.Router();
// Função para obter as coordenadas de um endereço
const getCoordinates = (address) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;
    console.log(`Making request to Geocode API: ${url}`);
    try {
        const response = yield axios_1.default.get(url);
        console.log("Geocode API response:", response.data);
        if (response.data.status === "OK") {
            const location = (_b = (_a = response.data.results[0]) === null || _a === void 0 ? void 0 : _a.geometry) === null || _b === void 0 ? void 0 : _b.location;
            return {
                latitude: location === null || location === void 0 ? void 0 : location.lat,
                longitude: location === null || location === void 0 ? void 0 : location.lng,
            };
        }
        else {
            console.error("Geocode API error: ", response.data.status);
            throw new Error("Unable to geocode address");
        }
    }
    catch (error) {
        console.error("Error fetching coordinates: ", error);
        throw new Error("Error fetching coordinates");
    }
});
// Função para calcular a distância e duração entre dois pontos usando a API de Distance Matrix
// Função para calcular a distância e duração entre dois pontos usando a API de Distance Matrix
const getDistanceAndDuration = (origin, destination) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${API_KEY}`;
    console.log(`Making request to Distance Matrix API: ${url}`);
    try {
        const response = yield axios_1.default.get(url);
        console.log("Distance Matrix API response:", response.data);
        if (response.data.status === "OK") {
            const element = response.data.rows[0].elements[0];
            // Converter distância para quilômetros
            const distanceInKm = (element.distance.value / 1000).toFixed(2); // Formatar para 2 casas decimais
            // Converter duração para o formato "10min33s"
            const durationInMinutes = Math.floor(element.duration.value / 60); // Minutos inteiros
            const durationInSeconds = element.duration.value % 60; // Segundos restantes
            const durationFormatted = `${durationInMinutes}min${durationInSeconds}s`;
            return {
                distance: `${distanceInKm} km`,
                duration: durationFormatted,
            };
        }
        else {
            console.error("Distance Matrix API error: ", response.data.status);
            throw new Error("Unable to calculate distance or duration");
        }
    }
    catch (error) {
        console.error("Error fetching distance and duration: ", error);
        throw new Error("Error fetching distance and duration");
    }
});
// Manipulador da rota
const getCoordinatesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { origin, destination } = req.body;
    if (!origin || !destination) {
        res.status(400).send("Both origin and destination are required.");
        return;
    }
    try {
        // Geocodificar os endereços para coordenadas
        const originCoordinates = yield getCoordinates(origin);
        const destinationCoordinates = yield getCoordinates(destination);
        // Verificar se as coordenadas são válidas
        if (!originCoordinates || !destinationCoordinates) {
            res.status(500).send("Unable to geocode the addresses.");
            return;
        }
        // Calcular a distância e a duração
        const { distance, duration } = yield getDistanceAndDuration(originCoordinates, destinationCoordinates);
        // Retornar as coordenadas, distância e duração
        res.json({
            origin: originCoordinates,
            destination: destinationCoordinates,
            distance, // Distância formatada em quilômetros
            duration, // Duração formatada em "minutos e segundos"
        });
    }
    catch (error) {
        console.error("Error in route handler:", error);
        res.status(500).send("Error retrieving distance and duration");
    }
});
// Usando o getCoordinatesHandler como manipulador da rota
router.post("/get-coordinates", getCoordinatesHandler);
exports.default = router;
