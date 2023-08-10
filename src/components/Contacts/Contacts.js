import "./Contacts.css";

import { useState } from "react";
import { Contact } from "../Contact/Contact";

export const Contacts = ({contacts}) => {

    const [stateContacts, setContacts] = useState(contacts);
    const [stateSearch, setSearch] = useState('');
    const [stateCheckboxes, setCheckboxes] = useState({female: true, male: true, unknown: true});

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        filter('input', event);
    }

    const handleCheckboxes = (event) => {
        setCheckboxes({...stateCheckboxes, [event.target.name]: event.target.checked});
        filter('checkbox', event);
    }

    const getSearchContacts = (searchStr, filteredContacts) => {
        const contactsVar = filteredContacts || contacts;
        return contactsVar.filter(contact => (contact.firstName + contact.lastName + contact.phone).toLowerCase().match(searchStr)?.length > 0);
    }

    const getCheckedContacts = (checkboxes, filteredContacts) => {
        const checked = [];
        const contactsVar = filteredContacts || contacts;

        for (const key in checkboxes) {
            if (checkboxes[key] === true) {
                if (key === 'unknown') checked.push(undefined);
                checked.push(key);
            }
        }

        return contactsVar.filter(contact => checked.includes(contact.gender));
    }

    function filter (element, event) {
        if (element === 'input') {
            let filteredContacts = getSearchContacts(event.target.value);

            if (Object.values(stateCheckboxes).includes(false)) {
                filteredContacts = getCheckedContacts(stateCheckboxes, filteredContacts);
            }

            setContacts(filteredContacts);
        }

        if (element === 'checkbox') {
            const checkboxes = {...stateCheckboxes, [event.target.name]: event.target.checked};
            let filteredContacts = getCheckedContacts(checkboxes);

            if (stateSearch.length > 0) {
                filteredContacts = getSearchContacts(stateSearch, filteredContacts);
            }

            setContacts(filteredContacts);
        }
    }

    return (
        <>
            <input className="search" type="search" value={stateSearch} onChange={handleSearchChange} placeholder='Search...'/>
            <div className="gender">
                <span className="label">Gender</span><br/>
                <label>female<input type="checkbox" name="female" checked={stateCheckboxes.female} onChange={handleCheckboxes}/></label>
                <label>male<input type="checkbox" name="male" checked={stateCheckboxes.male} onChange={handleCheckboxes}/></label>
                <label>unknown<input type="checkbox" name="unknown" checked={stateCheckboxes.unknown} onChange={handleCheckboxes}/></label>
            </div>
            <div className="contactsList">{stateContacts.map(item => <Contact key={item.id} contact={item}/>)}</div>
        </>
    )
}