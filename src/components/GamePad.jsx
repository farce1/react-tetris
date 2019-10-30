import React from 'react'

const GamePad = ({ stage, movePlayer, dropPlayer, playerRotate }) => (
  <div>
    <button onClick={movePlayer(-1)}>left</button>
    <button onClick={movePlayer(1)}>right</button>
    <button onClick={dropPlayer()}>down</button>
    <button onClick={playerRotate(stage, 1)}>rotate</button>
  </div>
)

export default GamePad
