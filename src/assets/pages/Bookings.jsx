import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import { fetchBookings } from '../../util/http';

const colors = ['redcolor', 'orangecolor', 'greencolor', 'pinkcolor'];

export default function Bookings() {
    const { data, isLoading, isError } = useQuery({
      queryKey: ['events'],
      queryFn: fetchBookings,
    });
  
    if (isLoading) {
      return <div className='m-[10rem]'>Loading, please wait...</div>;
    }
  
    if (isError || !data || !data.data || !Array.isArray(data.data.tours) || data.data.tours.length === 0) {
      return <div className='font-bold mt-[15rem] absolute text-3xl h-[87vh] overflow-hidden'>No Bookings...</div>;
    }
  
    return (
      <div className="home-content m-[5rem]">
        {data.data.tours.map((el, index) => (
          <Card
            key={el._id}
            title={el.name}
            difficulty={el.difficulty}
            duration={el.duration}
            summary={el.summary}
            color={colors[index % colors.length]}
            startLocation={el.startLocation.description}
            stops={el.locations.length}
            startDate={el.startDates[0]}
            people={el.maxGroupSize}
            price={el.price}
            avgRating={el.ratingsAverage}
            ratingsQuantity={el.ratingsQuantity}
            slug={el.slug}
            image={el.imageCover}
          />
        ))}
      </div>
    );
  }
  