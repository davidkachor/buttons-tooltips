import React from 'react'
import styled from 'styled-components'
import Button from './components/Button/Button'

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	height: 100vh;
`

function App() {
	return (
		<Container>
			<Button tooltip="asdasdasd">Button</Button>
			<Button tooltip='asdasdasd'>Button</Button>
			<Button tooltip='asdasdasd'>Button</Button>
			<Button tooltip='asdasdasd'>Button</Button>
			<Button tooltip='asdasdasd'>Button</Button>
			<Button tooltip='asdasdasd'>Button</Button>
			<Button tooltip='asdasdasd'>Button</Button>
			<Button tooltip='asdasdasd'>Button</Button>
			<Button tooltip='asdasdasd'>Button</Button>
		</Container>
	)
}

export default App
