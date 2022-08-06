import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DELETE_GUEST, DELETE_USER } from '../Graphql/Mutations'
import { GET_ALL_GUESTS } from '../Graphql/Queries'
import '../Styles/attendance.css'


function Attendance() {
    const [guestList, setGuestList] = useState([])
    const [deleteGuest] = useMutation(DELETE_GUEST)
    const [deleteUser] = useMutation(DELETE_USER)
    const token = sessionStorage.getItem("accessToken")
    const { error, data: guestData } = useQuery(GET_ALL_GUESTS, {
        variables: {
            accessToken: token
        },
        onCompleted: (guestData) => {
            setGuestList(guestData.getAllGuests)
        },
    });
    let total = 0
    const navigate = useNavigate()
    if ( error && error.toString() === 'Error: Access Token Expired') {
        navigate('/')
    }

    function parseJwt(token:any) {
        if (!token) {
          return;
        }
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    }
    const tokenData = parseJwt(token)
    const handleClick = (guestId:number) => {
        deleteGuest({ variables:
            { 
                id: guestId,
            
            },
            onCompleted: () => {
                const updatedList = guestList.filter((guest:any) => {
                    return guest.id !== guestId
                })
                setGuestList(updatedList)
            }
        })
    }

    const handleLogout = () => {
        sessionStorage.removeItem("accessToken")
    }
    const handleDeleteUser = () => {
        console.log('here')
        deleteUser({ variables:
            { accessToken: token },
            onCompleted: () => {
                sessionStorage.removeItem("accessToken")
                navigate('/')
            },
        })
    }
    const currenturl = window.location.href.slice(0, -10) + 'rsvp'
    const link = `${currenturl}/${tokenData.id}`

  return (
    <div className='guests-container'>
        <a className='logout' onClick={() => handleLogout()} href='./'>Logout</a>
        <h2 className='link'><a href={link}>Link</a>:&nbsp;{currenturl}/{tokenData.id}</h2>
        <h1 className='table-header'>Guests</h1>
        <div className='scroll-table'>
            <table className='guests-table'>
            <thead>
            <tr>
                <th>Name</th>
                <th>Accepted</th>
                <th>Attending</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {guestData &&
               guestList.map((guest:any, index: number) => {
                    total = total + guest.attending
                    return (
                        <tr key={`${index}`}>
                            <td>{guest.name}</td>
                            <td>{guest.accept ? 'Yes' : 'No'}</td>
                            <td>{guest.attending}</td>
                            <td><button onClick={() => {handleClick(guest.id)}}>Delete</button></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
        </div>
        <h2>Total Attending: {total}</h2>
        <button className='delete-user' onClick={() => handleDeleteUser()}>Delete User</button>
    </div>
  )
}

export default Attendance