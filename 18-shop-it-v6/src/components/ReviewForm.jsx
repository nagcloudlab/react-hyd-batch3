
import React, { useEffect, useRef } from 'react';
import './ReviewForm.css';

function ReviewForm({ isOpen = false, onOpen, onClose, onSubmit }) {
    const formContainerRef = useRef(null);
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (!isOpen || !formContainerRef.current) return;

        formContainerRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        nameInputRef.current?.focus();
    }, [isOpen]);

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
            onClose?.();
            e.target.reset();
        }
    }

    if (!isOpen) {
        return (
            <button className='review-launch-btn m-2' onClick={() => onOpen?.()}>
                <i className='fa fa-plus me-2'></i>
                Write a Review
            </button>
        );
    } else {
        return (
            <div ref={formContainerRef} className='review-form-shell m-3'>
                <form className='review-form' onSubmit={handleSubmit}>
                    <div className='review-form-header'>
                        <h5 className='mb-0'>Drop Your Take</h5>
                        <button
                            type='button'
                            className='review-close-btn'
                            onClick={() => onClose?.()}
                            aria-label='Close review form'
                        >
                            <i className='fa fa-times'></i>
                        </button>
                    </div>

                    <div className='form-group mb-3'>
                        <label className='review-label'>Name</label>
                        <input ref={nameInputRef} type='text' className='form-control review-control' name='name' required minLength='2' />
                    </div>

                    <div className='form-group mb-3'>
                        <label className='review-label'>Rating</label>
                        <select className='form-control review-control' name='rating' defaultValue='5'>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>

                    <div className='form-group mb-4'>
                        <label className='review-label'>Comment</label>
                        <textarea className='form-control review-control' name='comment' rows='4' required minLength='8'></textarea>
                    </div>

                    <div className='review-form-actions'>
                        <button type='button' className='btn btn-outline-secondary' onClick={() => onClose?.()}>Cancel</button>
                        <button type='submit' className='review-submit-btn'>Submit Review</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ReviewForm;