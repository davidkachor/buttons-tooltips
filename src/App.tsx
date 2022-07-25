import React from 'react'
import styled from 'styled-components'
import Button from './components/Button/Button'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100vh;
`
const Row = styled.div`
	display: flex;
	justify-content: space-between;
`

function App() {
	return (
		<Container>
			<Row>
				<Button tooltipText="asdasdasd" tooltipPositions={['bottom', 'top']}>
					Button
				</Button>
				<Button tooltipText="asdasdasd">Button</Button>
				<Button tooltipText="asdasdasd" tooltipPositions={['bottom', 'right']}>
					Button
				</Button>
			</Row>
			<Row>
				<Button tooltipText="asdasdasd">Button</Button>
				<Button tooltipText="asdasdasd" tooltipPositions={['right', 'left']}>
					Button
				</Button>
				<Button tooltipText="asdasdasd">Button</Button>
			</Row>
			<Row>
				<Button
					tooltipText="asdasdasd"
					tooltipPositions={['left', 'top', 'right']}
				>
					Button
				</Button>
				<Button tooltipText="asdasdasd">Button</Button>
				<Button tooltipText="asdasdasd">Button</Button>
			</Row>{' '}
		</Container>
	)
}

export default App
