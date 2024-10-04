import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import { fetchEvent } from '../../util/http';

const colors = ['redcolor', 'orangecolor', 'greencolor', 'pinkcolor'];

export default function Content() {
  const { data, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvent,
  });

  if (isLoading) return <div> Loading please wait... </div>;
  

  return (
    <>
      <div className="home-content">
        {data &&
          data.data.map((el, index) => {
            return (
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
                image ={el.imageCover}             
              />
            );
          })}
      </div>
    </>
  );
}
