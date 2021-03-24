import React, {useEffect, useState} from "react";
import {getBooksByType} from "./book-search.service";
import '../styles/BookSearch.scss';

const BookSearch = () => {
    const [bookType, updateBookType] = useState("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
    const [allAvailableBooks, setAllAvailableBooks] = useState({} as any);

    async function requestBooks() {
        if (bookTypeToSearch) {
            const allBooks = await getBooksByType(bookTypeToSearch);
            setAllAvailableBooks(allBooks);
        }
    }

    useEffect(() => {
        async function getAllBooks() {
            await requestBooks();
        }

        getAllBooks();
    }, [bookTypeToSearch]);
    return (
        <>
            <div className="book--container">
                <div className="search-params">
                    <div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateBookTypeToSearch(bookType)
                            }}
                        >
                            <input
                                className="full-width"
                                autoFocus
                                name="gsearch"
                                type="search"
                                value={bookType}
                                placeholder="Search for books to add to your reading list and press Enter"
                                onChange={e => updateBookType(e.target.value)}
                            />
                        </form>
                        {!bookType && (
                            <div className="empty">
                                <p>
                                    Try searching for a topic, for example
                                    <a onClick={() => {
                                        updateBookType("Javascript");
                                    }}
                                    >
                                        {" "}
                                        "Javascript"
                                    </a>
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <ul className={'resultsList'}>
                {allAvailableBooks?.items?.map((b: any) =>
                    <li><h2>{b.volumeInfo.title}</h2>
                        <div>
                            <img src={b.volumeInfo.imageLinks.smallThumbnail}/>
                            <div>
                                <span>Author: {b.volumeInfo.authors[0]}</span>
                                <span>Publisher: {b.volumeInfo.publisher}</span>
                                <span>Published: {b.volumeInfo.publishedDate}</span>
                                <span>Description: {b.volumeInfo.description}</span>
                            </div>
                        </div>
                    </li>)}
            </ul>
            {<pre>{JSON.stringify(allAvailableBooks, null, 4)}</pre>
            }
        </>
    );
};

export default BookSearch;
