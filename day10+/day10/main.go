package day10

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

func main() {
	dMap := get_map("./complex.txt")
	var dPathed [][]string
	//part 1
	startingCoord := find_start(dMap)

	var poss = look_for_possibilities(dMap, startingCoord)
	for x := range poss {
		var closed, pathWalked = walk_pipe(dMap, startingCoord, poss[x], []Coord{})

		replace_S_with_fitting_symbol(startingCoord, pathWalked, dMap)
		pathWalked = append(pathWalked, startingCoord)
		fmt.Printf("pathwalked = %v\n , closed: %c", pathWalked, closed)
		fmt.Printf("farthest point: %v", len(pathWalked)/2)
		if closed {
			dPathed = dMap.DeepCopy()
			//replace path walked with b in a copy of the map, to make it easier
			//to replace everything not in path with dot
			replace_with_B(dPathed, pathWalked)
			replace_everything_not_B_with_dot(dMap, dPathed)
			break
		}
	}

	//profit ahh part 2
	print_map(dMap)
	print_map(dPathed)
	//write_result(dMap, "result_complex_before_expansion.txt")
	dMap_gapped := expand_map_and_mark_open_path_ways(dMap, dPathed)
	//write_result(dMap_gapped, "result_complex_before_flood.txt")
	flooded := open_the_floodgates(dMap_gapped)
	for flooded > 0 {
		flooded = open_the_floodgates(dMap_gapped)
		fmt.Println(flooded)
	}
	result := count_the_remaining_dots(dMap_gapped) / 9

	print_map(dMap_gapped)
	//write_result(dMap_gapped, "result_complex.txt")
	fmt.Println(" result: ", result)
}

func replace_S_with_fitting_symbol(startingCoord Coord, pathWalked []Coord, dMap Dessert) {
	first := getConnectingDirection(startingCoord, pathWalked[0])
	last := getConnectingDirection(startingCoord, pathWalked[len(pathWalked)-1])

	if (first == "TOP" && last == "BOTTOM") || (first == "BOTTOM" && last == "TOP") {
		dMap[startingCoord.X][startingCoord.Y] = "|"
	}
	//check L
	if (first == "TOP" && last == "RIGHT") || (first == "RIGHT" && last == "TOP") {
		dMap[startingCoord.X][startingCoord.Y] = "L"
	}
	//check F
	if (first == "BOTTOM" && last == "RIGHT") || (first == "RIGHT" && last == "BOTTOM") {
		dMap[startingCoord.X][startingCoord.Y] = "F"
	}
	//check 7
	if (first == "BOTTOM" && last == "LEFT") || (first == "LEFT" && last == "BOTTOM") {
		dMap[startingCoord.X][startingCoord.Y] = "7"
	}
	//check J
	if (first == "TOP" && last == "LEFT") || (first == "LEFT" && last == "TOP") {
		dMap[startingCoord.X][startingCoord.Y] = "J"
	}
	//check -
	if (first == "RIGHT" && last == "LEFT") || (first == "LEFT" && last == "RIGHT") {
		dMap[startingCoord.X][startingCoord.Y] = "-"
	}
}
func getConnectingDirection(src Coord, dst Coord) string {
	if dst.X < src.X {
		return "TOP"
	}
	if dst.X > src.X {
		return "BOTTOM"
	}

	if dst.Y < src.Y {
		return "LEFT"
	}
	if dst.Y > src.Y {
		return "RIGHT"
	}
	return ""
}

