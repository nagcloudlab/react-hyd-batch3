

import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "*"
}));

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 100000,
        description: "Laptop for all your computing needs",
        imageUrl: "/images/Laptop.png"
    },
    {
        id: 2,
        name: "Smartphone",
        price: 50000,
        description: "Smartphone for all your communication needs",
        imageUrl: "/images/Mobile.png"
    },
]

const reviews = {
    1: [
        {
            id: 1,
            productId: 1,
            name: "John Doe",
            rating: 5,
            comment: "Great laptop!",
            date: "2024-06-01"
        },
        {
            id: 2,
            productId: 1,
            name: "Jane Doe",
            rating: 4,
            comment: "Good value for money.",
            date: "2024-06-02"
        }
    ],
    2: [
        {
            id: 1,
            productId: 2,
            name: "Alice Smith",
            rating: 4,
            comment: "Nice smartphone with good features.",
            date: "2024-06-03"
        },
        {
            id: 2,
            productId: 2,
            name: "Bob Johnson",
            rating: 3,
            comment: "Battery life could be better.",
            date: "2024-06-04"
        },
    ]
};

app.get("/products", (req, res) => {
    res.json(products);
});
app.get("/products/:id/reviews", (req, res) => {
    const productId = parseInt(req.params.id);
    res.json(reviews[productId] || []);
});
app.post("/products/:id/reviews", express.json(), (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, rating, comment } = req.body;
    const newReview = {
        id: reviews[productId] ? reviews[productId].length + 1 : 1,
        productId,
        name,
        rating,
        comment,
        date: new Date().toISOString().split("T")[0]
    };
    if (!reviews[productId]) {
        reviews[productId] = [];
    }
    reviews[productId].push(newReview);
    res.status(201).json(newReview);
});


app.listen(3000, () => {
    console.log("products-service is running on port 3000");
});