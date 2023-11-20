import { Grid, GridItem, Text } from '@chakra-ui/react'
const ExampleTaskRow = () => {
	return (
		<>
			<Grid h="60px" templateColumns="3fr 1fr 1fr " borderBottom="1px solid black" borderTop="1px solid black">
				<GridItem ml={10} borderRight="1px solid black" display="flex" alignItems="center">
					<Text>Task Name</Text>
				</GridItem>
				<GridItem borderRight="1px solid black" display="flex" alignItems="center" justifyContent="center">
					<Text>Execiution Date</Text>
				</GridItem>

				<GridItem
					borderRight="1px solid black"
					display="flex"
					alignItems="center"
					justifyContent="flex-start"
					ml="20px">
					<Text>Priority</Text>
				</GridItem>
			</Grid>
		</>
	)
}

export default ExampleTaskRow
