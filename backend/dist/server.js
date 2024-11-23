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
// Substitua pela sua chave de API do Google
const API_KEY = 'SUA_CHAVE_DE_API_DO_GOOGLE';
const router = express_1.default.Router();
// Função para pegar as coordenadas de um endereço
const getCoordinates = (address) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;
    try {
        const response = yield axios_1.default.get(url);
        const location = (_b = (_a = response.data.results[0]) === null || _a === void 0 ? void 0 : _a.geometry) === null || _b === void 0 ? void 0 : _b.location;
        if (location) {
            return {
                lat: location.lat,
                lng: location.lng,
            };
        }
        else {
            throw new Error('Location not found');
        }
    }
    catch (error) {
        throw new Error('Error fetching coordinates');
    }
});
// Função separada que será usada como manipulador de rota
const getCoordinatesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { origin, destination } = req.body;
    if (!origin || !destination) {
        return res.status(400).send('Both origin and destination are required.');
    }
    try {
        const originCoordinates = yield getCoordinates(origin);
        const destinationCoordinates = yield getCoordinates(destination);
        return res.json({
            origin: originCoordinates,
            destination: destinationCoordinates,
        });
    }
    catch (error) {
        return res.status(500).send('Error retrieving coordinates');
    }
});
// Usando o getCoordinatesHandler como manipulador da rota
router.post('/get-coordinates', getCoordinatesHandler);
exports.default = router;
