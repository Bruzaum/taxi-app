import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import api from "../../Api"; // Certifique-se de ajustar o caminho

function DriverCard({
  id, // Adicionado para capturar o driver_id
  name,
  description,
  vehicle,
  reviewRating,
  reviewComment,
  value,
  kmMin,
  distance,
}) {
  const rideCost = distance * value;

  const handleSelect = async () => {
    try {
      const response = await api.patch("/ride/confirmation", {
        driver_id: id,
        value,
      });
      console.log("Confirmação realizada com sucesso:", response.data);
      alert("Corrida confirmada com sucesso!");
    } catch (error) {
      console.error("Erro ao confirmar a corrida:", error);
      alert("Erro ao confirmar a corrida. Tente novamente.");
    }
  };

  return (
    <Box sx={{ maxWidth: 380, margin: 2 }}>
      <Card variant="outlined">
        <CardContent sx={{ minHeight: 380 }}>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Motorista
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2">
            <b>Veículo:</b> {vehicle}
            <br />
            <b>Avaliação:</b> {reviewRating}/5
            <br />
            <b>Comentário:</b> {reviewComment}
            <br />
            <b>Valor por Km:</b> R${value.toFixed(2)}
            <br />
            <b>Km Mínimo:</b> {kmMin} km
            <br />
            <b>Distância:</b> {distance} km
            <br />
            <b>Valor da Corrida:</b> R${rideCost.toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleSelect}>
            Selecionar
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default function DriverCards({ drivers, distance }) {
  const uniqueDrivers = Array.from(
    new Map(drivers.map((driver) => [driver.id, driver])).values()
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      {uniqueDrivers.map((driver) => (
        <DriverCard
          key={driver.id}
          id={driver.id}
          name={driver.name}
          description={driver.description}
          vehicle={driver.vehicle}
          reviewRating={driver.review_rating}
          reviewComment={driver.review_comment}
          value={driver.value}
          kmMin={driver.km_min}
          distance={distance}
        />
      ))}
    </Box>
  );
}
