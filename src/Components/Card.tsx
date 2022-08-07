import { useState } from 'react'
import '../Styles/card.css'
import { HiArrowNarrowUp, HiArrowNarrowDown } from 'react-icons/hi'
import { useMutation } from '@apollo/client'
import { CREATE_GUEST } from '../Graphql/Mutations'
import { useParams } from 'react-router-dom'

function Card() {

    const [name, setName] = useState<string>('')
    const [attendees, setAttendees] = useState<number>(1)
    const [accept, setAccept] = useState<boolean>(false)
    const [decline, setDecline] = useState<boolean>(false)
    const [createGuest] = useMutation(CREATE_GUEST)
    const [inputError, setInputError] = useState('')

    const params:any = useParams();

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (name) {
            if (accept || decline) {
                createGuest({
                    variables: {
                        name: name,
                        accept: accept,
                        attending: accept ? attendees : 0,
                        ownerId: parseInt(params.id) || 4
                    },
                    onCompleted: () => {
                        setInputError('RSVP SENT')
                    }
                })
            } else {
                setInputError('Accept/Decline required')
            }
        } else {
            setInputError('Name required')
        }
        
    }

    const reduce = () => {
        if (attendees > 1 && !decline) {
            setAttendees(prev => prev - 1)
        }
    }
    const increase = () => {
        if (attendees < 20 && !decline) {
            setAttendees(prev => prev + 1)
        }
    }

  return (
    <div className='card-container'>
        <div className='card'>
            <form className='form' onSubmit={(e) => handleSubmit(e)}>
                <h1>RSVP</h1>
                <h2>Name: <input type='text' className='name-input' onChange={(e) => setName(e.target.value)} /></h2>
                <div className='accept-buttons'>
                    <button onClick={() => {setAccept(true); setDecline(false)}} className={accept ? 'selected' : 'nsel'} type="button">I Accept</button>
                    <button onClick={() => {setDecline(true); setAccept(false)}} className={decline ? 'selected' : 'nsel'} type="button">I Decline</button>
                </div>
                <h2 className={decline ? 'grayed attending' : 'attending'}>
                    Number Attending: 
                    <button onClick={reduce} className={decline ? 'grayed' : 'arrow'} type="button"><HiArrowNarrowDown /></button>
                    <span className='attendees'>{attendees}</span>
                    <button onClick={increase} className={decline ? 'grayed' : 'arrow'} type="button"><HiArrowNarrowUp /></button>
                </h2>
                <button className='submit'>Submit</button>
                <h3 className='error'>{inputError}</h3>
            </form>
        </div>
    </div>
  )
}

export default Card