func expand_map_and_mark_open_path_ways(dMap Dessert, dPathed Dessert) Dessert {
	var d_map_gapped = [][]string{}
	for x := range dMap {
		//create three rows for each row to allow space for gaps
		d_map_gapped = append(d_map_gapped, make([]string, len(dMap[0])*3))
		d_map_gapped = append(d_map_gapped, make([]string, len(dMap[0])*3))
		d_map_gapped = append(d_map_gapped, make([]string, len(dMap[0])*3))

		for y := range dMap[x] {
			tile := Coord{X: x, Y: y}
			tilesDir := tile.get_all_surrounding_tiles_on_condition(
				dMap,
				get_is_canal_eval_function(tile, dMap))

			//fmt.Printf("x: %v, y: %v", x, y)
			//fmt.Printf("letter: %v", dMap[x][y])
			//fmt.Printf("tiles = %v\n", tilesDir)

			xe := x * 3
			ye := y * 3
			//fill all 4 tiles in gapped tile with B
			d_map_gapped[xe][ye] = dPathed[x][y]
			d_map_gapped[xe][ye+1] = dPathed[x][y]
			d_map_gapped[xe][ye+2] = dPathed[x][y]
			d_map_gapped[xe+1][ye] = dPathed[x][y]
			d_map_gapped[xe+1][ye+1] = dPathed[x][y]
			d_map_gapped[xe+1][ye+2] = dPathed[x][y]
			d_map_gapped[xe+2][ye] = dPathed[x][y]
			d_map_gapped[xe+2][ye+1] = dPathed[x][y]
			d_map_gapped[xe+2][ye+2] = dPathed[x][y]

			for _, dir := range tilesDir {
				switch dir.direction {
				case "TOP":
					d_map_gapped[xe][ye] = "G"
					d_map_gapped[xe][ye+1] = "G"
					d_map_gapped[xe][ye+2] = "G"
				case "BOTTOM":
					d_map_gapped[xe+2][ye] = "G"
					d_map_gapped[xe+2][ye+1] = "G"
					d_map_gapped[xe+2][ye+2] = "G"
				case "LEFT":
					d_map_gapped[xe][ye] = "G"
					d_map_gapped[xe+1][ye] = "G"
					d_map_gapped[xe+2][ye] = "G"
				case "RIGHT":
					d_map_gapped[xe][ye+2] = "G"
					d_map_gapped[xe+1][ye+2] = "G"
					d_map_gapped[xe+2][ye+2] = "G"
				}
			}
		}
	}

	return d_map_gapped
}
func open_the_floodgates(dMap Dessert) int {
	flooded := 0
	for x := range dMap {
		for y := range dMap[x] {
			if dMap[x][y] == "B" || dMap[x][y] == "0" || dMap[x][y] == "S" {
				continue
			}
			//start the flood from all corner non wall pieces
			if (x == 0 || y == 0 || x == (len(dMap)-1) || y == len(dMap[0])-1) && dMap[x][y] == "." {
				dMap[x][y] = "0"
			}
			tiles := Coord{X: x, Y: y}.get_all_surrounding_tiles(dMap)

			for _, tileDir := range tiles {
				var tile = tileDir.coord
				if dMap[tile.X][tile.Y] == "0" {
					dMap[x][y] = "0"
					flooded++
				}
			}
		}
	}
	return flooded
}

func get_is_canal_eval_function(coord Coord, dMap Dessert) func(string, string) bool {
	var required_top = []string{}
	var required_bottom = []string{}
	var required_left = []string{}
	var required_right = []string{}

	letter := dMap[coord.X][coord.Y]
	if letter == "|" {
		required_left = append(required_left, "L", "F", "|")
		required_right = append(required_right, "J", "7", "|")
	}
	if letter == "F" {
		required_left = append(required_left, "7", "J", "|")
		required_top = append(required_top, "-", "J", "L")
	}
	if letter == "7" {
		required_right = append(required_right, "L", "F", "|")
		required_top = append(required_top, "-", "J", "L")
	}
	if letter == "J" {
		required_right = append(required_right, "L", "F", "|")
		required_bottom = append(required_bottom, "-", "F", "7")
	}
	if letter == "L" {
		required_left = append(required_left, "7", "J", "|")
		required_bottom = append(required_bottom, "F", "7", "|")
	}
	if letter == "-" {
		required_top = append(required_left, "L", "J", "-")
		required_bottom = append(required_bottom, "F", "7", "-")
	}
	eval := func(surLetter string, direction string) bool {
		switch direction {
		case "TOP":
			for _, x := range required_top {
				if x == surLetter {
					return true
				}
			}
		case "BOTTOM":
			for _, x := range required_bottom {
				if x == surLetter {
					return true
				}
			}
		case "LEFT":
			for _, x := range required_left {
				if x == surLetter {
					return true
				}
			}
		case "RIGHT":
			for _, x := range required_right {
				if x == surLetter {
					return true
				}
			}
		default:
			return false
		}
		return false
	}
	return eval
}

func count_the_remaining_dots(dMap Dessert) int {
	count := 0
	for x := range dMap {
		for y := range dMap[x] {
			if dMap[x][y] == "." {
				count += 1
			}
		}
	}
	return count
}

