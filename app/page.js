'use client'

import { useState } from 'react'
import WaveBackground from '../components/WaveBackground'
import IntroFrame from '../components/IntroFrame'
import CaptchaChallenge from '../components/CaptchaChallenge'
import FinalFrame from '../components/FinalFrame'

const STAGES = {
  INTRO: 'intro',
  CAPTCHA: 'captcha',
  FINAL: 'final',
}

export default function Page() {
  const [stage, setStage] = useState(STAGES.INTRO)
  const [subtle, setSubtle] = useState(false)

  const handleIntroComplete = () => {
    setStage(STAGES.CAPTCHA)
  }

  const handleCaptchaComplete = () => {
    setSubtle(true)
    setStage(STAGES.FINAL)
  }

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <WaveBackground subtle={subtle} />

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        {stage === STAGES.INTRO && (
          <IntroFrame onComplete={handleIntroComplete} />
        )}

        {stage === STAGES.CAPTCHA && (
          <CaptchaChallenge onComplete={handleCaptchaComplete} />
        )}

        {stage === STAGES.FINAL && (
          <FinalFrame />
        )}
      </div>
    </div>
  )
}
