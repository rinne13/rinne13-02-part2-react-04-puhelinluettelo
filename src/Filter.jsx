const Filter = ({ filter, filterNumber, handleFilterChange, handleFilterNumberChange }) => {
    return (
      <div>

        <div class="title">
          Name filter shown with: <input value={filter} onChange={handleFilterChange} />
        </div>

        <div>
          Number filter shown with: <input value={filterNumber} onChange={handleFilterNumberChange} />
        </div>


      </div>
    );
  };
  

export default Filter;

