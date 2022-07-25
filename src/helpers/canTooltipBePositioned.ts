import Position from '../types/position'

type CanTooltipBePositioned = (
	buttonDOMRect: DOMRect,
	tooltipDOMRect: DOMRect,
	position: Position
) => boolean

const canTooltipBePositioned: CanTooltipBePositioned = (
	buttonDOMRect,
	tooltipDOMRect,
	position
) => {
	switch (position) {
		default:
			return false
		case 'top':
			return buttonDOMRect.top >= tooltipDOMRect.height
		case 'right':
			return window.innerWidth - (buttonDOMRect.x + buttonDOMRect.width) >=
				tooltipDOMRect.width
		case 'left':
			return buttonDOMRect.left >= tooltipDOMRect.width
		case 'bottom':
			return buttonDOMRect.bottom >= tooltipDOMRect.height
	}
}

export default canTooltipBePositioned
