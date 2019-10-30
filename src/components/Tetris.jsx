import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import { createStage, checkCollision } from '../gameHelpers'
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'
import { useInterval } from '../hooks/useInterval'
import GamePad from './GamePad'

const dropInterval = 300

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
  const [stage, setStage] = useStage(player, resetPlayer)

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 })
    }
  }

  const startGame = () => {
    setStage(createStage())
    setDropTime(dropInterval)
    resetPlayer()
    setGameOver(false)
  }

  const drop = () => {
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
      if (player.pos.y < 1) {
        setGameOver(true)
        setDropTime(null)
      }
      updatePlayerPos({ x: 0, y: 0, collided: true })
    }
  }

  const dropPlayer = () => {
    setDropTime(null)
    drop()
  }

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(dropInterval)
      }
    }
  }

  const move = ({ keyCode }) => {
    switch (!gameOver) {
      case keyCode === 37:
        movePlayer(-1)
        break
      case keyCode === 39:
        movePlayer(1)
        break
      case keyCode === 40:
        dropPlayer()
        break
      case keyCode === 38:
        playerRotate(stage, 1)
        break
      default:
        break
    }
  }

  useInterval(() => drop(), dropTime)

  return (
    <StyledTetrisWrapper
      role='button'
      tabIndex='0'
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text='Game Over' />
          ) : (
            <div>
              <Display text='Score' />
              <Display text='Rows' />
              <Display text='Level' />
            </div>
          )}

          <StartButton onClick={startGame} />
        </aside>
        {isMobile && <GamePad movePlayer={movePlayer} dropPlayer={dropPlayer} stage={stage} playerRotate={playerRotate} />}
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris
