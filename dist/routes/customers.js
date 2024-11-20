"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const customers = [
    {
        id: 1,
        name: "Homer Simpson",
    },
    {
        id: 2,
        name: "Dominic Toretto",
    },
    {
        id: 3,
        name: "James Bond",
    },
];
// Get all Customers
router.get("/ride/customers", (req, res) => {
    res.json(customers);
});
exports.default = router;
