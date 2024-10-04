import NavBar from './NavBar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { fetchTour } from '../../util/http';
import { checkoutSessionPOST } from '../../util/http';
import { useQuery, useMutation } from '@tanstack/react-query';
import Date from './Date';
import Mapdiv from './Mapdiv';
import LoadingPage from './LoadingPage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { validatePayment } from '../../util/http';

const arr = [1, 2, 3, 4, 5];
const loadRazorpayScript = () => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  document.body.appendChild(script);
};

export default function Tour() {
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ['event', slug],
    queryFn: () => fetchTour(slug),
  });

  const {
    mutate: initiateCheckout,
    isLoading: isCheckoutLoading,
    error: checkoutError,
  } = useMutation({
    mutationFn: ({ tourID, amount }) => checkoutSessionPOST(tourID, amount),
    onSuccess: (checkoutData) => {
      console.log('Checkout successful:', checkoutData);
      const options = {
        key: 'rzp_test_RVWBB6B4TsFCVI',
        amount: checkoutData.amount,
        currency: 'INR',
        name: 'Adventours',
        order_id: checkoutData.id,
        description: 'Test Transaction',
        image:
          'https://yt3.ggpht.com/J0GFtBEsI_bXtZwyhJsPtmhoYMEQNhMhVKYD-68t4mAZcwDiKGZjwANz27DCClT6M-oPud1ogw=s88-c-k-c0x00ffffff-no-rj',
        handler: function (response) {
          validatePayment(response, checkoutData)
            .then((validationResponse) => {
              console.log(
                'Payment validated successfully:',
                validationResponse
              );
            })
            .catch((error) => {
              console.error('Payment validation error:', error);
            });
        },
        prefill: {
          name: 'Pratham',
          email: 'pratham.sk333@gmail.com',
          contact: '7795042315',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
        method: {
          upi: true,
        },
      };  

      const rzp1 = new window.Razorpay(options);
      rzp1.on('pay  ment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
    },
    onError: (err) => {
      console.error('Checkout failed:', err);
    },
  });

  // Handle payment
  function handlePayment(e) {
    e.preventDefault();
    if (data && data.id && data.price) {
      initiateCheckout({ tourID: data.id, amount: data.price * 100 }); // Multiply price by 100 for paise
    }
  }

  if (isLoading) return <LoadingPage />;
  if (error) {
    navigate('/login');
  }

  return (
    <>
      <NavBar homePage={true} />
      {data && (
        <div>
          <div className="flex justify-center align-middle">
            <div
              className="tour-content"
              style={{
                backgroundImage: "url('/new.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden ',
              }}
            >
              <div className="tour-heading">{data.name}</div>
              <div className="flex flex-row gap-5">
                <div className="tour-duration  flex justify-center items-center">
                  <img src="/clock.png" alt="" className="tour-home-image" />
                  {data.duration} Days
                </div>
                <div className="tour-duration  flex justify-center items-center">
                  <img src="/location.png" alt="" className="tour-home-image" />
                  {data.startLocation.description}
                </div>
              </div>
            </div>
          </div>
          <div className="tour-middle">
            <div className="tour-middle-1 center-tour">
              <div className="tour-middle-up center-tour">
                <h3 className="tour-gradient-text">QUICK FACTS</h3>
                <div className="tour-box-up-content">
                  <div className="center-tour-box">
                    <img
                      src="/pink-calendar.png"
                      alt=""
                      className="tour-center-img"
                    />
                    <div className="tour-box-main">NEXT DAY</div>
                    <Date isoDate={data.startDates[0]} />
                  </div>
                  <div className="center-tour-box">
                    <img
                      src="/pink-difficulty.png"
                      alt=""
                      className="tour-center-img"
                    />
                    <div className="tour-box-main">DIFFICULTY</div>
                    {data.difficulty}
                  </div>
                  <div className="center-tour-box">
                    <img
                      src="/pink-person.png"
                      alt=""
                      className="tour-center-img"
                    />
                    <div className="tour-box-main">PARTICIPANTS</div>
                    {data.maxGroupSize}
                  </div>
                  <div className="center-tour-box">
                    <img
                      src="/pink-rating.png"
                      alt=""
                      className="tour-center-img"
                    />
                    <div className="tour-box-main">RATINGS</div>
                    {data.ratingsAverage} / 5
                  </div>
                </div>
              </div>
              <div className="tour-middle-down center-tour">
                <h3 className="tour-gradient-text">YOUR TOUR GUIDES</h3>

                <div className="tour-box-up-content">
                  {data.guides.map((guide, index) => {
                    return (
                      <div className="center-tour-box" key={index}>
                        <img
                          src={`/tour-guides/${guide.photo}`}
                          alt=""
                          className="tour-guide-img"
                        />
                        <div className="tour-box-main">
                          {guide.role.toUpperCase()}
                        </div>
                        <div>{guide.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="tour-middle-2 center-tour-2">
              <h3 className="tour-gradient-text">
                ABOUT {data.name.toUpperCase()} TOUR
              </h3>
              {data.description}
            </div>
          </div>
          <div className="flex justify-center align-middle mt-10 font-bold text-2xl">
            <h2 className="tour-gradient-text  overflow-hidden">
              TOUR PICTURES
            </h2>
          </div>
          <div className="tour-pics my-7">
            <img className="tour-pics-img" src={`/tours/${data.images[0]}`} />
            <img className="tour-pics-img" src={`/tours/${data.images[1]}`} />
            <img className="tour-pics-img" src={`/tours/${data.images[2]}`} />
          </div>

          <div className="tour-map">
            <Mapdiv data={data.locations}></Mapdiv>
          </div>

          <div className="tour-ratings">
            {data.reviews.map((review, index) => {
              return (
                <div className="tour-ratings-box" key={index}>
                  <div className="tour-review-heading  overflow-hidden">
                    <img
                      className="rounded-full w-12"
                      src={`/tour-guides/${review.user.photo}`}
                      alt=""
                    />
                    <div style={{ fontFamily: 'poppins' }}>
                      {review.user.name.toUpperCase()}
                    </div>
                  </div>
                  <div className="tour-review-content">{review.review}</div>
                  <div className="tour-review-stars">
                    {arr.map((element) => {
                      if (element >= review.rating) {
                        return (
                          <img
                            key={element}
                            src="/review-star-non.png"
                            alt="Filled Star"
                          />
                        );
                      } else {
                        return (
                          <img
                            key={element}
                            src="/review-star.png"
                            alt="Empty Star"
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="tour-book">
            <div className="tour-book-box">
              <div className="tour-book-text">
                <h2 className="tour-book-h2">LET YOUR JOURNEY BEGIN</h2>
                experience the neverbefore adventure!
              </div>
              <button className="tour-book-button" onClick={handlePayment}>
                BOOK TOUR NOW!
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
