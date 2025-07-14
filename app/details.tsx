import { useState } from 'react';

import { createDocument} from '~/utils/firestore';


function Details(){
  const [userID, setUserID] = useState("");


  if (userID == ""){
    return(
      <>
      <DetailForm setUserID{...() => setUserID}/>
      </>
    )
  }
  else{
    return(
      <>
      
      </>
    )
  }

}



//@ts-ignore
export default function DetailForm(setUserID) {
  const[emplID, setEmplID] = useState("");
  const[firstname, setFirstname] = useState("");
   const[lastname, setLastname] = useState("");
  const[major, setMajor] = useState("");
   const[minor, setMinor] = useState("");
    const[year, setYear] = useState("");

  const handleEvent = () => {
    const userID = createDocument("users",
      {
        emplID: emplID,
        first_name: firstname,
        last_name: lastname,
        major: [major],
        minor: [minor],
        year: year
      }
    );
    setUserID(userID);
  }

  return (
    <>
    <form onSubmit={handleEvent}>
      <label>Enter your First Name:
        <input type="text" 
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}/>
      </label>
      <label>Enter your Last Name:
        <input type="text" 
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}/>
      </label>
      <label>Enter your EmplID:
        <input type="number"
        value={emplID}
        onChange={(e) => setEmplID(e.target.value)} />
      </label>
      <label>Enter your Year:
        <input type="text" 
        value={year}
        onChange={(e) => setYear(e.target.value)}/>
      </label>
      <label>Enter your Major:
        <input type="text" 
        value={major}
        onChange={(e) => setMajor(e.target.value)}/>
      </label>
      <label>Enter your Minor:
        <input type="text" 
        value={minor}
        onChange={(e) => setMinor(e.target.value)}/>
      </label>
      <input type="submit" />

    </form>
    </>
  )
}