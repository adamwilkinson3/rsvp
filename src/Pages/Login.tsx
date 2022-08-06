import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spotlight from '../Components/Spotlight'
import { AUTHENTICATE_USER, CREATE_USER } from '../Graphql/Mutations'
import '../Styles/login.css'

function Login() {

    const [login, setLogin] = useState<boolean>(true)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [authenticateUser] = useMutation(AUTHENTICATE_USER)
    const [createUser] = useMutation(CREATE_USER)
    const [errorMessage, setErrorMessage] = useState<any>('')
    const navigate = useNavigate()

    const handleSubmit = (e:any) => {
        e.preventDefault()
        if (login) {
            if (username && password) {
                authenticateUser({
                    variables: {
                        username: username,
                        password: password
                    },
                    onCompleted: data => {
                        if (data.authenticateUser.successful) {
                            setErrorMessage('Login Successful')
                            sessionStorage.setItem("accessToken", data.authenticateUser.message)
                            navigate('/attendance')
                        } else {
                            setErrorMessage(data.authenticateUser.message)
                        }
                    }
                })
            } else {
                if (!username) {
                    setErrorMessage('Please Enter a Username')
                } else {
                    setErrorMessage('Please Enter a Password')
                }
            }
        } else {
            if (username && password && confirmPassword) {
                if (password === confirmPassword) {
                    createUser({
                        variables: {
                            username: username,
                            password: password
                        },
                        onCompleted: createData => {
                            if (createData.createUser.successful) {
                                setErrorMessage('User Created')
                                sessionStorage.setItem("accessToken", createData.createUser.message)
                                navigate('/attendance')
                            } else {
                                setErrorMessage(createData.createUser.message)
                            }
                        }
                    })
                }
            }
        }
    }

  return (
    <div>
        <Spotlight />
        <div className='login-container'>
            <div className='login'>
                <div className='login-buttons'>
                    <button onClick={() => {setLogin(true); setErrorMessage('')}} className={login ? 'login-selected' : ''} >Login</button>
                    <button onClick={() => {setLogin(false); setErrorMessage('')}} className={login ? '' : 'login-selected'} >Create Account</button>
                    <button className='demo' onClick={() => {setLogin(true); setUsername('test'); setPassword('123')}}>Demo</button>
                </div>
                <form className='login-form' onSubmit={(e) => handleSubmit(e)}>
                    <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} value={username} />
                    <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                    {login ? null :
                        <input type='password' placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                    }
                    <button className='login-submit'>Login</button>
                    <h3>{errorMessage}</h3>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login