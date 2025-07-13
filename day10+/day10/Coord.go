package day10

type Coord struct {
	X, Y int
}

type CoordDirection struct {
	coord     Coord
	direction string
}

func (c Coord) isSame(o Coord) bool {
	return c.X == o.X && c.Y == o.Y
}
func (c Coord) in(l []Coord) bool {
	for _, x := range l {
		if c.isSame(x) {
			return true
		}
	}
	return false
}

func (c Coord) get_all_surrounding_tiles(dMap Dessert) []CoordDirection {
	return c.get_all_surrounding_tiles_on_condition(dMap, func(letter string, dir string) bool { return true })
}

func (coord Coord) get_all_surrounding_tiles_on_condition(dMap Dessert, eval func(letter string, dir string) bool) []CoordDirection {
	var result = []CoordDirection{}
	//top left
	if coord.X > 0 && coord.Y > 0 && eval(dMap[coord.X-1][coord.Y-1], "TOP_LEFT") {
		result = append(result, CoordDirection{coord: Coord{X: coord.X - 1, Y: coord.Y - 1}, direction: "TOP_LEFT"})
	}
	//top
	if coord.X > 0 && eval(dMap[coord.X-1][coord.Y], "TOP") {
		result = append(result, CoordDirection{coord: Coord{X: coord.X - 1, Y: coord.Y}, direction: "TOP"})
	}
	//top right
	if coord.X > 0 && coord.Y < (len(dMap[0])-1) && eval(dMap[coord.X-1][coord.Y+1], "TOP_RIGHT") {
		result = append(result, CoordDirection{coord: Coord{X: coord.X - 1, Y: coord.Y + 1}, direction: "TOP_RIGHT"})
	}
	//right
	if coord.Y < (len(dMap[0])-1) && eval(dMap[coord.X][coord.Y+1], "RIGHT") {
		result = append(result, CoordDirection{coord: Coord{X: coord.X, Y: coord.Y + 1}, direction: "RIGHT"})
	}
	//bottom right
	if coord.X < (len(dMap)-1) && coord.Y < (len(dMap[0])-1) && eval(dMap[coord.X+1][coord.Y+1], "BOTTOM_RIGHT") {
		result = append(result, CoordDirection{coord: Coord{X: coord.X + 1, Y: coord.Y + 1}, direction: "BOTTOM_RIGHT"})
	}
	//bottom
	if coord.X < (len(dMap)-1) && eval(dMap[coord.X+1][coord.Y], "BOTTOM") {
		result = append(result, CoordDirection{coord: Coord{X: coord.X + 1, Y: coord.Y}, direction: "BOTTOM"})
	}
	//bottom left
	if coord.X < (len(dMap)-1) && coord.Y > 0 && eval(dMap[coord.X+1][coord.Y-1], "BOTTOM_LEFT") {
		result = append(result, CoordDirection{coord: Coord{X: coord.X + 1, Y: coord.Y - 1}, direction: "BOTTOM_LEFT"})
	}
	//left
	if coord.Y > 0 && eval(dMap[coord.X][coord.Y-1], "LEFT") {
		result = append(result, CoordDirection{coord: Coord{X: coord.X, Y: coord.Y - 1}, direction: "LEFT"})
	}
	return result
}
