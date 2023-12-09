import '../styles/globals.css'
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, doc, getDoc } from '../lib/firebase';
import { useEffect, useState } from 'react';
// import Login from './account-center/login';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from '../store';
import { setCurrentUser } from '../store/userSlice';
import {
  CogIcon,
  HomeIcon,
  UserGroupIcon,
  ChatBubbleLeftEllipsisIcon,
  BriefcaseIcon,
  ChartBarIcon,
  EnvelopeOpenIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";
import { CodeBracketIcon, CreditCardIcon } from '@heroicons/react/20/solid';
// import { usePathname } from 'next/navigation'
// import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SecureComponent Component={Component} props={pageProps} />
    </Provider>
  )
}



function SecureComponent({ Component, props }) {
  const dispatch = useDispatch()
  const [uid, setUid] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [userProfileData, setUserProfileData] = useState(null)
  // const push = useRouter()

  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          setUid(uid)
          const docRef = doc(db, 'users', user.email)
          const userData = await getDoc(docRef)  
          if(uid) {
            setIsLoading(false)
            if(userData) {
              const userProfile = userData.data()
              if(userProfile) {
                setUserProfileData({
                  uid: userProfile?.uid,
                  email: userProfile?.email,
                  firstName: userProfile?.firstName,
                  lastName: userProfile?.lastName,
                  userRole: userProfile?.userRole,
                })
                dispatch(setCurrentUser({
                  uid: userProfile?.uid,
                  email: userProfile?.email,
                  firstName: userProfile?.firstName,
                  lastName: userProfile?.lastName,
                  userRole: userProfile?.userRole,
                }))
              }
            }
          }
          
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
          setIsLoading(false)
        }
      });
  }, [])

  // let sidebarNavigation = []
  // const userRoleDispatcher = () => {
  //   const userRole = userProfileData?.userRole

  //   if(userRole === 'staff') {
  //     sidebarNavigation = [
  //       {
  //         name: "Dashboard",
  //         href: "/account-center",
  //         icon: HomeIcon,
  //         current: false,
  //       },
  //       {
  //         name: "Claims",
  //         href: "/account-center/claims",
  //         icon: BriefcaseIcon,
  //         current: false,
  //       },
  //       {
  //         name: "Members",
  //         href: "/account-center/all-members",
  //         icon: CreditCardIcon,
  //         current: false,
  //       },
  //       {
  //         name: "Agents",
  //         href: "/account-center/all-agents",
  //         icon: UserGroupIcon,
  //         current: false,
  //       },
  //       {
  //         name: "CRM",
  //         href: "https://meetsusan.net/deductsure-crm/public/",
  //         icon: EnvelopeOpenIcon,
  //         current: false,
  //       },
  //       {
  //         name: "Messaging",
  //         href: "/messaging",
  //         icon: ChatBubbleLeftEllipsisIcon,
  //         current: false,
  //       },
  //       {
  //         name: "Website Editor",
  //         href: "/account-center/website-editor/add-post/",
  //         icon: CodeBracketIcon,
  //         current: false,
  //       },
  //       {
  //         name: "Reporting",
  //         href: "/account-center/reporting",
  //         icon: ChartBarIcon,
  //         current: false,
  //       },
  //     ]
  //     // console.log(sidebarNavigation)
  //   }

  //   if(userRole === 'agent') {
  //     sidebarNavigation =  [
  //       {
  //         name: "Dashboard",
  //         href: "/agent-center",
  //         icon: HomeIcon,
  //         current: false,
  //       },
  //       {
  //         name: "Claims",
  //         href: "/agent-center/claims",
  //         icon: BriefcaseIcon,
  //         current: false,
  //       },
  //       {
  //         name: "Members",
  //         href: "/agent-center/all-members",
  //         icon: CreditCardIcon,
  //         current: false,
  //       },
  //       {
  //         name: "Reporting",
  //         href: "/agent-center/reporting",
  //         icon: ChartBarIcon,
  //         current: false,
  //       },
  //     ]
  //     // console.log(sidebarNavigation)
  //   }

  //   if(userRole === 'member') {
  //     sidebarNavigation = [
  //       {
  //         name: "Dashboard",
  //         href: "/member-center",
  //         icon: HomeIcon,
  //         current: false,
  //       },
  //       {
  //         name: "Claims",
  //         href: "/member-center/claims",
  //         icon: BriefcaseIcon,
  //         current: false,
  //       },
  //       {
  //         name: "Billing",
  //         href: "/member-center/reporting",
  //         icon: BanknotesIcon,
  //         current: false,
  //       },
  //       { 
  //         name: "Settings", 
  //         href: "/", 
  //         icon: CogIcon, 
  //         current: false 
  //       },
  //     ];
  //     // console.log(sidebarNavigation)
  //   }



  // }
  // userRoleDispatcher()

//   const getCurrentNavItem = itemName => {
//     const currentNavItem = sidebarNavigation.filter(item => item.name === itemName)[0]
//      if(currentNavItem) {
//       //  console.log(currentNavItem)
//        currentNavItem.current = true
//      }
//    }
   
//    const pathname = usePathname()
//    const userRole = userProfileData?.userRole

//   if(!uid) {

//     if (
//       pathname === "/" ||
//       pathname === "/account-center/register" ||
//       pathname === "/account-center/login" || 
//       pathname === "/discounts-rewards" ||
//       pathname === "/faq" ||
//       pathname === "/join" ||
//       pathname === "/about-us" ||
//       pathname === "/privacy-policy" ||
//       pathname === "/terms-conditions"
//     ) {
//       return (
//         <Component
//           uid={uid}
//           getCurrentNavItem={getCurrentNavItem}
//           sidebarNavigation={sidebarNavigation}
//           userProfileData={userProfileData}
//           pathname={pathname}
//           {...props}
//         />
//       );
//     }

//     return (
//       <>
//       {isLoading && (
//         <div className='flex flex-col h-[100vh] w-[100vw] bg-[#233763] p-4'>
//           <div className='flex flex-col my-auto'>
//             <img className='self-center max-w-[100px]' src='/loading.gif' />
//             <h1 className='text-2xl text-white text-center my-4'>Loading...</h1>
//           </div>
//         </div>
//       )}      
//       {!isLoading && (
//         <Login />
//       )}
//       </>
//     )
//   }

//   if (userRole === 'member' || userRole === 'staff') {
//     if(
//       pathname === "/agent-center" ||
//       pathname === "/agent-center/all-agents"
//     )   {
//       return (
//         <div className='flex flex-col h-[100vh] w-[100vw] bg-[#233763] p-4'>
//           <div className='flex flex-col my-auto'>
//             {/* <img className='self-center max-w-[100px]' src='/loading.gif' /> */}
//             <h1 className='text-2xl text-white text-center my-4'>Permission Denied</h1>
//           </div>
//         </div>
//       )
//     }
//   }

//   if (userRole === 'agent') {
    
//   }


//   return (
//     <Component 
//       uid={uid}
//       getCurrentNavItem={getCurrentNavItem}
//       sidebarNavigation={sidebarNavigation}
//       userProfileData={userProfileData}
//       {...props}
//     />
//   )
// }

  return (
    <Component 
      uid={uid}
      // getCurrentNavItem={getCurrentNavItem}
      // sidebarNavigation={sidebarNavigation}
      // userProfileData={userProfileData}
      {...props}
    />
  )
}


export default MyApp
