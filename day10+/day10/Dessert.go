package day10

type Dessert [][]string

func (d Dessert) DeepCopy() Dessert {
	// Create a new Dessert with the same outer length
	copyDessert := make(Dessert, len(d))

	for i, innerSlice := range d {
		// Create a new inner slice with the same length
		newInner := make([]string, len(innerSlice))
		// Copy each string element
		copy(newInner, innerSlice)
		// Assign to the copied Dessert
		copyDessert[i] = newInner
	}

	return copyDessert
}

func (d Dessert) forEach(do func(x int, y int, letter string)) {
	for x := range d {
		for y := range d[x] {
			do(x, y, d[x][y])
		}
	}
}
