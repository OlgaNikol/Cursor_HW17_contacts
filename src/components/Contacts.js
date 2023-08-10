import "./Contacts.css";

import { useState } from "react";
import { Contact } from "./Contact";

export const Contacts = ({contacts}) => {

    const [stateContacts, setContacts] = useState(contacts);
    const [stateSearch, setSearch] = useState('');
    const [stateCheckboxes, setCheckboxes] = useState({female: true, male: true, unknown: true});

    const handleSearchChange = (event) => {
        const filteredContacts = contacts.filter(contact => (contact.firstName + contact.lastName + contact.phone).toLowerCase().match(event.target.value)?.length > 0);
        setSearch(event.target.value);
        setContacts(filteredContacts);
    }

    const handleCheckboxes = (event) => {
        setCheckboxes({...stateCheckboxes, [event.target.name]: event.target.checked});
        const unchecked = [];

        for (const key in stateCheckboxes) {
            if (stateCheckboxes[key] === true) {
                if (key === 'unknown') unchecked.push(undefined);
                unchecked.push(key);
            }
        }

        const filteredContacts = contacts.filter(contact => unchecked.includes(contact.gender));
        setContacts(filteredContacts);
    }

    return (
        <>
            <input className="search" type="search" value={stateSearch} onChange={handleSearchChange} placeholder='Search...'/>
            <div className="gender">
                <span className="label">Gender</span><br/>
                <label>female<input type="checkbox" name="female" checked={stateCheckboxes.female} onChange={handleCheckboxes}/></label>
                <label>male<input type="checkbox" name="male" checked={stateCheckboxes.male} onChange={handleCheckboxes}/></label>
                <label>unchecked<input type="checkbox" name="unknown" checked={stateCheckboxes.unknown} onChange={handleCheckboxes}/></label>
            </div>
            <div className="contactsList">{stateContacts.map(item => <Contact key={item.id} contact={item}/>)}</div>
        </>
    )
}