import React from 'react';
import { Link } from 'react-router-dom';
// import styles from './BookCard.module.css';

const BookCard = (props) => {
    const  book  = props.book;

    return(
          <div > 
            {/* //className={styles.Logo} */}
            <img src="https://commapress.co.uk/books/the-book-of-cairo/cairo-provisional-v3/image%2Fspan3" alt="" />
            <div className="desc">
                <h2>
                    <Link to={`/show-Book/${book._id}`}>
                        { book.title }
                    </Link>
                </h2>
                <h3>{book.author}</h3>
                <p>{book.description}</p>
            </div>
        </div>
    )
};

export default BookCard;