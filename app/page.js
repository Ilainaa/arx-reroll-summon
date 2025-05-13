//app/page.js
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  const handleSummonClick = () => {
    router.push('/summon'); // Adjusted to /summon based on typical routing and app/summon/page.js
  };

  const handleRerollClick = () => {
    router.push('/reroll');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      position: 'relative' // Needed for absolute positioning of the footer text if not using fixed
    }}>
      <img src="/picture/logo_arx.jpg" alt="Arx Logo" style={{ height: '250px', marginBottom: '30px' }} />
      <div> {/* Container for buttons */}
        <button
          onClick={handleSummonClick}
          style={{
            marginRight: '10px', // Space between buttons
            padding: '12px 24px',
            fontSize: '16px',
            cursor: 'pointer' // Changes cursor to indicate it's clickable
          }}
        >
          Summon
        </button>
        <button
          onClick={handleRerollClick}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
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
  )
}
