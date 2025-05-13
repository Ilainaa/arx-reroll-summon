'use client'

import React from 'react';
import { useRouter } from 'next/navigation'
import './reroll.css'

const traitsData = [
  { name: "Superior", percentage: "21%", imageName: "Superior.png" },
  { name: "Horizon", percentage: "21%", imageName: "Horizon.png" },
  { name: "Endure", percentage: "21%", imageName: "Endure.png" },
  { name: "Brute", percentage: "5%", imageName: "Brute.png" },
  { name: "Sniper", percentage: "5%", imageName: "Sniper.png" },
  { name: "Colossal", percentage: "5%", imageName: "Colossal.png" },
  { name: "Investor", percentage: "5%", imageName: "Investor.png" },
  { name: "Jokester", percentage: "5%", imageName: "Jokester.png" },
  { name: "Blitz", percentage: "3.5%", imageName: "Blitz.png" },
  { name: "Juggernaut", percentage: "2.5%", imageName: "Juggernaut.png" },
  { name: "Millionaire", percentage: "2.5%", imageName: "Millionaire.png" },
  { name: "Violent", percentage: "2.5%", imageName: "Violent.png" },
  { name: "Seraph", percentage: "0.5%", imageName: "Seraph.png" },
  { name: "Capitalist", percentage: "0.25%", imageName: "Capitalist.png" },
  { name: "Duplicator", percentage: "0.15%", imageName: "Duplicator.png" },
  { name: "Sovereign", percentage: "0.1%", imageName: "Sovereign.png" },
];

export default function Page() {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <>
      <div className="menubar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="/picture/logo_arx.jpg" alt="logo" className="nav-logo" onClick={() => navigateTo('/')} />
          <div className="brand-name nav-brand" onClick={() => navigateTo('/')}>Anime Ranger X</div>
          <div className="nav-link" onClick={() => navigateTo('/summon')}>
            Summon
          </div>
          <div className="nav-link" onClick={() => navigateTo('/reroll')}>
            Reroll
          </div>
        </div>
      </div>


      <div style={{
        display: 'flex',
        justifyContent: 'space-around', // Distributes space around items
        alignItems: 'flex-start', // Aligns items to the top
        padding: '20px',
        minHeight: 'calc(100vh - 40px)' // Adjust based on your layout/header/footer
      }}>
        {/* กล่องซ้าย */}
        <div style={{
          width: '45%', // Adjust width as needed
          minHeight: '300px', // Example height
          border: '2px solid #ccc',
          padding: '15px',
          marginLeft: '100px',
          boxSizing: 'border-box' //
        }}>
          <h2 style={{fontSize: '40px',textAlign: 'center', marginBottom: '10px',marginLeft: '30px' }}>Trait Reroll</h2>
          <div className='boxtTrait_list' style={{ marginTop: '20px' }}>
            {traitsData.map((trait, index) => (
              <div className='boxtTrait_item' key={index} style={{ marginBottom: '5px' ,marginLeft: '40px' }}> {/* Slightly increased margin for better spacing */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%' // Ensure the row takes full width
                }}>
                  <img
                    src={`/picture/reroll/${trait.imageName}`}
                    alt={trait.name}
                    className="Trait_logo"
                    style={{ width: '30px', height: '30px', marginRight: '10px' }} // Image on the left with some margin
                  />
                  <div style={{ flexGrow: 1, textAlign: 'center' }}> {/* Name takes available space and centers its text */}
                    {trait.name}
                  </div>
                  <div style={{ marginLeft: '10px', minWidth: '50px', textAlign: 'right' }}> {/* Percentage on the right with some margin and min-width for alignment */}
                    {trait.percentage}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*////////////////////////////// ทำต่อ select เลือก trait ว่าต้องการอะไร //////////////////////////////*/}
          <div style={{
            marginTop: '20px', // Space above the button box
            paddingTop: '15px', // Space inside the button box, above buttons
            borderTop: '1px solid #eee', // Optional: a separator line
            display: 'flex',
            flexWrap: 'wrap', // Allow buttons to wrap if not enough space
            gap: '10px', // Space between buttons
            justifyContent: 'space-around' // Distribute buttons
          }}>
            <button style={{ padding: '10px 15px', flexGrow: 1, minWidth: '120px' }}>
              Single Reroll
            </button>
            <button style={{ padding: '10px 15px', flexGrow: 1, minWidth: '120px' }}>
              Reroll for Trait
            </button>
            <button style={{ padding: '10px 15px', flexGrow: 1, minWidth: '120px' }}>
              Reset
            </button>
            <button style={{ padding: '10px 15px', flexGrow: 1, minWidth: '120px' }}>
              Auto-Reset
            </button>
          </div>
        </div>

        {/* กล่องขวา */}
        <div style={{
          width: '45%',
          minHeight: '300px', // Example height
          border: '2px solid #ccc',
          padding: '15px',
          boxSizing: 'border-box'
        }}>
          <h2>กล่องขวา</h2>
          <p>เนื้อหาในกล่องขวา...</p>
        </div>
      </div>
    </>
  )
}
