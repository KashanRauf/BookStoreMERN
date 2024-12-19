import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const deleteEvent = () => {
        setLoading(true);

        console.log(`Deleting: http://127.0.0.1:5555/books/${id}`)
        axios.delete(`http://127.0.0.1:5555/books/${id}`).then(() => {
            setLoading(false);
            nav("/");
        })
        .catch((error) => {
            console.log("Failed to delete wtf");
            console.error(error);
            setLoading(false);
        });
    };


    return (
        <div className="p-4">
            <BackButton/>
            <h1 className="text-3xl my-4">Delete Book</h1>
            {loading ? (
                <Spinner/>
            ) : (
                <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 w-[40%] mx-auto">
                    <p className="mx-auto text-gray-500 text-xl">Are you sure you want to delete this book?</p>
                    <button className="p-2 bg-red-600 m-6 text-white" onClick={deleteEvent}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default DeleteBook;