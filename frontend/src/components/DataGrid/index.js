import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID da Corrida", width: 120 },
  { field: "originAdress", headerName: "Endereço de Origem", width: 250 },
  { field: "destinationAdress", headerName: "Endereço de Destino", width: 250 },
  {
    field: "distance",
    headerName: "Distância (km)",
    type: "number",
    width: 150,
  },
  { field: "duration", headerName: "Duração", width: 150 },
  { field: "driverName", headerName: "Nome do Motorista", width: 200 },
  { field: "value", headerName: "Valor (R$)", type: "number", width: 150 },
  { field: "createdAt", headerName: "Data", width: 150 },
];

export default function RideLogDataGrid({ rideLogs }) {
  return (
    <Box sx={{ height: 500, width: "85%" }}>
      <DataGrid
        rows={rideLogs}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
