import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../store/userSlice'
import { HomeIcon, ListBulletIcon, MegaphoneIcon, MinusCircleIcon, QueueListIcon, RocketLaunchIcon, Square2StackIcon, UserGroupIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { collection, doc, onSnapshot, query, setDoc } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'
import CommonButton from '../../../../components/Assets/CommonButton'

export default function NewMission() {
  const user = useSelector(selectUser)
  const push = useRouter()
  const [missions, setMissions] = useState(null)
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true)
  const [operationTypes, setOperationTypes] = useState([
    {operationName: 'Transport/Cargo'},
    {operationName: 'Salvage/Towing'},
    {operationName: 'Security Contract'},
    {operationName: 'PVP Bounty'},
    {operationName: 'PVE Bounty'},
    {operationName: 'Industrial Mining'},
    {operationName: 'Cave Mining'}
  ])
  const [title, setTitle] = useState(null)
  const [category, setCategory] = useState(null)
  const [pay, setPay] = useState(null)
  const [description, setDescription] = useState(null)

  useEffect(() => {
    const getMissions = async () => {
      const missionsRef = query(collection(db, 'missions'))
      onSnapshot(missionsRef, (querySnapshot) => {
        const missionsData = []
        querySnapshot && querySnapshot.forEach((doc) => {
          const mission = doc.data()
          if(mission) {
            missionsData.push(mission)
          }
        });
        setMissions(missionsData)
      })
    }
    getMissions()
  }, [])

  const navigation = [
    {
      title: 'Overview',
      link_url: '/launcher',
      active: false,
      icon: HomeIcon
    },
    {
      title: 'Missions',
      link_url: '/launcher/missions',
      active: true,
      icon: QueueListIcon
    },
    {
      title: 'Comms',
      link_url: '#',
      active: false,
      icon: MegaphoneIcon
    },
    {
      title: 'Members',
      link_url: '#',
      active: false,
      icon: UserGroupIcon
    },
    {
      title: 'Ships',
      link_url: '#',
      active: false,
      icon: RocketLaunchIcon
    }
  ]

    function SaveMission() {
        const ref = doc(collection(db, 'missions'));
        setDoc(ref, {
          title,
          category,
          pay,
          description,
          created_by: {
            user: `${user.firstName} ${user.lastName}`,
            timestamp: new Date()
          }
        })
        .then(docRef => {
          if(docRef.exists()) {
            console.log("Document data:", docSnap.data())
            setTitle(null)
            setCategory(null)
            setPay(null)
            setDescription(null)
            window.location.assign('/launcher/missions/')
          }
          else {
            console.log("No such document!")
          }
        })
        .catch(error => {
           console.log(error);
       })  
    }

    function CheckDisabledButton() {
        if(title, category, pay, description && description.length >= 30) {
            return false
        }
        else return true
    }

  return (
    <React.Fragment>
      <Head>
        <title>Faction Forge</title>
      </Head>
      <main className='bg-gray-800 flex flex-1 flex-row w-full h-[100vh] m-auto relative'>
        <aside className='flex flex-col h-full w-[10vw] min-w-fit bg-black/20 my-auto'>
         {navigation && navigation.map((navigationItem, index) => (
          <button
            key={index}
            onClick={() => window.location.assign(navigationItem.link_url)}
            className={navigationItem.active
              ? 'flex-1 group text-xl text-center w-full h-40 text-white/80 border-2 border-gray-400 bg-white/5'
              : 'flex-1 group text-xl text-center w-full h-40 text-white/50 border-2 border-gray-600 hover:border-gray-400 hover:text-white/80'
            }
          >
            {navigationItem.icon && (
              <navigationItem.icon className={navigationItem.active
                  ? 'text-white/80 h-1/3 text-center m-auto'
                  : 'text-white/50 group-hover:text-white/80 h-1/3 text-center m-auto'
                } 
                aria-hidden="true"
             />
            )}
            {navigationItem?.title}
          </button>
         ))}
        </aside>

        <div className='flex w-[90vw] mt-[64px] min-w-fit'>

          {/* Toolbar */}
          <div id='toolbar' className='flex flex-col top-0 absolute h-[32px] m-auto  min-w-fit w-[90vw] bg-gray-900 '>
            <p className='text-white text-sm text-center my-auto mr-[32px]'>Faction Forge</p>
            <button
              className='absolute top-0 right-0 p-1 border-2 border-white/20'
              onClick={() => window.close()}
            >
              <XMarkIcon className="h-[20px] w-[20px] text-white/50" aria-hidden="true" />
            </button>
          </div>

          <div className='flex flex-col w-full h-full'>
            
            {/* Welcome Message */}
            <h1 className='text-3xl text-white text-center mx-auto'>Mission Manager: New Mission</h1>
            
            {/* Mission Controls */}
              <div className='flex flex-row-reverse p-4'>
                <CommonButton
                  action={() => window.location.assign('/launcher/missions')}
                  label={'Go Back'}
                />
              </div>

              <div className='grid grid-cols-4 w-full p-4'>

                <input
                    type='text'
                    className='text-white/80 text-xl font-semibold border-2 border-white/80 bg-transparent col-span-3'
                    placeholder='Mission Title'
                    color='#fff'
                    onChange={(e) => setTitle(e.target.value)}
                />

                <select
                    className='bg-transparent border-2 border-white/80 text-white/80 font-semibold cols-span-1'
                    placeholder='Operation Type'
                    selected={'Operation Type'}
                    defaultValue={'Operation Type'}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option disabled value={'Operation Type'} className='text-white/80 bg-gray-700 border-2 border-white/80 h-[25px]'>
                        Operation Type
                    </option>
                    {operationTypes && operationTypes.map((operationType, index) => (
                        <option value={operationType.operationName} className='text-white/80 bg-gray-700 border-2 border-white/80 h-[25px]'>
                            {operationType.operationName}
                        </option>
                    ))}
                </select>

                <div className='col-span-4 flex flex-col mt-4 p-4'>
                    <h3 className='text-white/80 text-xl font-semibold w-full text-center'>Contract Pay</h3>
                    <span className="block mb-2 ml-auto text-lg font-semibold text-white/80">
                        {`${pay ? pay.toLocaleString('en-US') : 0} aUEC`}
                    </span>
                    <input 
                        id="default-range" 
                        type="range" 
                        max={400}
                        defaultValue={0}
                        onChange={(e) => setPay(e.target.value * 500)} 
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" 
                    />
                </div>

                {/* <div className='col-span-2 flex mt-4 p-4'>
                    <input
                        type='number'
                        min="5000"
                        step="1000"
                        max="25000000"
                        onChange={(e) => setPay(Number(e.target.value))}
                        className=' text-white/80 text-xl font-semibold border-2 border-white/80 bg-transparent flex flex-1'
                        placeholder='Contract Pay'
                    >
                    </input>
                    <span className='text-white text-md font-semibold m-auto flex border-2 border-white/80 h-full p-2'>aUEC</span>
                </div> */}

                <div className='col-span-4 mt-4 '>
                    {/* <h3 className='text-white/80 text-xl'>
                        Mission description
                    </h3> */}
                    <textarea
                        rows={10}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={5000}
                        minLength={300}
                        placeholder='Mission Description... max 5000 chars.'
                        className='w-full bg-transparent text-white/80 border-2 border-white/80 text-xl'
                    />
                </div>

                <CommonButton
                    label={'Post Mission'}
                    classes={`h-[80px] text-2xl w-full mt-4`}
                    disabled={CheckDisabledButton() ? true : false}
                    action={(e) => SaveMission()}
                />

              </div>

          </div>

        </div>

      </main>
    </React.Fragment>
  )
}
