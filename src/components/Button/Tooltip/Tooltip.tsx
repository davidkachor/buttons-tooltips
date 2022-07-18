import React from 'react'
import styled from 'styled-components'

const StyledTooltip = styled.div`
	border: solid grey 1px;
	display: inline-block;
	position: absolute;
	background-color: white;
	padding: 10px;
	max-width: 300px;
	overflow-wrap: break-word;
	font-size: 15px;
	border-radius: 2px;
	align-content: baseline;
	z-index: 10;
	&.bottom {
		bottom: calc(-50% - 10px);
		left: 0;
	}
	&.top {
		top: calc(-50% - 10px);
		left: 0;
	}
	&.right {
		right: calc(-60% - 10px);
	}
	&.left {
		left: calc(-60% - 10px);
	}
`

const ToolTip = React.forwardRef<
	HTMLDivElement,
	{
		text: string
		position: 'top' | 'right' | 'bottom' | 'left'
		className?: string
	}
>((props, ref) => {
	return (
		<StyledTooltip ref={ref} className={`${props.position} ${props.className}`}>
			{props.text}
		</StyledTooltip>
	)
})

export default ToolTip
