
import React, { useState } from 'react';
function ReviewForm({ onSubmit }) {

    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const review = {
            name: formData.get('name'),
            rating: formData.get('rating'),
            comment: formData.get('comment')
        }
        if (onSubmit) {
            onSubmit(review);
            setIsOpen(false);
        }
    }

    if (!isOpen) {
        return <button className='m-2' onClick={() => setIsOpen(true)}>
            <i className='fa-fa-plus'></i> Write a Review
        </button>
    } else {
        return (
            <div className='m-3'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Name</label>
                        <input type='text' className='form-control' name='name' />
                    </div>
                    <div className='form-group'>
                        <label>Rating</label>
                        <select className='form-control' name='rating'>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Comment</label>
                        <textarea className='form-control' name='comment'></textarea>
                    </div>
                    <button type='button' onClick={() => setIsOpen(false)}>Cancel</button>
                    <button type='submit'>Submit Review</button>
                </form>
            </div>
        )
    }
}

export default ReviewForm;