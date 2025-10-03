import express,{Request, Response} from "express";

const app = express();
const port = 3000;

app.get("/users", async (req: Request, res: Response) => {
    try {
        const response = await fetch("http://localhost:4000/users");
        const data = await response.json();
        res.status(200).json({data: data, message: "data received"});
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Something was wrong"})
    }
})

// PATCH to update the user information
app.patch("/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = req.body;     

        const response = await fetch(`http://localhost:4000/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        res.status(200).json({data, message: `User ${id} sucessful update`,});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user" });
    }
});

app.listen(port, ()=>{
    console.log(`Server listened at port:${port}`);
})