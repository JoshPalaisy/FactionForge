import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../store/userSlice'
import { HomeIcon, ListBulletIcon, MegaphoneIcon, MinusCircleIcon, QueueListIcon, RocketLaunchIcon, Square2StackIcon, UserGroupIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import CommonButton from '../../../components/Assets/CommonButton'

export default function Missions() {
    const user = useSelector(selectUser)
    const push = useRouter()
    const [missions, setMissions] = useState(null)

    useEffect(() => {
        const getMissions = async () => {
            const missionsRef = query(collection(db, 'missions'))
            onSnapshot(missionsRef, (querySnapshot) => {
                const missionsData = []
                querySnapshot && querySnapshot.forEach((doc) => {
                    const mission = doc.data()
                    if (mission) {
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
                        <h1 className='text-3xl text-white text-center mx-auto'>Mission Manager</h1>

                        {/* Mission Controls */}
                        <div className='flex flex-row-reverse p-4'>
                            <CommonButton
                                classes={'m-2'}
                                action={() => window.location.assign('/launcher/missions/#')}
                                label={'Events'}
                            />
                            <CommonButton
                                classes={'m-2'}
                                action={() => window.location.assign('/launcher/missions/#')}
                                label={'Job Board'}
                            />
                            <CommonButton
                                classes={'m-2'}
                                action={() => window.location.assign('/launcher/missions/new')}
                                label={'New Mission'}
                            />

                        </div>

                        {/* Missions */}
                        {missions && (
                            <div className='w-1/3 p-4'>
                                <h3 className='text-white/80 text-xl font-semibold w-full text-center'>
                                    Active Missions
                                </h3>
                                {missions && missions.map((mission, index) => (
                                    <CommonButton
                                        key={index}
                                        classes={'m-2 w-full text-sm'}
                                        action={() => window.location.assign('/launcher/missions/new')}
                                        label={mission.title}
                                    />                        
                                ))}
                            </div>
                        )}

                        {!missions || missions.length < 1 && (
                            <h3 className='text-white text-xl text-center m-auto'>
                                No active missions found.
                            </h3>
                        )}

                    </div>

                </div>

            </main>
        </React.Fragment>
    )
}
