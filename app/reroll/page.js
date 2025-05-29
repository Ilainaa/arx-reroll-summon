'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import './reroll.css'



export default function Page() {
  const router = useRouter();
  const [rolledTrait, setRolledTrait] = useState(null);
  const [rollHistory, setRollHistory] = useState([]); // State สำหรับเก็บประวัติการสุ่ม
  const [rerollsSpent, setRerollsSpent] = useState(0); // State สำหรับนับจำนวนการสุ่ม
  const [selectedTraitForReroll, setSelectedTraitForReroll] = useState('Mythic Trait'); // State สำหรับ Trait ที่เลือกใน dropdown, ตั้งค่าเริ่มต้นเป็น 'Mythic Trait'
  const [isRerolling, setIsRerolling] = useState(false); // State สำหรับตรวจสอบว่ากำลังสุ่มหรือไม่
  const [isSmallScreen, setIsSmallScreen] = useState(false); // State สำหรับตรวจสอบขนาดหน้าจอ

  const mythicTraitNames = ['Sovereign', 'Duplicator', 'Capitalist', 'Seraph'];
  const goldenTraitNames = ['Violent', 'Millionaire', 'Juggernaut', 'Blitz'];
  const epicTraitNames = ['Jokester', 'Investor', 'Colossal', 'Sniper', 'Brute'];
  const rareTraitNames = ['Endure', 'Horizon', 'Superior'];


  const traitsData = [
    { name: "Sovereign", percentage: "0.1%", imageName: "Sovereign.png", description: "Ultimate Power!\n+ 300% HP\n+ 300% Damage\n+ 50% Range\nLower spawn cap to 1" },
    { name: "Duplicator", percentage: "0.15%", imageName: "Duplicator.png", description: "This unit duplicates on spawn!\n+ 100% HP\n+ 100% Damage\nWhen spawning this unit, spawns 2 instead" },
    { name: "Capitalist", percentage: "0.25%", imageName: "Capitalist.png", description: "Massive cost reduction and strength!\n- 50% Cost\n+ 50% Damage\n+ 50% HP\nIncrease spawn cap by 1" },
    { name: "Seraph", percentage: "0.5%", imageName: "Seraph.png", description: "Unparalleled power!\n+ 50% Range\n+ 50% Damage\n+ 50% HP\n+ 30% Evade" },
    { name: "Violent", percentage: "2.5%", imageName: "Violent.png", description: "Extreme damage boost!\n+ 25% Damage" },
    { name: "Millionaire", percentage: "2.5%", imageName: "Millionaire.png", description: "Significant cost reduction!\n- 20% Cost" },
    { name: "Juggernaut", percentage: "2.5%", imageName: "Juggernaut.png", description: "Extreme HP boost!\n+ 25% HP" },
    { name: "Blitz", percentage: "3.5%", imageName: "Blitz.png", description: "Extreme range boost!\n+ 25% Range" },
    { name: "Jokester", percentage: "5%", imageName: "Jokester.png", description: "A balanced unit!\n+ 5% Range\n+ 5% Damage\n+ 5% HP" },
    { name: "Investor", percentage: "5%", imageName: "Investor.png", description: "This unit has reduced cost!\n- 10% Cost" },
    { name: "Colossal", percentage: "5%", imageName: "Colossal.png", description: "This unit specializes in HP!\n+ 15% HP" },
    { name: "Sniper", percentage: "5%", imageName: "Sniper.png", description: "This unit specializes in range!\n+ 15% Range" },
    { name: "Brute", percentage: "5%", imageName: "Brute.png", description: "This unit specializes in damage!\n+ 15% Damage" },
    { name: "Endure", percentage: "21%", imageName: "Endure.png", description: "This unit has increased HP!\nEndure I +5% HP\nEndure II +7% HP\nEndure III +10% HP" },
    { name: "Horizon", percentage: "21%", imageName: "Horizon.png", description: "This unit has increased range!\nHorizon I +5% Range\nHorizon II +7% Range\nHorizon III +10% Range" },
    { name: "Superior", percentage: "21%", imageName: "Superior.png", description: "This unit has increased damage!\nSuperior I +5% Damage\nSuperior II +7% Damage\nSuperior III +10% Damage" },
  ];

  useEffect(() => {
    const breakpoint = 960; // กำหนด breakpoint สำหรับการเปลี่ยน layout
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < breakpoint);
    };

    checkScreenSize(); // ตรวจสอบขนาดหน้าจอครั้งแรกเมื่อ component โหลด
    window.addEventListener('resize', checkScreenSize); // เพิ่ม event listener สำหรับการ resize

    return () => window.removeEventListener('resize', checkScreenSize); // Cleanup listener เมื่อ component unmount
  }, []);

  function getRandomTrait() {
    const weightedTraits = traitsData.map(trait => ({
      ...trait,
      weight: parseFloat(trait.percentage)
    }));

    const totalWeight = weightedTraits.reduce((sum, t) => sum + t.weight, 0);
    const rand = Math.random() * totalWeight;

    let cumulative = 0;
    for (let i = 0; i < weightedTraits.length; i++) {
      cumulative += weightedTraits[i].weight;
      if (rand < cumulative) {
        return weightedTraits[i];
      }
    }

    return null; // fallback เผื่อเกิดข้อผิดพลาด
  }

  const handleSingleReroll = () => {
    const newTrait = getRandomTrait();
    setRolledTrait(newTrait);
    setRollHistory(prevHistory => [newTrait, ...prevHistory]); // เพิ่ม trait ใหม่เข้าไปด้านหน้าของ array
    setRerollsSpent(prevCount => prevCount + 1); // เพิ่มจำนวนการสุ่ม
  };

  // ฟังก์ชันสำหรับ Reroll for Trait
  const handleTraitReroll = () => {
    // ตรวจสอบว่าได้เลือก trait หรือไม่
    if (!selectedTraitForReroll) {
      alert('Please select a trait first');
      return;
    }

    // กำหนดเงื่อนไขการหยุดสุ่ม
    const shouldStopRerolling = (trait) => {
      if (selectedTraitForReroll === 'Mythic Trait') {
        return mythicTraitNames.includes(trait.name);
      }
    }

    // เริ่มกระบวนการสุ่ม
    setIsRerolling(true);


    // ฟังก์ชันสำหรับสุ่มจนกว่าจะได้ trait ที่ต้องการ
    const rerollUntilMatch = () => {
      const newTrait = getRandomTrait();

      // บันทึกประวัติและจำนวนครั้งที่สุ่ม
      setRollHistory(prevHistory => [newTrait, ...prevHistory]);
      setRerollsSpent(prevCount => prevCount + 1);


      // ตั้งค่า trait ล่าสุดที่สุ่มได้
      setRolledTrait(newTrait);

      // ตรวจสอบว่าได้ trait ที่ต้องการหรือไม่
      if (selectedTraitForReroll === 'Mythic Trait' ? shouldStopRerolling(newTrait) : newTrait.name === selectedTraitForReroll) {
        setIsRerolling(false);

      } else {
        // ถ้ายังไม่ได้ trait ที่ต้องการ ให้สุ่มต่อไปโดยใช้ setTimeout เพื่อไม่ให้ browser freeze
        setTimeout(rerollUntilMatch, 10);
      }
    };

    // เริ่มกระบวนการสุ่ม
    rerollUntilMatch();
  };

  const handleResetReroll = () => {
    setRolledTrait(null);
    setRollHistory([]);
    setRerollsSpent(0); // รีเซ็ตจำนวนการสุ่ม
    setIsRerolling(false); // หยุดการสุ่ม (ถ้ากำลังสุ่มอยู่)
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  // Styles objects for dynamic styling
  const pageContainerStyle = {
    display: 'flex',
    flexDirection: isSmallScreen ? 'column' : 'row',
    justifyContent: 'space-around',
    alignItems: isSmallScreen ? 'center' : 'flex-start',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '20px',
    paddingTop: '50px',
    minHeight: '100vh',
    boxSizing: 'border-box'
  };

  const contentBoxStyle = {
    width: isSmallScreen ? '95%' : '45%',
    minHeight: '300px',
    padding: '15px',
    boxSizing: 'border-box',
    marginBottom: isSmallScreen ? '20px' : '0'
  };

  const leftBoxHeadingStyle = {
    fontSize: '40px',
    textAlign: 'center',
    marginBottom: '10px',
    marginLeft: isSmallScreen ? '0' : '30px'
  };

  const traitListItemContainerStyle = {
    
    marginTop: '20px',
    maxHeight: '500px',
    maxWidth: '1000px'
  };

  const traitListItemStyle = {
    marginBottom: '5px',
    marginLeft: isSmallScreen ? 'auto' : '40px', // Center items or use smaller margin
    marginRight: isSmallScreen ? 'auto' : '0',
    maxWidth: isSmallScreen ? '100%' : 'none'
  };

  const buttonGroupContainerStyle = {
    marginTop: '20px',
    marginLeft: isSmallScreen ? '0' : '40px', // Full width on small, specific margin on large
    marginRight: isSmallScreen ? '0' : '0',
    paddingTop: '15px',
    borderTop: '1px solid #7c7c7c',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'space-around',
    width: isSmallScreen ? '100%' : 'none', // Take full width of parent on small screens
  };

  const rightBoxHeadingStyle = {
    fontSize: '20px',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '-20px',
    marginLeft: isSmallScreen ? '0' : '-50px'
  };

  const traitAndDescriptionContainerStyle = {
    marginTop: '20px',
    paddingTop: '15px',
    display: 'flex',
    flexDirection: isSmallScreen ? 'column' : 'row',
    alignItems: isSmallScreen ? 'center' : 'flex-start',
  };

  return (
    <>
      {/* <div className="menubar">
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
      </div> */}


      <div style={pageContainerStyle}>
        {/* กล่องซ้าย */}
        <div style={contentBoxStyle}>
          <h2 className='trait_reroll_head' style={leftBoxHeadingStyle}>Trait Reroll</h2>
          <div className='boxtTrait_list' style={traitListItemContainerStyle}>
            {traitsData.map((trait, index) => (
              <div className='boxtTrait_item' key={index} style={traitListItemStyle}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%' // Ensure the row takes full width
                  }}>
                  <img
                    src={`/picture/reroll/${trait.imageName}`}
                    alt={trait.name}
                    className="Trait_logo"
                    style={{ width: '40px', height: '40px', marginRight: '10px' }} // Image on the left with some margin
                  />
                  <div
                    className={
                      mythicTraitNames.includes(trait.name) ? 'Mythic-text' :
                        goldenTraitNames.includes(trait.name) ? 'Golden-text' :
                          epicTraitNames.includes(trait.name) ? 'Epic-text' :
                            rareTraitNames.includes(trait.name) ? 'Rare-text' : ''
                    }
                    style={{ flexGrow: 1, textAlign: 'center' }}
                  > {/* Name takes available space and centers its text */}
                    {trait.name}
                  </div>
                  <div style={{ marginLeft: '10px', minWidth: '50px', textAlign: 'right' }}> {/* Percentage on the right with some margin and min-width for alignment */}
                    {trait.percentage}
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div style={buttonGroupContainerStyle}>
            <button
              className='animated-button-single'
              onClick={handleSingleReroll}
              style={{ padding: '10px 15px', flexGrow: 1, minWidth: '120px' }}
              disabled={isRerolling} // ปิดใช้งานปุ่มเมื่อกำลังสุ่ม
            >
              Single Reroll
            </button>

            {/* Group for "Reroll for Trait" button and select dropdown */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              flexGrow: 1,
              minWidth: '280px' /* minWidth for button + select + gap */
            }}>
              <button
                className='animated-button-reroll-for-trait'
                onClick={handleTraitReroll}
                style={{
                  padding: '10px 15px',
                  minWidth: '120px',
                  flexShrink: 0, /* Prevent button from shrinking too much */
                  backgroundColor: isRerolling ? '#cccccc' : '' // เปลี่ยนสีเมื่อกำลังสุ่ม
                }}
                disabled={isRerolling || !selectedTraitForReroll} // ปิดใช้งานปุ่มเมื่อกำลังสุ่มหรือยังไม่ได้เลือก trait
              >
                {isRerolling ? 'Searching...' : 'Reroll for Trait'}
              </button>
              <select
                className='animated-select'
                value={selectedTraitForReroll}
                onChange={(e) => setSelectedTraitForReroll(e.target.value)}
                style={{ padding: '10px 10px', width: '90px', minWidth: '100px', flexGrow: 1, textAlign: 'center' }}
                disabled={isRerolling} // ปิดใช้งาน select เมื่อกำลังสุ่ม
              >
                <option value="Mythic Trait">Mythic Trait</option>
                {traitsData.map(trait => (
                  <option key={trait.name} value={trait.name}>
                    {trait.name} ({trait.percentage})
                  </option>
                ))}
              </select>
            </div>

            <button
              className='animated-button-reset'
              onClick={handleResetReroll}
              style={{ padding: '10px 15px', flexGrow: 1, minWidth: '120px' }}
              disabled={isRerolling} // ปิดใช้งานปุ่มเมื่อกำลังสุ่ม
            >
              Reset
            </button>
          </div>
        </div>

        {/* กล่องขวา */}
        <div style={contentBoxStyle}>
          <h2 className='trait_reroll_head' style={rightBoxHeadingStyle}>
            Rerolls Spent: {rerollsSpent} {isRerolling}
          </h2>
          {rolledTrait && (
            <div style={{}}>
              <div style={traitAndDescriptionContainerStyle}>
                {/* Trait Section */}
                <div style={{
                  marginTop: '20px',
                  marginRight: isSmallScreen ? 'auto' : '20px',
                  marginLeft: isSmallScreen ? 'auto' : '100px',
                  textAlign: 'center',
                  marginBottom: isSmallScreen ? '20px' : '0'

                }}
                >
                  <p style={{ fontSize: '12px', textAlign: 'center', marginBottom: '5px' }}>Trait</p>
                  <img
                    src={`/picture/reroll/${rolledTrait.imageName}`}
                    alt={rolledTrait.name}
                    style={{
                      display: 'block', // จัดการรูปภาพเป็น block element
                      objectFit: 'contain', // ให้รูปภาพพอดีในกรอบโดยไม่บิดเบี้ยว
                      borderTop: '1px solid #7c7c7c',
                      width: '80px', // กำหนดความกว้างคงที่
                      height: '80px', // กำหนดความสูงคงที่
                      marginBottom: '5px' // ปรับระยะห่างด้านล่างเล็กน้อย
                    }}
                  />
                  <div className={
                    mythicTraitNames.includes(rolledTrait.name) ? 'Mythic-text' :
                      goldenTraitNames.includes(rolledTrait.name) ? 'Golden-text' :
                        epicTraitNames.includes(rolledTrait.name) ? 'Epic-text' :
                          rareTraitNames.includes(rolledTrait.name) ? 'Rare-text' : ''
                  }
                    style={{
                      fontSize: '14px',
                      width: '80px',
                      textAlign: 'center',
                      wordWrap: 'break-word',
                      margin: '0 auto',
                      minHeight: '38px', // กำหนดความสูงขั้นต่ำเพื่อรองรับประมาณ 2 บรรทัด
                      display: 'flex',       // ใช้ flexbox สำหรับการจัดตำแหน่ง
                      alignItems: 'center',  // จัดให้อยู่กึ่งกลางแนวตั้ง
                      justifyContent: 'center' // จัดให้อยู่กึ่งกลางแนวนอน (เสริม textAlign: 'center')
                    }}>
                    {rolledTrait.name} ({rolledTrait.percentage})
                  </div>
                </div>
                {/* Description Section */}
                <div style={{
                  marginTop: '20px',
                  flex: isSmallScreen ? '0 1 auto' : 1,
                  minWidth: 0,
                  marginLeft: isSmallScreen ? 'auto' : '50px',
                  marginRight: isSmallScreen ? 'auto' : '0',
                  width: isSmallScreen ? '90%' : 'auto',
                  textAlign: isSmallScreen ? 'center' : 'left'
                }}
                >
                  <p style={{ fontSize: '12px', textAlign: isSmallScreen ? 'center' : 'left', marginBottom: '5px', marginLeft: isSmallScreen ? '0' : '140px' }}>Description</p>
                  <div className={
                    mythicTraitNames.includes(rolledTrait.name) ? 'Mythic-text' :
                      goldenTraitNames.includes(rolledTrait.name) ? 'Golden-text' :
                        epicTraitNames.includes(rolledTrait.name) ? 'Epic-text' :
                          rareTraitNames.includes(rolledTrait.name) ? 'Rare-text' : ''
                   }
                    style={{
                      borderTop: '1px solid #7c7c7c',
                      fontSize: '14px',
                      maxWidth: isSmallScreen ? '100%' : '240px',
                      maxHeight: '120px',
                      minHeight: '120px',
                      overflowY: 'auto',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      padding: '5px',
                      marginLeft: isSmallScreen ? 'auto' : '50px',
                      marginRight: isSmallScreen ? 'auto' : '0',
                    }}>
                    {rolledTrait.description}
                  </div>
                </div>
              </div>
              {/* ส่วนแสดงผลประวัติรูปภาพ */}
              <div
                className='historybox_traits'
                style={{
                  display: 'flex', // จัดเรียงรูปภาพในแนวนอน
                  flexWrap: 'wrap', // อนุญาตให้ขึ้นบรรทัดใหม่ถ้าพื้นที่ไม่พอ
                  alignContent: 'flex-start', // เพิ่ม: จัดแถวให้ชิดด้านบนเสมอ
                  columnGap: '5px', // ระยะห่างแนวนอนระหว่างรูปภาพ
                  rowGap: '0px',    // ระยะห่างแนวตั้งระหว่างแถวเป็น 0 เพื่อให้ชิดกัน
                  marginTop: '15px', // ระยะห่างจากส่วน Description
                  borderTop: '1px solid #7c7c7c',
                }}>
                {rollHistory.slice(0, 275).map((traitItem, index) => (
                  <img
                    key={`${traitItem.name}-${index}`} // ใช้ key ที่ unique สำหรับแต่ละรูป
                    src={`/picture/reroll/${traitItem.imageName}`}
                    alt={traitItem.name}
                    style={{
                      objectFit: 'contain',
                      width: '20px',
                      height: '20px'
                    }}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
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
    </>
  )
}