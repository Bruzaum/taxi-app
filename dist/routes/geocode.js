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
exports.getCoordinates = void 0;
// src/routes/geocode.ts
const axios_1 = __importDefault(require("axios"));
// Substitua pela sua chave de API do Google
const API_KEY = "SUA_CHAVE_DE_API_DO_GOOGLE";
const getCoordinates = (address) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;
    try {
        const response = yield axios_1.default.get(url); // Definindo o tipo da resposta aqui
        const location = (_b = (_a = response.data.results[0]) === null || _a === void 0 ? void 0 : _a.geometry) === null || _b === void 0 ? void 0 : _b.location;
        if (location) {
            return {
                lat: location.lat,
                lng: location.lng,
            };
        }
        else {
            throw new Error("Location not found");
        }
    }
    catch (error) {
        throw new Error("Error fetching coordinates");
    }
});
exports.getCoordinates = getCoordinates;
