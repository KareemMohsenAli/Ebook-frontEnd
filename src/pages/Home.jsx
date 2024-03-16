import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Router } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductDetails from "../components/BookDetails";
import From from "../components/AddBook/Form";
import axios from "../api/axios.js";
import BookDetails from "../components/BookDetails";
function Home() {
  const[showUserDeatil,setShowUserDeatil]=useState(true)
  const [DeleteHandler,setDeleteHandler]=useState(false)
  const [updateHandler,setUpdateHander]=useState(false)
  const [Books, setBooks] = useState([
    {title:"book",description:"verry good",category:"heelo"
    ,product:"phones",username:"kareem",coverImageUrl:"https://res.cloudinary.com/dwsqwxjks/image/upload/v1709461536/Padel/courtImage/swvgeytjxwpqxabdk44z.jpg",
    pdfUrl:"https://res.cloudinary.com/dwsqwxjks/raw/upload/v1710513585/books/cd5gfahqyvemvornswvl",
    authorName:"kareem"
  
  },
  {title:"book",description:"verry good",category:"heelo"
  ,product:"phones",username:"kareem",coverImageUrl:"https://res.cloudinary.com/dwsqwxjks/image/upload/v1709461536/Padel/courtImage/swvgeytjxwpqxabdk44z.jpg",
  pdfUrl:"https://res.cloudinary.com/dwsqwxjks/raw/upload/v1710513585/books/cd5gfahqyvemvornswvl",
  authorName:"kareem"

},
{title:"book",description:"verry good",category:"heelo"
,product:"phones",username:"kareem",coverImageUrl:"https://res.cloudinary.com/dwsqwxjks/image/upload/v1709461536/Padel/courtImage/swvgeytjxwpqxabdk44z.jpg",
pdfUrl:"https://res.cloudinary.com/dwsqwxjks/raw/upload/v1710513585/books/cd5gfahqyvemvornswvl",
authorName:"kareem"

}  ]);

  useEffect(() => {
    axios
      .get("book/", {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // Handle the response data
        setBooks(response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
  }, []);

  const allproducts = Books.map((book) => {
    return (
      
      <BookDetails
        userName={book?.createdBy?.userName}
        title={book?.title}
        category={book?.categoryName}
        authorName={book.author}
        coverImageUrl={book.coverImageUrl}
        pdfUrl={book.pdfUrl}
      />
    );
  });

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <h6 class="text-center flex justify-center py-3 text-4xl font-bold tracking-tight text-gray-900 px-4  hover:bg-blue-600 hover:translate-y-1 hover:scale-100 hover:text-white transition duration-700">
          All Books
        </h6>
        {allproducts}
      </div>
    </>
  );
}

export default Home;