func walk_pipe(dMap Dessert, startingCoord Coord, currentCoord Coord, walked []Coord) (bool, []Coord) {
	pos := look_for_possibilities(dMap, currentCoord)
	walked = append(walked, currentCoord)
	if len(pos) == 0 {
		return false, walked
	}
	for x := range pos {
		//fmt.Printf("currently on: %v: %v", currentCoord, dMap[currentCoord.X][currentCoord.Y])
		//fmt.Println("testing possibility: %v", pos[x])

		if pos[x].in(walked) {
			//fmt.Println("already walked")
			continue
		}
		if len(walked) > 1 && pos[x].isSame(startingCoord) {
			//fmt.Println("loop closed")
			return true, walked
		}
		//fmt.Println("continue walking")
		var tmpWalked = []Coord{}
		tmpWalked = append(tmpWalked, walked...)
		closed, wsf := walk_pipe(dMap, startingCoord, pos[x], tmpWalked)
		if closed {
			return true, wsf
		}
	}
	return false, walked
}

func replace_everything_not_B_with_dot(dMap Dessert, dPathed Dessert) {
	dMap.forEach(func(x int, y int, letter string) {
		if dPathed[x][y] != "B" && dMap[x][y] != "S" && dMap[x][y] != "." {
			dMap[x][y] = "."
			dPathed[x][y] = "."
		}
	})
}
func print_map(dMap Dessert) {
	for x := range dMap {
		for y := range dMap[x] {
			fmt.Print(dMap[x][y])
		}
		fmt.Println()
	}
}
func replace_with_B(dMap Dessert, pathWalked []Coord) {
	for x := range pathWalked {
		dMap[pathWalked[x].X][pathWalked[x].Y] = "B"
	}
}
func look_for_possibilities(dMap Dessert, startingCoord Coord) []Coord {
	var next = []Coord{}
	startingSymbol := dMap[startingCoord.X][startingCoord.Y]
	if startingCoord.X > 0 {
		var top = dMap[startingCoord.X-1][startingCoord.Y]
		if top == "|" || top == "7" || top == "F" ||
			(top == "S" && (startingSymbol == "|" || startingSymbol == "7" || startingSymbol == "F")) {
			next = append(next, Coord{startingCoord.X - 1, startingCoord.Y})
		}
	}
	if startingCoord.Y > 0 {
		var left = dMap[startingCoord.X][startingCoord.Y-1]
		if left == "-" || left == "L" || left == "F" ||
			(left == "S" && (startingSymbol == "-" || startingSymbol == "7" || startingSymbol == "J")) {
			next = append(next, Coord{startingCoord.X, startingCoord.Y - 1})
		}
	}
	if startingCoord.X < (len(dMap) - 1) {
		var bottom = dMap[startingCoord.X+1][startingCoord.Y]
		if bottom == "|" || bottom == "L" || bottom == "J" ||
			(bottom == "S" && (startingSymbol == "|" || startingSymbol == "7" || startingSymbol == "F")) {
			next = append(next, Coord{startingCoord.X + 1, startingCoord.Y})
		}
	}
	if startingCoord.Y < (len(dMap[0]) - 1) {
		var right = dMap[startingCoord.X][startingCoord.Y+1]
		if right == "-" || right == "7" || right == "J" ||
			(right == "S" && (startingSymbol == "-" || startingSymbol == "L" || startingSymbol == "F")) {
			next = append(next, Coord{startingCoord.X, startingCoord.Y + 1})
		}
	}
	return next
}
func find_start(dMap Dessert) Coord {
	for x := range dMap {
		for y := range dMap[x] {
			if dMap[x][y] == "S" {
				return Coord{x, y}
			}
		}
	}

	log.Fatal("no start found")
	return Coord{}
}

func get_map(path string) Dessert {
	var d_map Dessert
	d_map = [][]string{}
	file, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	counter := 0
	for scanner.Scan() {
		line := scanner.Text()
		d_map = append(d_map, strings.Split(line, ""))
		counter = counter + 1
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

	return d_map
}

func write_result(dMap Dessert, path string) {
	f, err := os.Create(path)
	if err != nil {
		log.Fatal(err)
	}
	for x := range dMap {
		l, err := f.WriteString(strings.Join(dMap[x], "") + "\n")
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(l, "bytes written successfully")
	}
	f.Close()
}
