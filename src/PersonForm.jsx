const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
      <form onSubmit={addName} >
      <div className="css-for-filter">
        <div className="title">
        Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div className="title">
          Number: <input type="tel" id="phone" name="phone" pattern="(\+{0,1}\d{1,12})" required value={newNumber} onChange={handleNumberChange} />
        </div>
        
        <div className="button-container">
          <button type="submit">Add</button>
        </div>
        </div> 
      </form>
    );
  };
  
export default PersonForm;


