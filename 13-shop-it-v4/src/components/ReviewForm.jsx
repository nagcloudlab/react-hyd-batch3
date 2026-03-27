
import React, { useState } from 'react';
function ReviewForm() {
    const [isOpen, setIsOpen] = useState(false);
    if (!isOpen) {
        return <button onClick={() => setIsOpen(true)}>
            <i className='fa-fa-plus'></i> Write a Review
        </button>
    } else {
        return (
            <div className='m-3'>
                <form>
                    <div className='form-group'>
                        <label>Name</label>
                        <input type='text' className='form-control' />
                    </div>
                    <div className='form-group'>
                        <label>Rating</label>
                        <select className='form-control'>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Comment</label>
                        <textarea className='form-control'></textarea>
                    </div>
                    <button type='button' onClick={() => setIsOpen(false)}>Cancel</button>
                    <button type='submit'>Submit Review</button>
                </form>
            </div>
        )
    }
}

export default ReviewForm;