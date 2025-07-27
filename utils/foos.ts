/**
 * @file foos.ts is just scratch work frankly
 */
import {FirestoreDocument, getDocument} from '~/utils/firestore';
import { useState } from 'react';

/**
 *Given a user's ID, find out all the clubs that they are in, both ids and names.
 * @param {string} officerID : a user's ID from the firestore database
 * @returns {Object: ids : string[] , names : string[]} : an array of club ids and a corresponding array of names such that ids[i] and names[i] refer to the same club
 */
export function getClubs(officerID : string){
    const [officerDoc, setOfficerDoc] = useState(null);

    function gotDoc (result : any){
        setOfficerDoc(result);
    }

    function failDoc (error : any){
        return null;
    }

    if (officerDoc == null){
        getDocument("officers", officerID).then(gotDoc, failDoc);
    }
    else{
        //@ts-ignore
        const clubIDs = officerDoc.clubs;
        const [clubNames, setClubNames] = useState([]);

        function gotName(result : any){
            //@ts-ignore
            setClubNames([...clubNames, result.name]);
        }
        function failName(result : any){
            return null;
        }

        for (const i in clubIDs){
            getDocument("clubs", clubIDs[i]).then(gotName, failName);
        }
        return {ids : clubIDs, names : clubNames};
    }
    return [];
}

/**
 * Given a club, find all the events that this club has (this can then be cutdown by other methods for different purposes)
 * @param {string} clubId : an ID for the club
 * nah, thats just a query statement
 */

