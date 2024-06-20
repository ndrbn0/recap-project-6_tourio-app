import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const places = await Place.find();
      return response.status(200).json(places);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (request.method === "POST") {
    try {
      const newPlace = new Place(request.body);
      await newPlace.save();
      return response.status(201).json(newPlace);
    } catch (error) {
      return response.status(400).json({ error: "Bad Request" });
    }
  }

  response.setHeader("Allow", ["GET", "POST"]);
  response.status(405).end(`Method ${request.method} Not Allowed`);
}
