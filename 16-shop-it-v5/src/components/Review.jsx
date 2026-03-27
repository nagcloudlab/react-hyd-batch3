

import './Review.css';

function renderStars(rating) {
    const totalStars = 5;
    const safeRating = Number(rating) || 0;

    return Array.from({ length: totalStars }, (_, index) => {
        const isFilled = index < safeRating;
        return (
            <i
                key={index}
                className={`fa ${isFilled ? 'fa-star review-star-filled' : 'fa-star-o review-star-empty'}`}
                aria-hidden="true"
            ></i>
        );
    });
}

function formatDate(date) {
    if (!date) return 'Just now';
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return 'Just now';

    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(parsedDate);
}

function Review({ review }) {
    const safeName = review?.name || 'Anonymous User';
    const safeRating = Number(review?.rating) || 0;
    const safeComment = review?.comment || 'No comments added.';

    return (
        <article className="review-card">
            <div className="review-card-header">
                <h6 className="review-author mb-0">{safeName}</h6>
                <time className="review-date" dateTime={review?.date}>{formatDate(review?.date)}</time>
            </div>

            <div className="review-stars" aria-label={`Rated ${safeRating} out of 5`}>
                {renderStars(safeRating)}
            </div>

            <p className="review-comment mb-0">{safeComment}</p>
        </article>
    );
}

export default Review;