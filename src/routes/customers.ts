import { Router, Request, Response } from "express";

const router = Router();

interface Customer {
  id: number;
  name: string;
}

const customers: Customer[] = [
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
router.get("/ride/customers", (req: Request, res: Response) => {
  res.json(customers);
});

export default router;
