import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BookTable from "../components/BookTable";
import BookCards from "../components/BookCards";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [useTable, setUseTable] = useState(false); // True = table, False = cards

    useEffect(() => {
        setLoading(true);
        axios.get("http://127.0.0.1:5555/books").then((response) => {
            setBooks(response.data.data);
            setLoading(false);
        }).catch((error) => {
            console.error(error);
            setLoading(false);
        })
    }, []);

    console.log("Books: " + books);

    if (loading) {
        return (
            <div className="p-4">
            <div className="flex justify-center items-center gap-x-4">
                <button className="px-4 py-1 bg-sky-300 hover:bg-sky-600 rounded-lg" onClick={() => setUseTable(true)}>Table</button>
                <button className="px-4 py-1 bg-sky-300 hover:bg-sky-600 rounded-lg" onClick={() => setUseTable(false)}>Card</button>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Books List</h1>
                <Link to="/books/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            <Spinner/>
        </div>
        )
    }

    return (
        <div className="p-4">
        <div className="flex justify-center items-center gap-x-4">
            <button className="px-4 py-1 bg-sky-300 hover:bg-sky-600 rounded-lg" onClick={() => setUseTable(true)}>Table</button>
            <button className="px-4 py-1 bg-sky-300 hover:bg-sky-600 rounded-lg" onClick={() => setUseTable(false)}>Card</button>
        </div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Books List</h1>
                <Link to="/books/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            {useTable ? (
                <BookTable books={books}/>
            ) : (
                <BookCards books={books}/>
            )}
        </div>
    );
};

export default Home;