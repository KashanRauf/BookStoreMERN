import React, { useState,  useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
    const [loadingData, setLoadingData] = useState(true);
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:5555/books/${id}`).then((response) => {
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setPublishYear(response.data.publishYear);
        })
        .catch((error) => {
            console.error(error);
        });
        setLoadingData(false);
    }, []);

    const handleEditEvent = () => {
        const bookData = {
            title,
            author,
            publishYear
        };

        setLoading(true);
        axios.put(`http://127.0.0.1:5555/books/${id}`, bookData).then((response) => {
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

    if (loadingData) {
        return (
            <div className="p-4">
                <BackButton/>
                <h1 className="text-3xl my-4">Edit Book</h1>
                <Spinner/>
            </div>
        );
    }

    return (
        <div className="p-4">
            <BackButton/>
            <h1 className="text-3xl my-4">Edit Book</h1>
            {loading ? <Spinner/> : ""}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 w-[40%] mx-auto">
                {error ? (
                    <p className="mx-auto text-red-700 text-xl">Change fields to edit a book.</p>
                ): (
                    <p className="mx-auto text-gray-500 text-xl">Change fields to edit a book.</p>
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

                <button className="p-2 bg-sky-300 m-8" onClick={handleEditEvent}>Edit New Book</button>
            </div>
        </div>
    );
};

export default EditBook;