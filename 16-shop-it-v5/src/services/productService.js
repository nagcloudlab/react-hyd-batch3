const API_BASE_URL = 'http://localhost:3000';

async function parseResponse(response) {
  if (response.ok) {
    return response.json();
  }

  let details = '';
  try {
    const errorBody = await response.json();
    details = errorBody?.message ? `: ${errorBody.message}` : '';
  } catch {
    // Ignore JSON parse errors for non-JSON error bodies.
  }

  throw new Error(`Request failed (${response.status})${details}`);
}

export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  return parseResponse(response);
}

export async function fetchProductReviews(productId) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`);
  return parseResponse(response);
}

export async function createProductReview(productId, review) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });

  return parseResponse(response);
}
