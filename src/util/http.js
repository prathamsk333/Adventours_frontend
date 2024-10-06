import getToken from './getToken';

export async function fetchEvent() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/tours');

    if (!response.ok) {
      const errorInfo = await response.json();
      const error = new Error('An error occurred while fetching the event');
      error.status = response.status;
      error.info = errorInfo;
      throw error;
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error('fetchEvent error:', error);
    throw error;
  }
}

export async function fetchTour(tour) {
  try {
    const token = getToken();
    // console.log(token);
    let auth;
    if (token) {
      auth = `Bearer ${token}`;
    } else {
      auth = ' ';
    }
    console.log(token);

    const response = await fetch(`http://localhost:3000/api/v1/view/${tour}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${auth}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorInfo = await response.json();
      const error = new Error('An error occurred while fetching the tour');
      error.status = response.status;
      error.info = errorInfo;
      throw error;
    }

    const result = await response.json();

    return result.data ? result.data.tour : null;
  } catch (error) {
    console.error('fetchTour error:', error);
    throw error;
  }
}

export async function fetchBookings(tour) {
  try {
    const token = getToken();
    let auth;
    if (token) {
      auth = `Bearer ${token}`;
    } else {
      auth = ' ';
    }
    console.log(token);

    const response = await fetch(`http://localhost:3000/api/v1/view/mybookings/getMyBookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${auth}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorInfo = await response.json();
      const error = new Error('An error occurred while fetching the tour');
      error.status = response.status;
      error.info = errorInfo;
      throw error;
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('fetchTour error:', error);
    throw error;
  }
}

export async function loginPOST(credentials) {
  const response = await fetch('http://localhost:3000/api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorInfo = await response.json();
    const error = new Error('Login failed');
    error.status = response.status;
    error.info = errorInfo;
    throw error;
  }

  return response.json();
}
export async function signUpPOST(credentials) {
  const response = await fetch('http://localhost:3000/api/v1/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),    
  });

  if (!response.ok) {
    const errorInfo = await response.json();
    const error = new Error('Login failed');
    error.status = response.status;
    error.info = errorInfo;
    throw error;
  }

  return response.json();
}

  export async function updateMe(credentials) {
    try {
      const token = getToken();
      const auth = token ? `Bearer ${token}` : '';

      const response = await fetch(
        `http://localhost:3000/api/v1/users/updateMe`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: auth,
          },
          credentials: 'include',
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const errorInfo = await response.json();
        const error = new Error(
          'An error occurred while updating the credentials'
        );
        error.status = response.status;
        error.info = errorInfo;
        throw error;
      }

      const result = await response.json();
      return result.data ? result.data : null;
    } catch (error) {
      console.error('update error:', error);
      throw error;
    }
  }
// http://localhost:3000/api/v1/users/updateMyPassword

export async function updateMyPassword(credentials) {
  try {
    const token = getToken();
    const auth = token ? `Bearer ${token}` : '';
    console.log(token);

    const response = await fetch(
      `http://localhost:3000/api/v1/users/updateMyPassword`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      }
    );
    if (!response.ok) {
      const errorInfo = await response.json();
      const error = new Error(
        'An error occurred while updating the credentials'
      );
      error.status = response.status;
      error.info = errorInfo;
      throw error;
    }

    const result = await response.json();
    return result.data ? result.data : null;
  } catch (error) {
    console.error('update error:', error);
    throw error;
  }
}

export async function resetPassword({ token, newPassword, confirmPassword }) {
  console.log(token);
  console.log(`http://localhost:3000/api/v1/users/resetPassword/${token}`);
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/users/resetPassword/${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
          passwordConfirm: confirmPassword,
        }),
      }
    );

    if (!response.ok) {
      const errorInfo = await response.json();
      console.log(errorInfo);
      const error = new Error('An error occurred while resetting the password');
      error.status = response.status;
      error.info = errorInfo;
      throw error;
    }

    const result = await response.json();
    return result.data ? result.data : null;
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
}

export async function checkoutSessionPOST(tourID, amount) {
  const token = getToken();
  const auth = token ? `Bearer ${token}` : '';
  const response = await fetch(`http://localhost:3000/api/v1/bookings/checkout-session/${tourID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    credentials: 'include',
    body: JSON.stringify({
      amount: amount,
      currency: 'INR',
      receipt: tourID,
    }),
  });

  if (!response.ok) {
    const errorInfo = await response.json();
    const error = new Error('Checkout session failed');
    error.status = response.status;
    error.info = errorInfo;
    throw error;
  }

  return response.json();
}

export async function validatePayment(response, checkoutData) {
  try {
    const token = getToken(); 
    const auth = token ? `Bearer ${token}` : '';

    const res = await fetch('http://localhost:3000/api/v1/bookings/order/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,  
      },
      body: JSON.stringify({
        payment_id: response.razorpay_payment_id,
        order_id: response.razorpay_order_id,
        signature: response.razorpay_signature,
        checkoutData,
      }),
    });

    if (!res.ok) {
      const errorInfo = await res.json();
      const error = new Error('An error occurred while validating the payment');
      error.status = res.status;
      error.info = errorInfo;
      throw error;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error validating payment:', error);
    throw error;
  }
}
