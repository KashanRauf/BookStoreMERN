import React, { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const handleCreateEvent = () => {
        const bookData = {
            title,
            author,
            publishYear
        };

        setLoading(true);
        axios.post("http://127.0.0.1:5555/books", bookData).then((response) => {

            setLoading(false);
            setError(false);
            nav("/");
        })
        .catch((error) => {
            console.error(error);
            setLoading(false);
            setError(true);
        });
    };

    return (
        <div className="p-4">
            <BackButton/>
            <h1 className="text-3xl my-4">Create Book</h1>
            {loading ? <Spinner/> : ""}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 w-[40%] mx-auto">
                {error ? (
                    <p className="mx-auto text-red-700 text-xl">Fill all fields to create a book.</p>
                ): (
                    <p className="mx-auto text-gray-500 text-xl">Fill all fields to create a book.</p>
                )}
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full"/>
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full"/>
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full"/>
                </div>

                <button className="p-2 bg-sky-300 m-8" onClick={handleCreateEvent}>Create New Book</button>
            </div>
        </div>
    );
};

export default CreateBook;