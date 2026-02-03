'use client'

import { useState } from 'react'
import WaveBackground from '../components/WaveBackground'
import IntroFrame from '../components/IntroFrame'
import WalkingTransition from '../components/WalkingTransition'
import CaptchaChallenge from '../components/CaptchaChallenge'
import FinalFrame from '../components/FinalFrame'

const STAGES = {
  INTRO: 'intro',
  WALK_1: 'walk1',
  CAPTCHA: 'captcha',
  WALK_2: 'walk2',
  FINAL: 'final',
}

export default function Page() {
  const [stage, setStage] = useState(STAGES.INTRO)
  const [subtle, setSubtle] = useState(false)

  const handleIntroComplete = () => {
    setStage(STAGES.WALK_1)
  }

  const handleWalk1Complete = () => {
    setStage(STAGES.CAPTCHA)
  }

  const handleCaptchaComplete = () => {
    setStage(STAGES.WALK_2)
  }

  const handleWalk2Complete = () => {
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

        {stage === STAGES.WALK_1 && (
          <WalkingTransition onComplete={handleWalk1Complete} />
        )}

        {stage === STAGES.CAPTCHA && (
          <CaptchaChallenge onComplete={handleCaptchaComplete} />
        )}

        {stage === STAGES.WALK_2 && (
          <WalkingTransition onComplete={handleWalk2Complete} />
        )}

        {stage === STAGES.FINAL && (
          <FinalFrame />
        )}
      </div>
    </div>
  )
}
