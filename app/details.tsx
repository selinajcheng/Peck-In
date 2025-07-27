import { useState } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { User } from 'firebase/auth';
import {FirestoreDocument, getDocument, setDocument} from '~/utils/firestore';
import Select from 'react-select';
import Option from 'react-select';

// FINAL TODOS:
// 1) Multi-select for majors and minors
// 2) The form loads in real quick since the async is too fast for the setDoc function

export default function Details(){

  const person = useAuth();
  const [doc, setDoc] = useState(null);

  function good(result : any){
    setDoc(result);
  }
  function bad(error : any){
    //Fill in to avoid infinite render loops probably a page reroute
  }

  if (person.user == null){}
  else{
    if(doc == null){
      getDocument("users", person.user.uid).then(good, bad);
    }
    if (doc == null || doc!.first_name == null){

      return (
        <>
          <DetailForm uid={person.user.uid} email={person.user.email} />
        </>
      )
    }
    else{
      return (
        <>
          <DetailPage info={doc} email={person.user.email}/>
        </>
      )
    }
  }
}



function options (props: {value: string[]}){
  const elements : any = [];
  for (const s in props.value){
    elements.push({value: props.value[s], label: props.value[s]});
  }
  return elements;
}


function DetailForm(props : {uid : string, email: string|null}) {
  const[emplID, setEmplID] = useState("");
  const[firstname, setFirstname] = useState("");
   const[lastname, setLastname] = useState("");
  const[major, setMajor] = useState("");
   const[minor, setMinor] = useState("");
    const[year, setYear] = useState("");

  const handleEvent = () => {
    const userID = setDocument("users", props.uid, 
      {
        emplID: emplID,
        first_name: firstname,
        last_name: lastname,
        email: props.email,
        major: [major],
        minor: [minor],
        year: year
      }
    );
  }

  const majors = ["Accounting", "Africana & Puerto Rican / Latino Studies", "Ancient Greek", "Anthropology", "Arabic", "Archaeology", "Art History", "Behavioral Neurobiology", "Bioinformatics", "Biology", "Biophysics", "Biological Sciences with Specialization in Biotechnology", "Chemistry",  "Childhood Education", "Chinese", "Classical Studies", "Computer Science", "Dance", "Earth Science Adolescent Education", "Economics", "English", "Environmental Studies", "Film", "French", "Geography", "German",  "Hebrew", "History", "Human Biology", "Italian", "Japanese", "Latin", "Latin American and Caribbean Studies", "Latin and Greek", "Mathematics", "Media Studies", "Medical Laboratory Sciences", "Music", "Nursing", "Nutrition and Food Sciences", "Nutrition and Wellness", "Philosophy", "Physics", "Political Science", "Psychology", "Public Health", "Religion", "Romance Languages", "Russian", "Social Studies Adolescent Education", "Sociology", "Spanish", "Spanish and Latin American Literature", "Statistics and Applied Mathematics", "Theatre", "Undecided", "Urban Studies", "Woman and Gender Studies"];
  const minors = majors.concat(["Asian American Studies", "Human Rights", "Linguistics", "Public Policy", "None"]);
  const years = ["Freshman", "Sophomore", "Junior", "Senior"];
  const majEl = options({value:majors});
  const minEl = options({value:minors});
  const yearEl = options({value:years});
  return (
    <>
    <form onSubmit={handleEvent}>
      <label>Enter your First Name:
        <input type="text" 
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        required/>
      </label>
      <label>Enter your Last Name:
        <input type="text" 
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required/>
      </label>
      <label>Enter your EmplID:
        <input type="number"
        value={emplID}
        onChange={(e) => setEmplID(e.target.value)} 
        required/>
      </label>
      <label>Enter your Year:
        <Select options={yearEl}
        onChange={(option: Option | null) => setYear(option!.value)}
        required/>
      </label>
      <label>Enter your Major:
        <Select options={majEl} 
        onChange={(option: Option | null) => setMajor(option!.value)}
        required/>
      </label>
      <label>Enter your Minor:
        <Select options={minEl}
        onChange={(option: Option | null) => setMinor(option!.value)}
        required/>
      </label>
       <button type="submit">
          Submit
        </button>

    </form>
    </>
  )
}

function DetailPage(props: {info : FirestoreDocument, email: string | null}){
  return(
    <>
      Name: {props.info.first_name} {props.info.last_name}<br></br>
      Email: {props.email}<br></br>
      EmplID: {props.info.emplID}<br></br>
      Major: {props.info.major}<br></br>
      Minor: {props.info.minor}<br></br>
      Year: {props.info.year}<br></br>
    </>
  )
}