import { useState, useEffect } from 'react'
import Head from 'next/head'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/userSlice'

export default function HomePage() {
  const [message, setMessage] = useState('No message found')
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)
  const user = useSelector(selectUser)


  useEffect(() => {
    const checkUserAuthValid = async () => {
      if(user) {
        await window?.ipc?.send('login-success')
        return true
      }
      else return false
    }
    checkUserAuthValid()
    .then((result) => {
      if(result) {
        window.close()
      }
    })
  }, [])

  const login = async (e) => {
    // e.preventDefault();
    console.log('handleSignIn', email)
    signInWithEmailAndPassword(auth, email, password)
      .then(async (authUser) => {
         if(authUser) {
            console.log('User logged in successfully')
            return true
         }
         else {
          return false
         }
      })
      .then(async (result) => {
        if(result) {
          await window.ipc.send('login-success')
          return true
        }
        else return false
      })
      .then((result) => {
        if(result) {
          window.close()
        }
      })
      .catch((error) => {
       const cleanedMessage = error.message.replace('Firebase: ', '')
        setError(cleanedMessage);
      });
   } 

  function RenderErrorAlert() {
    if(error) {
      const ErrorText = error.toString()
      return (
        <div className="rounded-md bg-red-50 m-4 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{`${ErrorText}`}</h3>
              <div className="mt-2 text-sm text-red-700">
              </div>
            </div>
          </div>
        </div>
      )
    }
   }

   const checkUserAuthValid = async () => {
      if(user) {
        await window.ipc.send('login-success')
      }  
    }
    // checkUserAuthValid()
    // .then(() => window.close())

  
  return (
    <div className='flex flex-1 flex-col w-full h-[100vh] bg-gray-800'>
      <Head>
        <title>Faction Forge</title>
      </Head>
      <div className='flex flex-1 flex-col w-full'>
        <img
          src="/images/logo-white.png"
          alt="Faction Forge"
          className='h-[200px] m-auto mt-[150px] p-6'
        />
        <h1 className='text-white/80 text-4xl tracking-wider text-center'>Faction Forge</h1>
        <div className='flex flex-1 flex-col p-4 mt-[50px]'>
          {RenderErrorAlert()}
          <input
            type='email' 
            placeholder='Email'
            className='h-[50px] bg-black/25 text-white m-4 p-4 text-xl'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='Password'
            className='h-[50px] bg-black/25 text-white m-4 p-4 text-xl'
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>
        <button
          className='bg-white/5 w-full h-[100px] text-white text-xl uppercase'
          onClick={(e) => {
            if(email && password) {
              login(e)
            }
            else {
              setError('You must login with an email and password.')
            }
          }}
        >
          Login
        </button>
      </div>
    </div>
  )
}
