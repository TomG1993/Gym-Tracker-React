import React from "react";

export default class FetchRandomUser extends React.Component {
    
    state ={
        loading: true,
        people: []
    };

    async componentDidMount() {

        // const url = "https://api.randomuser.me/?results=5";
        const url = "https://localhost:44367/GetUserDetails?email=gorton.tom@hotmail.co.uk";
        const response = await fetch(url, {mode: 'cors', method: 'GET'});
        const data = await response.json();
        console.log(data);
        this.setState ({people: data, loading : false});
    }
    
    render() {

                if (this.state.loading){
                    return <div>loading...</div>;
                }

                //if (!this.state.people.length){
                  //  return <div>No people...</div>;
                //}
 
            return <div>
            {
            <div>
                {
                this.state.people.map((person, i) => (
                    <div key={person.ID}>
                <div>{person.name}</div> 
            </div>

                ))}

            </div>

            }
        </div>
    }
}