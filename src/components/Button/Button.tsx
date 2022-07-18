import React, {
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	useTransition,
} from 'react'
import styled from 'styled-components'
import ToolTip from './Tooltip/Tooltip'

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
	tooltip?: string
}> = props => {
	const button = useRef<HTMLButtonElement>(null)
	const tooltip = useRef<HTMLDivElement>(null)
	const [buttonDOMRect, setButtonDOMRect] = useState<null | DOMRect>(null)
	const [tooltipDOMRect, setTooltipDOMRect] = useState<null | DOMRect>(null)
	const [windowSize, setWindowSize] = useState<null | {
		width: number
		height: number
	}>(null)
	const [position, setPosition] = useState<'top' | 'bottom' | 'right' | 'left'>(
		'top'
	)
	const [pending, startTransition] = useTransition()

	// console.log('button', buttonDOMRect)
	// console.log('tooltip', tooltipDOMRect)
	useEffect(() => {
		if (!windowSize)
			setWindowSize({ width: window.innerWidth, height: window.innerHeight })

		const resizeHandler = () =>
			startTransition(() =>
				setWindowSize({ width: window.innerWidth, height: window.innerHeight })
			)

		window.addEventListener('resize', resizeHandler)
		return () => window.removeEventListener('resize', resizeHandler)
	}, [windowSize])

	useLayoutEffect(() => {
		if (button.current !== null)
			setButtonDOMRect(button.current.getBoundingClientRect())
		if (tooltip.current !== null)
			setTooltipDOMRect(tooltip.current.getBoundingClientRect())
	}, [button, tooltip])

	useEffect(() => {
		if (
			buttonDOMRect === null ||
			tooltipDOMRect === null ||
			windowSize === null
		)
			return
		if (buttonDOMRect.y >= tooltipDOMRect.height) {
			setPosition('top')
		} else if (buttonDOMRect.x >= tooltipDOMRect.width) {
			setPosition('left')
		} else if (
			windowSize.width - (buttonDOMRect.x + buttonDOMRect.width) >=
			tooltipDOMRect.width
		) {
			setPosition('right')
		} else setPosition('bottom')
	}, [buttonDOMRect, tooltipDOMRect, windowSize])

	return (
		<StyledButton ref={button} onClick={props.onClick} type={props.type}>
			{props.children}
			{!!props.tooltip && (
				<ToolTip
					className="tooltip"
					ref={tooltip}
					position={position}
					text={props.tooltip}
				/>
			)}
		</StyledButton>
	)
}

export default Button
