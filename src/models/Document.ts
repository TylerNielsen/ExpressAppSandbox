import mongoose from "mongoose";

const myDocumentSchema = new mongoose.Schema({
    title: String,
    username: String,
    body: String
});

interface IDocument {
    title: string;
    username: string;
    body: string; 
}

const MyDocument = mongoose.model("Document", myDocumentSchema);
export { MyDocument, IDocument };
