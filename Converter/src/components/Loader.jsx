import React from 'react'
import { Audio, BallTriangle, Circles, Grid, Oval, Rings, TailSpin, ThreeDots } from 'react-loader-spinner'
const Loader = () => {
  return (
    <div>
        <ThreeDots height="100" width="100" color="red" ariaLabel="Loading" />
    </div>
  )
}

export default Loader