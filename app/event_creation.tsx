import { useState } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { User } from 'firebase/auth';
import {FirestoreDocument, getDocument, createDocument} from '~/utils/firestore';
import Select from 'react-select';
import Option from 'react-select';

// Since the officer could be of multiple clubs, they need to be able to choose which club to hold the event for on event creation

function options (value: string[], label : string[]){
  const elements : any = [];
  for (const s in value){
    console.log(s, value[s], label[s]);
    elements.push({value: value[s], label: label[s]});
  }
  return elements;
}


export default function EventForm(){

    const user = useAuth();
    const [clubs, setClubs] = useState([]);
    const [club, setClub] = useState("");

    const [eventName, setEventName] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    
    const [clubNames, setClubNames] = useState([]);

    function good(result : any){
        setClubs(result.clubs);
    }
    function bad(error : any){
      //Fill in to avoid infinite render loops probably a page reroute
    }


    const handleEvent = () => {
        const event = createDocument("ClubEvents", 
            {
                eventName: eventName,
                location: location,
                date: date,
                time: time,
                description: description,
                officerID: user.user!.uid,
                clubID: club
            }
        )
    }
    if (user.user == null){}
    else{
        if(clubs.length == 0){
            getDocument("officers", user.user!.uid).then(good, bad);
        }
        else if (clubNames.length == 0){

            function gotName(result : any){
                //@ts-ignore
                setClubNames([...clubNames, result.name]);
            }
            function failName(result : any){
                return null;
            }

            for (const i in clubs){
                getDocument("clubs", clubs[i]).then(gotName, failName);
            }

            
        }else{
            //@ts-ignore
            const clubsEl = options(clubs, clubNames);
            console.log( clubs, clubNames, clubsEl);
            return (
                <>
                    <form onSubmit={handleEvent}>
                        <label>Enter which Club:
                        <Select options={clubsEl}
                            onChange={(option: Option | null) => setClub(option!.value)}
                            required/>
                        </label>
                        <label>Enter the Event's Name:
                            <input type="text" 
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required/>
                        </label>
                        <label>Enter the Event's Location:
                            <input type="text" 
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required/>
                        </label>
                        <label>Enter the Event's Date:
                            <input type="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required/>
                        </label>
                        <label>Enter the Event's Start Time:
                            <input type="time" 
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required/>
                        </label>
                        <label>Event Description (optional):
                            <input type="text" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}/>
                        </label>
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                </>
            )
        }
    }
}

