

function renderStars(rating) {
    return Array.from({ length: rating }, (_, index) => (
        <i key={index} style={{color: 'orange'}} className="fa fa-star"></i>
    ))
}

function Review({ review }) {
    return (
        <div className="alert alert-info">
            <div>{review.name} - {renderStars(review.rating)}</div>
            <p>{review.comment}</p>
            <p>{review.date}</p>
        </div>
    )
}

export default Review;