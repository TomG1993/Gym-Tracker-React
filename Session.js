import React, { useState, useEffect } from 'react';
import SessionExercise from './SessionExercise'

const Session = (props) => {

  const [exercises, setExercises] = useState([]);

  const [newExercise, setNewExercise] = useState("");

  function useInput({ type /*...*/ }) {
    const [value, setValue] = useState("");
    const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
  }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      console.log("fetching session exercises");
      getSessionExercises();
    }, []);
  
    const getSessionExercises = async () => {
      const url = "https://localhost:44367/getSessionExercises?sessionHeaderId=" + props.headerId;
      const response = await fetch(url,
        {
          mode: 'cors',
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
  
      const data = await response.json();
      var arr = [];
      Object.keys(data).forEach(function (key) {
        arr.push(data[key]);
      });
      console.log(arr);
      setExercises(arr);
    }


  const handleNewExercise = async (e) => {

    console.log("Adding to headerId " + props.headerId);
    console.log(e.target.value);

    let newId = 1;

    if (exercises.length > 0) {
      const [lastItem] = exercises.slice(-1)

      console.log("setting new id");

      newId = lastItem.id + 1;
    }


    var newExerciseModel = { description: newExercise, id: newId };

    await saveNewSessionExercise();

    console.log("setting exercise")
    setExercises(currentexercises => [...currentexercises, newExerciseModel]);

    setNewExercise("");
  }

  const saveNewSessionExercise = async () => {
    const url = "https://localhost:44367/AddSessionExercise";
    const response = await fetch(url,
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ExerciseName: newExercise,
          SessionHeaderId: props.headerId
        })
      });
  }

  return (<div>
    <div>
      {
        exercises.map(exercise => <SessionExercise key={exercise.id} id={exercise.id} exerciseName={exercise.description} />)
      }
      <div>
        <div><input
          placeholder="Exercise"
          value={newExercise}
          onChange={e => setNewExercise(e.target.value)}
          onBlur={e => handleNewExercise(e)}
        />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Session;