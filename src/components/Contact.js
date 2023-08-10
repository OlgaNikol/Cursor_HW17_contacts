import './Contact.css';
import female from '../assets/images/person-dress-solid.svg'
import male from '../assets/images/person-solid.svg'

export const Contact = ({contact}) => {
    const gender = contact.gender === 'female' ? female : contact.gender === 'male' ? male : '';

    return (
        <div className='contactCard'>
            <div><span className='label'>Full name:</span> {contact.firstName} {contact.lastName}</div>
            <div><span className='label'>Phone:</span> {contact.phone}</div>
            <div><span className='label'>Gender:</span>  {gender ? <img src={gender} alt="gender"/> : null}</div>
        </div>
    )
}
