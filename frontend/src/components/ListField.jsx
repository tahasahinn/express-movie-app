import PropTypes from "prop-types";

const ListField = ({ label, arr }) => {
  return (
    <div>
      <h2 className="font-semibold">{label}:</h2>
      <div className="flex gap-3 flex-wrap">
        {arr.map((item, index) => (
          <span
            key={index}
            className="p-2 rounded-full font-semibold bg-gray-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

ListField.propTypes = {
  label: PropTypes.string.isRequired,
  arr: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListField;
