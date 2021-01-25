import React, { useState, useEffect } from 'react';
import SessionExerciseSet from './SessionExerciseSet'

const SessionExercise = (props) => {

  const [sets, setSets] = useState([]);

  const [newSet, setNewSet] = useState("");

      // Similar to componentDidMount and componentDidUpdate:
      useEffect(() => {
        console.log("fetching session exercise sets");
        getSessionExerciseSets();
      }, []);
    
      const getSessionExerciseSets = async () => {
        const url = "https://localhost:44367/getSessionExerciseSets?SessionExerciseId=" + props.id;
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
        setSets(arr);
      }

  const handleNewSet = async (e) => {
    console.log(e.target.value);

    let newId = 1;

    if (sets.length > 0) {
      const [lastItem] = sets.slice(-1)

      console.log("setting new set id");

      newId = lastItem.id + 1;
    }


    var newSetModel = { description: newSet, id: newId };

    await saveNewSet();

    console.log("setting exercise set")
    setSets(currentexercises => [...currentexercises, newSetModel]);

    setNewSet("");
  }

  const saveNewSet = async () => {
    const url = "https://localhost:44367/AddSessionExerciseSet";
    const response = await fetch(url,
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          WeightReps: newSet,
          SessionExerciseId: props.id
        })
      });
  }

  return (<div>{props.exerciseName}
    <div>
      {
        sets.map(set => <SessionExerciseSet key={set.id} id={set.id} set={set.description} />)
      }
      <input
        placeholder="Reps x Weight: 10x50"
        value={newSet}
        onChange={e => setNewSet(e.target.value)}
        onBlur={e => handleNewSet(e)}
      />
    </div>
  </div>
  )
}

export default SessionExercise;