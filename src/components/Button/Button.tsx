import React, {  useLayoutEffect, useRef, useState } from 'react'
import Position from '../../types/position'
import styled from 'styled-components'
import ToolTip from './Tooltip/Tooltip'
import canTooltipBePositioned from '../../helpers/canTooltipBePositioned'

const StyledButton = styled.button`
	padding: 10px;
	font-size: 20px;
	cursor: pointer;
	position: relative;
	width: 150px;
	height: 70px;
	border-radius: 20px;

	& .tooltip {
		visibility: hidden;
	}
	&:hover .tooltip {
		visibility: visible;
	}
`

const Button: React.FC<{
	children?: React.ReactNode
	onClick?: React.EventHandler<any>
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	className?: string
	tooltipText?: string
	tooltipPositions?: Position[]
}> = props => {
	const button = useRef<HTMLButtonElement>(null)
	const tooltip = useRef<HTMLDivElement>(null)
	const [buttonDOMRect, setButtonDOMRect] = useState<null | DOMRect>(null)
	const [tooltipDOMRect, setTooltipDOMRect] = useState<null | DOMRect>(null)
	const [position, setPosition] = useState<Position>(
		!!props.tooltipPositions ? props.tooltipPositions[0] : 'top'
	)


	useLayoutEffect(() => {
		if (button.current !== null)
			setButtonDOMRect(button.current.getBoundingClientRect())
		if (tooltip.current !== null)
			setTooltipDOMRect(tooltip.current.getBoundingClientRect())
	}, [button, tooltip])

	useLayoutEffect(() => {
		const resizeHandler = () => {
			if (button.current !== null && tooltip.current !== null) {
				setButtonDOMRect(button.current.getBoundingClientRect())
				setTooltipDOMRect(tooltip.current.getBoundingClientRect())
			}
		}

		window.addEventListener('resize', resizeHandler)
		return () => window.removeEventListener('resize', resizeHandler)
	}, [])

	useLayoutEffect(() => {
		if (buttonDOMRect === null || tooltipDOMRect === null) return

		const positionChecking = canTooltipBePositioned.bind(
			null,
			buttonDOMRect,
			tooltipDOMRect
		)

		if (!props.tooltipPositions) {
			if (positionChecking('top')) {
				setPosition('top')
			} else if (positionChecking('right')) {
				setPosition('right')
			} else if (positionChecking('left')) {
				setPosition('left')
			} else setPosition('bottom')
		} else {
			for (const item of props.tooltipPositions) {
				if (
					positionChecking(item) ||
					props.tooltipPositions.indexOf(item) ===
						props.tooltipPositions.length - 1
				) {
					setPosition(item)
					break
				}
			}
		}
	}, [buttonDOMRect, props.tooltipPositions, tooltipDOMRect])

	return (
		<StyledButton ref={button} onClick={props.onClick} type={props.type}>
			{props.children}
			{!!props.tooltipText && (
				<ToolTip
					className="tooltip"
					ref={tooltip}
					position={position}
					text={props.tooltipText}
				/>
			)}
		</StyledButton>
	)
}

export default Button
