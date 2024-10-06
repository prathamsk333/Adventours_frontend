/* eslint-disable react/prop-types */
import location from '/location.png';
import flag from '/flag.png';
import calender from '/calendar.png';
import person from '/person.png';
import Date from './Date';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Card({
  title,
  difficulty,
  duration,
  summary,
  color,
  startLocation,
  stops,
  startDate,
  people,
  price,
  avgRating,
  ratingsQuantity,
  slug,
  image,
}) {
  return (
    <div className="card">
      {console.log(image)}
      <div className="card-img-container">
        <img className="card-img" src={`./../../../public/tours/${image}`} />
      </div>

      <div className="card-content">
        <div className={`text-${color} card-spec`}>
          <h5>
            {difficulty.toUpperCase()} {duration}-DAY TOUR
          </h5>
        </div>
        <div className="card-title flex justify-center align-middle">
          <h1 className="flex justify-center align-middle">{title}</h1>
        </div>
        <div>
          <p className="card-discription">{summary}</p>
        </div>
        <Link to={`/view/${slug}`}>
          {' '}
          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`bg-${color} card-button`}
          >
            Details
          </motion.button>
        </Link>
      </div>

      <div className="flex flex-col mb-7">
        <div className="flex justify-center align-middle price-ratings  ">
          <h5 className="mx-2 font-bold">$ {price}</h5> per person
        </div>
        <div className="flex justify-center align-middle price-ratings  ">
          <h5 className="font-bold mx-2">{avgRating}</h5>ratings (
          {ratingsQuantity})
        </div>
      </div>

      <div className={`card-footer bg-${color}  `}>
        <div className="location card-icon">
          <img src={location} alt="" />
          {startLocation}
        </div>
        <div className="date card-icon">
          <img src={calender} alt="" />
          <Date isoDate={startDate} />
        </div>
        <div className="stops card-icon">
          <img src={flag} alt="" />
          {stops} stops
        </div>
        <div className="people card-icon">
          <img src={person} alt="" />
          {people} people
        </div>
      </div>
    </div>
  );
}
