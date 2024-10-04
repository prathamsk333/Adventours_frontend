/**
 * @param {string} isoDate 
 * @returns {string} 
 */
function formatDayMonthYear(isoDate) {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();
  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`; 
}

// eslint-disable-next-line react/prop-types
export default function DateComponent({ isoDate }) {
  const formattedDate = formatDayMonthYear(isoDate);

  return (
    <>
      <p className="date">{formattedDate}</p>
    </>
  );
}
