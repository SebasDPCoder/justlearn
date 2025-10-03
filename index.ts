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

app.listen(port, ()=>{
    console.log(`Server listened at port:${port}`);
})