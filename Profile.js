// Profile.js
import React, {useState, useEffect} from 'react';


const Profile = (props) => {

    return (<div>
        Profile
              <div>Current logged in user is: {props.activeUser()}</div>
    </div>);
}

export default Profile;