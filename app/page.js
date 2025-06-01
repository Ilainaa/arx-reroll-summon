//app/page.js
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import './main.css'


export default function Page() {
  const router = useRouter()

  const handleSummonClick = () => {
    router.push('/summon'); // Adjusted to /summon based on typical routing and app/summon/page.js
  };

  const handleRerollClick = () => {
    router.push('/reroll');
  };

  return (
    <>
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed', // Fixed position to cover the entire viewport
          right: '0',
          bottom: '0',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',     // Maintain aspect ratio
          height: 'auto',    // Maintain aspect ratio
          zIndex: '-1',      // Place it behind other content
          objectFit: 'cover' // Cover the area, cropping if necessary
        }}
      >
        <source src="/video/ARX Trailer.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        position: 'relative' // Needed for z-index stacking context if children need it
      }}>
        <img src="/picture/logo_arx.png" alt="Arx Logo"  className="logo-pulse" style={{ height: '250px', marginBottom: '30px' }} />
        <div> {/* กล่องที่สามารถเพิ่มปุ่มได้*/}

          <button onClick={handleRerollClick} className="reroll-button">
            Reroll
          </button>

        </div>
        <div style={{
          position: 'fixed', // Positions relative to the viewport
          bottom: '10px',    // 10px from the bottom
          right: '10px',     // 10px from the right
          textAlign: 'right',
          fontSize: '12px',  // Adjust font size as needed
          color: '#555',
          cursor: 'default'      // Adjust color as needed
        }}>
          By Thanawat Lumpool<br />
          (ธนวัฒน์ ลำพูน)
        </div>
      </div>
    </>
  )
}
