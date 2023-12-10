import { useState } from "react";
// next location {x: 88, y: 18} FJ|7FJL|F-J|||FJ7L||7F7|
// issue is 89 7 der 7ner
const DATA = `L-77.L-J7F.-7FFF77.F7-|7.7-F-7L--|-|-7-F|FL7FF|.7FF-L7LFJ77-J--|.F7.-FF--77..FLJ7.FFF.|7FF--F--7-.|J.FFJ-7.F-7-|-7F77..77L-L-|.F-7-|-F--L7F-
LFL-L.F--|-JF-L-7-L7JLL|-J.-.-7J.L7J.7F7--.|L7|.F-L--7.F|777L.-J7LJF-77J-L7F-L.FL.FFJ.FJJF||||J.F|.|7.J-F|7F.LLJ.LL-J7F|F|..FF7-7|.LLF7FFL7J
|FJ.F-JF.||J|7J-|7L|F-7J|J-L|-----JL|||JJ-JJFL-.J7.LJ|-LJL-JL-.F|7||7||.|F|.7|.L7F7||F|-LFJ-L-77|JF7-L-F7L-.F7JFL.|..FFF|--77L|-J7JF7J||JLLJ
-|.F|J7L-7J-|||7L7J.7L7JJL.L|||-J---L7--7.|F7J7.FJ7-F7|L7..|L||.-|7|.FJFJFFJLF-7F|LF77JLLLLJ|.F-7-7.LL7.F7F-JF77-L7-LL-F||.F--|7-L|LJ-JLLF|.
LLL-JFJ.F|7FL77-7-JLL.|-JFFFF7|7777FL|.|JFFF.F|FJJFFJ|-F.J.F---7L77--L.LL|J..|LL777|L7-F7||-JFL-JLJFF7F-JL77-|L|..|..|L-J-FJL-||F7-J7.|.|FJJ
LFFLF--|-J7JLLJFJ7.FJ-|L-F7.L-J7--|7.L.|7--JFFJFJF-JFJJ|7LLJ7J.|-F77J.FJ||.7FJ-.|L|JFF7|J7.|.|.FFJFF||L7F-J7-|F|7FL.-F.L7-FFJ-L-JLJFF-J-J|F.
FLL-7.F|J||FJLJFLL--J.L7LLJ7.LLL7FJFLJ7.7---JJFF.L-7L-7-7.|LL-FJFJL--77F|F-7-JJ.|.LF-JL77F7LFL-F-7F7||FJL7J||.FLL7J7LL-J.L|..FLJ-F7|7J77L|LF
|..LJ77|.FJ77L-7J7||7L.77.F|7.|FL|L|J-|7|||L|7|F7F7L7FJFF777|7LJ|F7F-J7FJJJ.L|.F|FJL-7FJF7J7F7LL7LJLJLJF7L-7-FJ|L-J.L-7FJ.---F..L|LL-7J7||.F
F7-7JL|LLJJL--J.|L7J7L7L|F|-|.||7L-L7FF||FF7JF7||||F||FFJL-7-|..LJ||F7F-7JJ|7F7-7F-7FJL7||-|.-JFL----7FJL--JF-7JJJ7L7L|7.F|L--77.|7.L--7|L||
FJJL7LL7|LL-J.|F7J|LFJJF--JF-7FF7--J||.F7FJ|FJ|||||FJL7L7F-JF-7FJFJLJ|L7|-|FFJ|LLL7||F-J||-FFJ-F7F7F7||F7LF7|FJJ7FJ-||.LF-7J-|LL7JLLJ|LLFJL7
|FF-|7L|--F7..-L7.--JJF||L-F|-F|L77FL77||L7LJFJ||||L7FJFJL7|-LFF-JF--JFJ|77FJFJ|LFJLJ|F7|L7F7|.|||||||||L7|||L---7-FLF7FL.L7FF-LF.|7.|J||7-L
7-L-L|7|..LL-7|..|7FFJFLLJ.F-7FJFJ7.||-|L-JF7|FJLJL7|L-JF-J7|F7L-7L--7L7L7FJFJ|7FL7F7LJ||FJ|L7FJLJLJ||||FJ|||F---JL7.LF||F-7-7----F-JJ.7LJFJ
FF7FJJF--7|JF|F-..L|.FLFJ7F|FJL7||L7F7.L--7|LJL--7FJL7F7L--7FJL-7|F--JFJFJL7|F7F7LLJL-7|||FJFJL-7F-7LJ||L7|LJL7.|--L---LJJ.FJJ.LL-J.|.F--7L.
J.FJ|7F-.F7FL7-|7|LL7FF|FF7|L7FJL7FF7F7F--JL-7JF-J|-FJ|L---JL--7LJ|F7.L7L7FJ||||L-7LF-J|||L7L7F7LJLL7FJL7LJF-7L7|.J.L--LJL-J.|L-L-L---|..J|7
F|J7.F|LFFJJ7|7L-JFJ|J-J-|||FJL7FJFJ||LJF---7L7L-7L7L7L---7LF77L-7|||F7|FJ|FJ|||F-JJL-7LJ|FJFJ||FF7FJ|F-JF-JFJFJF7F7-|J|77L|-77.|F-7L7|--F|7
-7||.|||L||7LJ-|FFF7JJ.LFJLJL7FJL7|FJL--JF--JFJF7|FJ-|F---JFJL---J||||LJL7||J||||F7-F7|F-JL7|FJL7||L7||F-JF7L-JFJL7|FF7-JLF|-77.F--J7-J7F---
|JFLL-J7.L--77LLF7LLFF7.L---7||F-J|L-7F-7L-7FJFJ|||F7||F7F7L-7F--7LJ||F--J||FJLJ|||FJ|||F7FJLJF-J|L7|||L7FJL-7FJF7|J-|L|LFF77F7JJJLL|7-F7FF|
L7|LLF--7LJ.J--L-JF.|JF7F7F-JLJ|F7|F-JL7|F7|L7L7LJLJLJLJLJL7-LJF7L-7LJL7F7||L-7FJ||L7LJLJ||F-7|F7L7||||FJ|F--J|FJLJLLF7J-FJL-J|F|7|-77.--J-F
L7|L||FLL.|L|F7.LLF-7F||||L--7FJ|||L7F7|LJLJFJJL7F7F7F7F7F-JF-7||F-JF--J|||L7L||FJ|LL--7FJ||JLJ|L7||||||L||F7FJL---7F|||7|F---JF7JJ7L|-L7F7|
FLL.FL7JF77LJ7LJ7-L-J-|LJL-7.||.|||FJ||L--7FJF-7LJ||LJLJLJF-JFJ||L-7L--7||L7|FJ|L7L--7FJSFJL-7FL7||LJLJL7||||L7F---JFJL7FJ|-F7FJ|JL|7|.|-J.|
F.L-F-JLJ--7J|7||F--7FL---7|FJ|FJLJL7|L---JL7L7|F-J|F---7|L-7L7||F7L7F-J|L7||L7L7|F--JL7|L7F-JF7||L7F7F-J||||FJL---7L-7||FJFJLJFJF-F-7-.J7FL
L.|||||.|7LF-L--FJFLLF7F-7||L7|L7F--JL-7F--7L7|LJF-J|F--JF-7L7||LJ|7||F7|FJ|||L7LJL7F7FJL-JL7FJLJ||||LJF7||||L7F---J7.||||FJF--JLL7|.J.|FF-J
FJ7L-J7-LJLF7|JLL77J7||L7LJ|FJ|FJL-7F-7LJF7|FJL-7L-7||F-7L7|J||L-7|FJ|||||.||F7L--7||||F----JL--7|FJL7FJ|||||FJL-7F-7FJ||LJFJF7-F-|-7|-||LJ.
|J|J-|JLL|||FL-LLF7FFJ|.L-7LJFJL7F-JL7L7FJLJ|-F7|F7LJLJFJFJL7|L-7||L7|||||FJ|||FF7|||||L--7F----J||F7|L7||||||F--JL7LJFJ|F7|L||7|.|.|..LJLLJ
LFJF-|.F7-LLF.FF7F7FL7L7F7L-7L7|||F7FJFJL7F-JFJ|||L----JFJF-J|F7LJ|||LJ|||L7LJL-JLJLJLJF--JL--7F7|||LJFJLJ||LJL--7FJF-JFLJ|L7||F7-FJJ.FL-77|
.F|7L7-FJLFL|-F|LJL7F|FJ||F7|FJFJ|||L7L-7||F7L7LJ|F-7F7FJFJF7LJL-7L7L7FJ||.L-7F-7F--7F-JF----7LJ|||L7FJF--JL7F---JL7|.F-7FJFJ|LJL-7J--F|LF-|
F.||.J-|7FFF--||F-7|FJL-JLJLJL7L7|||J|F-J|||L7L-7LJFJ||L7|.||F-7FJFJ7||7||F-7LJLLJF-J|F-JF---JLFJ|L7LJFJF7F-JL-7F7FJL7|FJL7|LL7F--JL|.L-.L-|
L-J|-|FL|F|.L7FLJJ||L----7F-7FJFJ|||FJL7FJ||FJ.FJF-JFJL7|L7|||FJ|FJF7||FJ||FJF-7F7L-7||F7|F7F7FJFJ.|F-JFJ|L7F--J||L7FJ||L||L-7||F7|F-7J|-LF.
.|.-J|7.-L|FF-7.LL|||F7F7LJFJL7L7LJLJF-JL7||L7FJFJ7FJF-JL7|||||FJL7|LJLJFJ|||L7|||F-JLJ|LJ|||||FJF7||F7|FJFJ|F7FJL7|L7|L7FJF7LJLJL-7.|.LJJJ|
FJ.LF77-L7|.L7L7|FJL-J|||7FJF7L7L---7|F7FJ|L7||FJF7L7L-7.|||LJ|L7FJL--7FJ.|L7FJ|||L-7F-JF7|LJ|||FJ||LJLJL7L7|||L7FJ|FJL7||FJL------J7F-JFF77
F-L-FJ7.L|.-LL7L7L---7||L7L-JL7|-F7F||||L7|7|LJL-J|FL7FJFJ|L-7|FJL-7F-J|F7L7|L7|||7FJ|F7||L-7|||L7||F----JF|LJ|FJ|FJL--JLJL-----7JF77J|--7LJ
.||.7-JJ||7-J|L7L-7F7|LJFJF7FL|L7||FJLJL-JL7L-7F-7L7FJL7|FJFFJ|L-7FJL-7|||FJL7|||L-JFJ||||F-J|||FJ||L7F7F--JF-J|FJ|F---------7F7L-J|LLJ7JF7|
-JJ.L|FF7||.LJ-|F7LJ|L-7|FJL7FJFJ||L------7|.FJL7|FJL-7|||F7L7||FJL7-FJLJ||F-J||L-7FJ-||||L-7|||L7|L7|||L--7L-7|L-JL--------7||L---J777FF.LJ
|JL77FL|-J--JJFLJL-7L--JLJF-JL7L7|L7F-7F7FJ|FJF-JLJF-7|||LJ|FJL7L-7L7|F--J||F7|L7FJL7FJ||L7FJ||L7|L-JLJ|F7||F-J|F--7F7F-7F7FJLJF7||L|L7JJF.|
J|F|7JL..|L|7F----7L7F---7|LF7L7||FJ|FJ||L7|L7|F7F7L7|||L7FJL7FJF7|FJ||F7F||||L7||F-JL7||FJL7||FJ|F----J||FJ|F-JL-7LJ|L7|||L---JL-7.|.||.L|7
LFJ.|7|.FF-F7L---7|FLJF--JL-JL-JLJ|FJL7|L7|L7||||||FJ|||FJL-7||FJ||L7|||L7|||L7|LJL7F-J|||F7|||L7|L7F--7||L7|L7F--JF7L-J|||F---7F7|J|FL77F77
LJLF-J-F--FJ|F7F-JL---JF---------7|L-7||FJ|FJ||||||L7||||F--J||L7LJFJ|||FJ|||FJL-7.|L-7||LJLJ||-LJJ||F7LJL-J|FJL---JL--7|||L--7||||.|FLJJ||F
FLF77.F.7-L7LJLJF-7F7F7L7F-------JL--JLJL-JL7|LJ|||FJ||||L7F7||FJF7|FJ|||FJ||L7F-JFJF7||L-7F-JL-7F-J||L----7LJF7F7F---7|||L7F-J||LJ.--JLFJLL
--7.F.L7|LLL7F7FJ-LJLJL-JL--7F7F7F-7F--7F---JL7FJ||L7|||L7LJ|||L-J|||FJ|||L|||||F-JFJ|||F7|L-7F-J|F7||F7F7FL-7|LJLJLF7LJLJ.|L-7||JJ.LL-JL-JJ
L7|FF-|7.LFF||||F-7F----7.F7LJLJLJ.LJF-JL7F7F7||FJ|FJ|||FJF7|||F7FJ||L7|||FJL7LJL7FJ7LJ||||F-JL-7||||LJLJL--7|L-----JL7FF7F|F7|LJJJ7.|.-FJ|.
||-LL7L7--F-J|||L7LJF--7L-JL----7F7F7|F7J||||||||FJL7||||7|LJ|LJ|L7|L7LJLJ|F7|F--JL--7FJ|LJL7F--JLJ||F------J|F------7L-JL7LJLJJ7F.JJ--|JLJ7
FF7FL|.|.FL--J|L7L--JF7L-7F----7||LJ|LJL7||||LJ||L7FJ||||FJF7L7.|FJL7|-F7FJ|||L--7F--JL7L7F-JL----7||L-7F--77|L-77F-7|F--7L-7|..L|7LJ-F7J|L-
FJL-.7F-7-F---JFJF--7||F7LJF-7FJLJF7L---JLJ||F-JL7LJFLJLJL7|L7L7LJF7LJFJLJFJLJF--J|F7LFJFJL--7F-7FJ|L77LJF7L7L-7L-JFJ||F7|F-J7-|.LFJF-J||L7L
JJ|L-JL.L7L----JJL-7||LJL-7L7|L---JL------7LJL7F7L-------7|L7L7L7L||F-JF-7|F7FJF-7LJL7L7L7F--J||LJ|L-JF--JL-JLFJF7FJLLJ||LJFF7LF7-|-J|.F||-J
J7LJ7LLFJL.|F|F--7|||L7F-7L-JL---7JF------JF--J|L7F7F----JL7L7L7L7||L--JFJLJ|L7|FJF--JFJFJ|F-7|F7F7F--JF-7F--7|FJLJF7LFJL7F-JL-JL-7JF|J--77.
.|||7|||-|--LFJF-JFJL7LJJL----7F7L-J|F----7L--7|J|||L----7FJFJLL7LJ|-F-7|F7FJFJ|L7L--7L7|FJ|FJ|||||L--7L7LJF-JLJ|F7||FJF7||F------J7-7--7||.
LL77-JJ-.L7.LL7|-FJF7L----7F--J|L----JF7F7L7FFJ|FJ|L-7F--J|FJ-F7|F7L-JFJ|||L7L7|FL7F7L7LJL7|L-J|LJL--7L-JF7L-7F--JLJLJFJLJ|L7F--7.F77-7-F|F7
|-L-7.LJ-LFFF-JL-JFJL7F--7|L---JF---7FJLJL7|FJFJL7L7FJL--7LJF7||LJ|F--J7|||FJ|LJF7||L7L7F-J|F7JL-7F--JF7FJL--JL7F---7FJF7L|FJ|F-JFJ|JFL-|-LJ
|J|LJ-J.F-LFJF7F-7L-7LJF-J|F---7L--7|L7F-7|||FJ|7|FJL-7F-JF7||||F-JL---7LJ|L7F--JLJL7|FJ|F-J|L7F7|L7F7||L---7.FJL--7|L-JL-JL-JL-7|FJ77|L|7J|
F7F77|7|J.LL-JLJFJF-JF7L-7|L-7FJF7J|L7LJFJ|||L-7FJL-7FJL-7|LJLJ|L-7F--7L-7|FJL-7F7F-J|||LJF7L7LJ||FJ|||L---7L-JF7F7||F7F--7F7F-7LJ|F77..L-.7
L|77--L77|..F---JFJF-JL--JL7FJL-JL7|J|F-J|LJL7FJL7F-JL7F-JL7F-7L--JL-7|F7||L7FFJ|||F-J|F--JL-JF7||L-JLJF--7L---JLJLJLJLJF7||LJFL7FJ|L---7J.J
|LJ.7.LLL|-F|F7F7|FL------7LJF---7|L7|L--7|F7LJF-JL--7|L-7FJ|7L--7F7FJLJLJL-JFJFJ|||F7|L7F7F--J|LJF--7FJ|FJF-----------7|||L--7FJL-JF-7FJ7-J
|JLFFL7L--7|||LJLJF7F7F7F7L-7|F--JL-JL---JFJL7LL-----JL7FJL7L7F7FJ||L---7F--7L-J|LJLJLJFLJLJF--JF7|F-JL7FJFJF7F-7F7F--7LJ|L-7FJL-7F7|FJ|-F7|
|L--J7|-7.FF||F---JLJ||LJ|F-J|L-------7F7|L7FJF-----7F7|L7FJFJ|LJFJL-7F7LJF7L-7F--7F7F-----7L7F7|||L7F-JL-JFJLJ-LJ|L-7|F7L-7LJF7FLJLJ|FJF||L
|F|L-J|FF-FFLJL7F---7|L-7LJF7|F-------J||F-J|FJF---7LJ|L7|L-JFJF7L-7-|||F-JL--J|F7|||L----7L-J|||||-||F---7L-----7L-7||||F-JF7||F---7|L77--J
--L-J-FFJFL|7|FLJ-F-JL--JF-JLJL--------JLJF-JL7L--7|F7L7|L--7L7||F-JFJ||L--7F7|LJ|LJ|FF7F7L---J||LJFJ|L--7|F-7F-7L-7|||||L--JLJLJF--J|FJ7|F7
|.|-|JF|L|.|FF---7L------JF7F-----------7FJF77|F--J||L-JL---JF|||L7||FJL-7FJ||F--JF7L-JLJL-----JL7FJFJF--JLJL|L7L7FJ|||||F-7F7F7FJF-7|L7J-|-
LFF---||..-L-L7F7L--------JLJF7F7F-----7|L-JL-JL--7LJF----7F7FJ||FJFJL-7FJL7||L--7|L-7F--7F-7F-7FJL7|7L-----7L-JLLJ-||LJLJ||||||L-JFJL-JJFLJ
F-J--JL77.|JJLLJL---7F7F--7F7|LJLJF----JL7F-7F-7F-JF7|F---J|LJFJLJFJF--JL-7LJL7F-J|FFJ|F7||FJ|FJL-7LJF7F----J-F7F7F7LJ-F7F7LJ|||F7FJ7|J|.7F-
||LJ--FLF-J.|J|.FF7FJ|LJF7LJ||F--7L-----7||L||-||F7|||L7F7FJF7L--7L-JFF--7|F7FJL-7|FJFJ|LJ|L7|L7F7|F-J|L------JLJLJL7.FJLJL-7||||LJLJJ---JLJ
F-L7F-|-J.|FF---7||L-JF-J|F7LJL-7L------J|L7|L7|LJ|||L7LJ|L7||F-7L-7.LL-7LJ|LJF--J|L7||L7FJJLJFJ|||L-7L-------7F----JFJF--7FJLJLJJJ7J7|L-7|.
7--|7L|.LF7-L--7LJL--7|F7LJL7F77L-------7|FJL-JL--J|L-JF7L7||||J|F-J7||L|F7L7.L7F7|FJ|F-JL-7F-JFJLJF7|F------7LJF---7|FJF7LJ7-||.F7F7-|-7J7.
LF7JLF7.|.||LL7L---7FJLJL--7||L---------JLJF7F7F--7|F-7||FJ|||L7|L-77LFFJ|L7|.L||||L-J|F-7FJL--JF7FJLJ|F----7L-7|F--J||FJL7F77FJ-L|L|.L7LJ.L
F-||.|L-L7--JLFLF--J|F7F---J|L-------7F7F7-|||LJF7LJ|7LJLJL|||FJ|F-J--FJFJ-||7J||LJJF-J|FJ|F--7FJLJF7FJ|F--7L-7LJL7FFJLJF7LJL7F7FF77.LJJ.|7.
JF7-7-7-F|F|-FFFJF-7|||L---7|F7FF----J|LJL7|||F-J|F7L7F7|F7LJ||FJL-7LL|FJJ.LJ--LJJFFL-7|L-JL-7LJF-7|LJLLJF-JF7L7F7L7|F--JL7F7||L7||77.|7-F-J
.|L7L7|.JLJFF-7L-JFJLJL-7F-JLJL-JF-7F7|F--J|LJL-7||L7LJL7|L7-LJL-7FJJ|LJ7LJ7|JLJJ7F|-LLJF7F7FL7FJFLJFF---JF-JL7LJL7LJ|F--7LJLJ|FJ|L-7-|L-|.|
F|7|L-J7LF--L7|F7FJF7F-7||F-7F7F7|FJ|||L---JF-7FJLJFJF-7LJFJF|FLLLJJ-7L7|-.L7J|||LF7FF--JLJL--J|F---7|F7F7|F--JF-7L--JL7FJF-7J|L-JF-JF-7F|-L
FLFF7J|L7|F|-|LJLJFJLJFJLJ|FJ|||LJL-JLJF7F7FJ-LJ-F7L-J7L7FJF--7L-.FF7FJ-L.JL|F|.F.|L7|F-----7F7|L--7LJ|LJLJL--7|FJ.F77FJL7|FJFJF7FJJ-J-L-J-|
|F-J77||F7F7.L7F--JF--JF7FJL7|||F------JLJLJF7F-7|L--7F7|L-JF7L7|.LJF-7LF7J||FJF|.L7|LJF----J|LJF--JF-JF------J||F7|L-JF7LJL-JFJ||L|-|.LF|..
L.|FL77F||F77-LJF-7L--7|||F-J|LJL------7-F7FJLJFJ|F--J|||F--JL-J7FL-.LJF|JFJ-F.LLJ-||7FL-----JF7L-7FJFFJF7FF7-FJLJLJF-7|L-----JLLJ-J-7-F-J-|
L-J-L|7F|LJL7F7FJFJF7FLJ||L--J|F7F--7F7|FJLJF--JFJL--7||LJF7F-7JF-|L|.FL|-L7.||J.FFJ|F7.F7F7JFJL-7LJLFJFJL-JL-JF---7L7|L-----7F7F77|.|.|L7-|
7J|L||77L7F7LJLJFJFJ|F7FJ|F---7|LJF7LJ|LJF7FJF-7|F---J||F7|||FJ.--7-|-F7L7L-77|L7-L7|||FJLJL7L--7L--7L-JF---7F7L--7L-J|F-7F--J||||F77J|7J|J|
L.7FFJFFLLJ|F7F7L7L7|||L-JL--7|L--JL-7L-7|LJ7L7|||F7F7|||||LJL77-JL-JLL7.-F77F7F|.||||LJF--7L7F7L7F7L7F7L--7|||F--JJF7LJFJ|F--JLJ||L77|JF7.|
FF77|---.LL||||L7L-JLJ|F7F7LFJL------JJFJ|F7FFJLJLJLJ||LJLJF-7L777|FJ.77F.LJFJL-7F-J||F-JF7L7|||7LJL7||L---JLJ|L----JL7JL-J|F-7F-J|FJ-L7.|FL
|.LF--J7.J-LJLJFL-7F-7LJ|||FJF---7F7LF7L7LJL-JF7F-7F-J|F---J-L7L7JL|JFL777FFL7F-JL-7|LJF-JL-JLJL77F7||L------7|F7F-7F7L7F7FJL7LJ|-||J|F|F-.|
|--F--.F7|FF7F---7LJFJF7LJ|L-JJF7LJL-JL7L-----J|L7LJF7||LF7F7JL-J|FFF7-|L-J-FJL7F--J|F7L-------7L-JLJL7-F----JLJ|L7||L7LJLJF7L-7F-JL7F7L-J7J
.JF7|.L7LF-J|L--7L-7|FJ|F7L----JL7F----JF7FF7F7L-JF7|LJL-JLJL7F-7---L7|L-7-FL-7|L--7|||F------7|F-7F-7L7L7F-7LF7L-JLJJL7F-7|L--JL--7LJ|77-J7
F.F|7|7LF|F7L-7FL-7|LJFJ|L-7F-7F7|L-----JL7|LJL7F7|LJF7F7F7F7LJFJ-JL7J|.F---7FJ|F--J|||L-----7LJ|FJ|7L7|FJ|FJFJL-7F-7F7||FJL--7FF7FJF-J77.|F
|-||F--7FLJL-7L-7FJ|F7L-JF-J|FJ||L---7F7F7LJF--J||L7FJLJ||LJ|F7L-7F7JFJ-|F--JL7|L7F7LJL-----7L7FJL7|F-J|L-JL7|F--J|FJ||LJL----JFJ||FJ|||7F7J
|-FL7F|LJFL7FL-7|L7LJL-7|L--JL-J|F-7-LJLJL-7L---JL-JL--7LJF7LJL--JF7..FF||F7F7|||LJL-7F----7L-JL7-LJL-7L---7LJL---JL7||F7F7F7F7L7LJL--7JF7F.
J7|LJF7LF7JF7|FJL-JF7F7L7F-7F7F7LJFJF7F7F77L-7F-7F-----J|FJL--7-F7|L7F7FJLJ||LJL-7F--J|F---JF7F7|F----JF-7LL--7F7F-7LJLJLJLJLJL7|F-7F-J-.LL-
|L|.L|LFJL-JL-JF-7FJLJL7LJFJ||||F7L-JLJ||L--7|L7|L--7-F7FJF7F-JFJ|L7LJ|L7F-J|F7F-JL---J|F7F7|||||L7F7F7L7L---7||LJ7L---7F-7F7F7LJL7||-F|JJ.|
|-J.L--L-7F---7L7||F7F7|F7L7|||LJ|F----J|F--JL-JL7F7L-JLJFJLJF7L7L7L-7|FJL-7LJ||F7F-7F7LJLJLJLJLJFLJLJL-JF-7FJLJF7F7.F7|L7||LJ|F7FJLJFF7JJ.7
|7LF-L-LLLJF--JFJ|||LJ|LJL7LJ|L-7|L-----JL7F---7|LJ|F7F7FJ7.FJL7|FJF-J|L--7L7FJ|||L7LJL7F7F7F---7F77F----J7LJF--JLJL-J||FJ||F7LJ||F7F-J|-.F|
L|.LLJJLJJFJF7FJ7LJL-7||F7|F7L--JL---7F7F7|L7F-JF-7LJLJ|L-7FJF7|||FJF-JF7JL7LJFJ|L7L7F7||LJ|L--7LJL7|F-7F7F77|F---7F7FJ||FJ||L-7|LJLJF-J-7--
.L7-F7L-FFL7|LJF-----JL7||LJ|F7F-7F7|LJLJ||FJL7L|FJF7F7|F-JL-J|||||FJ-FJ|F7L-7L7|FJFJ|LJL-7|F--JF-7LJ|LLJLJ|FJL--7|||L7LJL7||F-JL----JJJ||.|
F-J7LF7LFLJLJF7L------7|||F7LJLJ.LJL--7|FJLJF7|FJL-JLJ|LJ7F7F7||||||F7|FJ|L-7L7||L7L7L-7F-JLJF-7L7L7FJF---7LJF7F-JLJL7L7F7LJ||F7F--7FF7-F.FJ
F.|F.F|JFLF--JL-------JLJLJ|F7F7.F---7L7L7F-J|LJF-----JLF7|LJLJLJ||LJLJ|FJF7L7|||FJFJF-JL---7|FJFJFJL7|F-7L7FJLJF77F7L-J|||FJLJLJF7L-JL7-7JJ
.F|-7-JF7.L-----------7F--7||LJL-JF-7|FJ.|L7FJF7L---7JF7||L---7F7LJF---JL-JL7||||L7L7L7F7F-7LJL7L7L7FJLJLL7|L---J|FJL7F7||FJF7F7FJ|F7F-J.JL7
|LJF|-FJ|7.F7F7LF7F7F-J|F-J|L----7|FJ||F7L7|L7|L7F-7L-JLJ|F--7LJL-7L-7F7F-7FJ||LJFJJL7LJ||FJF-7L-JFLJJF7F-JL-----J|F7||||LJFJLJ|L7||LJ7.FL7J
LF-7J7L7|F-JLJL-JLJLJF7|L-7L----7LJL7LJ|L7LJFJL7|L7L7F---JL-7|F7F-JF-J||L7|L7||F7|F--|F-J|L7|FJF-7F-7FJ|L-----7F--J|LJ|||F-JF7-L-JLJJ|J-L-J7
F..J.LFJ|L-----------JLJF-JF---7L---JF7|FJF7L--JL-JFLJF7F7F-J|||L7FJF-JL7|L-J|LJ|L7FFJ|F-JFJ|L7L7|L7|L7L------J|F--JF-JLJL--JL----7J.J...77|
|-7-|FL7L----7F---------JF-JF7FJF7F7FJ|||FJL--7F----7FJ|||L-7|||FJ|.|F--JL7F7|F7L7|FJFJL7FJJL7|FJL-J|JL--7F7F--JL---JF-7F7F-------J-JL|77|F|
L7-77FLL7F--7|L--7F7F7F7FJF7||L-JLJLJFJ|||F---J|F---JL7|||7FJLJ||FJFJ|F7F7LJ|LJL-J|L7|F7|L-7J|LJF-7FJF7F7LJLJF7F----7L7|||L----7FF-7||L|L7-|
F|FL7|-|LJF-JL--7LJLJLJ||FJLJ|F---7F-J||LJL7F7FJL7|F7FJ||L7L--7LJL7L7LJLJL-7L----7L7|LJ||F-JFJF7|FJL-JLJL----J|L-7F7L-JLJ|F--7FJFJFJ77-|FJ|J
FFJ.LF-F-7L-7F-7|F-7F--J|L7F7LJF-7|L---JF--J||L-7|FJ||FJL7|-F7|F--JFJF-7F--JF----JFJ|F-J||F7L-JLJL-7F7F-----77L-7LJL---7FJL-7||FJFJLL|7L--77
LJ7-||7L7L--JL7LJL7|L---JL||L7FJFJL----7L--7|L7FJ||FJ|L7J||FJLJL--7L7L7LJ|F7|F---7|FJL--J||L-7F7F-7LJLJF----JF77|F7F---JL-7FJ|LJFJ77JJL-|-J7
.|L-F---JF---7L7F7|L7F-7F7LJFJL7L----77|F--J|FJL7|||FJFJFJ|L--7F--JFJFJF7FJ|||F-7||L--7F-JL7FJ||L7L-7F7L-----JL7LJ|L-----7|L7|F7L7F7JFLF|JF|
F-|-L-7F7|F--JFJ||L7|L7|||F-JF-JLF7F7L7|L--7|L-7|LJ|L7|7|FJF-7|L7F-JFJFJ||FJLJL7||L7F7|L7F7||FJL7|F-J||F------7|F7L---7F7|L7|LJL7|||.7-LJ-|J
|-J77FLJLJL7F7L-JL-JL7|LJ||F-JJF-JLJL-JL---J|F-J|F-J|||FJL7L7|L7||F-JJ|FJ||F7F7|||FJ||L7LJ|||L-7LJ|F-J|L----7FJLJL--7FLJLJFJL--7|LJ|JL-J7-7-
L-7|-||F7F7LJL--7F--7||F-J||F--JF7F--7F7-F7.|||FJ|F7FJ|L7FJFJ|L|||||F7||FJ||LJ||LJL7||JL-7||L7FJF-JL-7L---7FJL-----7|F7F77L----JL7FJJ-7.JL||
JLLJ-JFJLJL--7F-J|F-JLJL7.LJL-7FJLJF-J||FJL7|L7|FJ|||FJFJL7L7L-JLJ|FJ||||FJL-7|L7F-J|L7F-J||FJL7|F-7-L-7F7LJF7F--7FJLJLJL7LF--7J|LJ.|.77.LL-
L7|7L-|F7F--7LJF7||F7F-7|F7JF7LJF--JF7|||F-J|FJ|L-J||L-JF7L7L-7F--J|FJ|||||F7||FJL-7|FJL-7|||F7|||FJF7FLJL--JLJF-JL----7FJFJF-J|-|-FF7LF---|
LF77|FLJLJF-JF7|LJLJLJFJLJL7|L--JF-7|||||L7FJL7L-7FJL-7FJL-JF7||F7FJL7|||L7||||L--7||L7F7|LJ|||||||FJ|F-7F--7F7L-7LF7F7LJ||FJF7F7..-.7-L7|FJ
.||-L-LLF7L-7|||F-7JF-JF--7|L----JFJ||||L7|L7FJF7|||F7||7.F7||||||L7FJ|||FJ||||F7|||L7|||L7FJ|||||||FJ|FJL-7|||F7L-JLJL7F7||7|LJL7FLJ77--.J.
|-77L.|L||F7LJLJL7L-JF-JF-JL------JFJ||L7|L7||FJ||L7|LJL7FJ||||||L7||FJ||L7|LJ|||FJ|FJ||L7|L7|LJLJ|||FJL7F-J|||||F7F---J||||FJF-7|FLLJL-..|-
||LJ.FF-JLJL-----JF-7|F-JF-7F7F---7|FJ|J|L7LJ||FJ|FJ|7F-J||LJ||||FJ|||FJL7||F-J|||F|L7|L7||FJL-7F-J||L7FJL-7|||||||L----JLJLJFJ7|L77-77JFF|J
FJ-L|-L--7F7F-7F-7|FJ|L-7|FJ|||F--J||FJFJFJF7||L7|L7L7|F7L-77||LJL7||||F7|||L-7|||FJFJL7|||L7F7|L7FJL7|L7F-JLJLJLJ|F-7F------J-LL-J.FJL---J7
|J7-F-|LFJ|LJFJ|FJ|L-J.FJ|L-JLJL-7FJ||LL7|FJLJL7|L7L7|LJ|F7|FJL--7LJ||||LJ|L-7||LJL7|F7LJLJL|||L7|L7FJ|FJL--7F7F-7||.|L-------7|-JJF|J-LJ7F-
L|J.L-7.L-JF-JFJL7|-F--JFJF------J|FJL77LJL--7FJL-JFJL-7||LJ|F7F-JF-J|||F7L7FJ||F--JLJL7.F7FJ||FJ|FJL7||F7F7LJLJFJ|L7|F7F-7F7FJJ.|.-J|L|L-F7
L-7|J.LFF--JF7|F-JL7|F7FJ7|F-7F7F7|L7FJF-----JL--7LL-7FJLJF7|||L7JL7FJ|||L-JL7LJL---7F7L7|LJFJLJFJL7FJ|||||L7F-7|FJFJLJ||-LJLJ|-LJ7L-F.L7JLJ
.L|||LF7|F-7||||F7FJLJLJF7||FJ|||LJFJL7L---7F-7F7|F--JL--7||||L7L-7|||LJL7F-7L--7F--J|L7||F7L7F-JF-J|FJ||||LLJ.||L7L-7FJL---7L||.7-F7LL-J77.
|7|---|LJ|FJ|||LJ|L7F---JLJ|L7||L7FL7FJF---JL7||LJ|F7F--7LJ||L7|F7|||F---JL7|F7FJL7F7L7||||L7|L-7L7FLJFJ||L---7|L7|F-J|F7F-7L7||-|7L|7LFLJFJ
--J.LF|F7||FJ||F-JFJ|F-7F-7|||||FJF-JL7L--7F-J|L-7||||F-JF7|L-J||||LJL7F-7FJ||||JFJ|L7|||LJFJL-7|FJF7FL7|L7F--J|FJLJF7|||L7L7L77-L7.-7.JJ7J|
.F|.|JLJLJLJLLJL-7L7||FJL7LJFJ||L7L-7FJF--J|F-JF-J||LJL-7||L--7|||L-7FJ|FJL7|||L7L7L7|||L7LL-7FJ|L-JL-7||FJL--7|L--7||LJL7L7L-JJFJ|.FF7-F7F|
F7J7|F|7||JLFLF-7|FJLJL7FJF-JFJ|FJ-FJ|FJF-7||F7L-7LJF---J|L7F-J|||F-JL7|L7FJ||L-JF|FJ||L7L7F-JL7L--7F7|LJL-7F-JL7F7LJL--7L-J-|7L||L7-7L-FLJJ
7|LJ-|L|-77.LFL7LJL7JF-JL7L7FJFJ|F-JFJL7|FJ|||L7FJF-JF-7FJFJL-7||||.F-J|FJL7LJF---JL7||JL7|L7F7L--7|||L--7FJL-7FJ|L7F7F7L7F7-F-7JLJ|..--LJ.7
FJ-|F|-J|F-LJ|.L7F-J-L-7FJFJL7L7||F7|F7LJL7||L7LJ.|F-JFJL7|F7FJ||||FJF7|L7FJ7FJF7F7FJ|L7FJ|J||L7F7|||L7F7|L-7FJL7|FJ|LJL-J||-J7JLL7LLLLF7F7J
FJLFLL.LL|-JJL7L|L-7-L7LJ||F-JFJ||||||L--7||L7L-7FJL7JL7FJ|||L7||LJL7|LJFJL-7L7|LJ||7|FJL-JFJ|F||LJLJLLJ|L7FJ|F7||L7L---7L||-|FF7.J.LLL7--J7
L7.FJL.LFFJF-L-FJF-J7LJLF7|L-7L7|||||L7F7LJL7L-7|L7FJF-JL7||L7|LJF--JL7FJF7FJ-|L-7|L7LJF7F7|FJFJL---7F--JFJ|FJ|LJ|FJF7F7L-JL--7LJ7|.FJ.LLJL.
||-L.J7.LLJ|J|FL7L7J-LLFJLJF-JFJ|||LJFJ|L7F7L-7LJFJL7L-7FJ|L7|L-7L-7F7|L7||L-7|F7||FJF-JLJLJ|JL7F---J|F7FJFJ|FJF7||FJ|||F-7F-7|..L7-|.LJ|7.F
F|||7FF.J..L.FF7|FJJ|LFL--7|JFL7|||F-JFJFJ|L7FJF-JF7|.FJL7L7|L--JF7||LJFJ||F7|LJ||LJF|F--7F7|F-JL---7LJ||||FJ|FJ||LJJ|||L7|L7LJ--|..L7|FFFFJ
F|7LL|-7|F||-JLL||J7-FJL|FJL-7-LJLJL7FJ.L-JFJL7|F7|LJFJF7|FJL---7|LJ|F-JFJ|||L-7||JF7||F-J|LJL-7F7F7L7FJL7|L7LJLLJF--J||FJL-J7|JF|7.L-|7L7LJ
JL7||FJ|LJL-F-7-LJF--||-LL-7FJF--7F7||F-7F-JF-JLJ||F-JFJ|||F7F--JL7FJ|F7L7LJ|F7||L-J|||L7FJF---J|||L7|L--JL-JJ-|FLL---JLJ||LLJJ.||L|JLJ7|.F.
|FL|-LJ|J7L.J7F-JJ-F-LJ.|7L||LL-7||LJ|L7LJF7L--7-|||F7L7||||LJ-F-7LJFJ||FJF-J|||L-7FJ|L7LJ-L--7FJLJFJL---7F7J.F7-J-L-L|J.L7JFJ..LL-L77LF7.--
F7JJ7L-JFL.|JF-J|J|||L77|FFLJ-F-J|L--J-L-7||F7FJFJ||||FJLJ|L---JFJF7L7|||FL-7||L-7||F|FJF-----JL-7FJF7F-7LJL-7FJL-.L|L|J7FJ.JF-7J|.F7-J.7-J|
-J|F77F7|J-JFF7F7F7J7L|LFJ.L7|L-7|7F7F7F-J|LJ||JL7|||||F7FJF-7F-JFJL-J||L7|.LJ|F-J|L7|L7L-----7F-J|FJ||FJF---JJ..|77|.F-77.7|LFJ--F-|L-F.F-J
FL-L7FLJJ7.LFF-FJ-F-7-7F||FFLF--JL-JLJLJF7L-7||F-J||||LJ|L7|FJL77|F7F7|L7L7-7.|L7FJFJL-J7F---7|L-7|L7||L7L--7|J-F77-7.F7FF7LF---LLF-|L|LL7J.
F7F||LJJ|FF.F|-.FJFJ|JL7F|F-LL7F-7F7F-7FJ|F-J||L7FJ|||F-JLLJL7FJFLJ||||FJFJ.FFJFJL-J7-|F-|F-7LJF7|L7||L7L7F7L7J77J|FF-L-LJL-|-L--F|..FLFJJ.F
.L|L7L7L-JJ7L|7-FFJ-|7FJJLJJ|7LJL||||FJL7|L-7||FJ|FJ|||J7LJ.|LJLL.LLJ||L-JLFFL7|-JJ-LF-7|LJFJF7|LJ.|||FJFJ|L-JJLL-F7L-7.LJ--|.LL|JL77F|J|..|
LL7-F.F.F|L-J.FFJ||.-J|JJ||-F-|LFLJ||L7FJ|F7||||FJ|FJLJ-7-LFFLJJ|-F|LLJ-LL--LL||7.L--7JJ77FJFJ|L-7-LJLJLL7L7J.77FF|.LL|-7|..FF--77-7-LJLF|7L
L|JJ|FJFFJ.|F7JJ|7FFL.||FF7.-.L7|7|LJFJL7LJ||LJLJ.LJJJ|-F7|LJ7.-|.LJ-||-F|-LLFJL77.FFL7|L-L7|FJF-JJL-F|J|L7|J.L-JLJFFJ..LJ7LJ.FLL|L|-F|.7LFL
F7.F|J-F7-FFJ.LF--LL7FL---|7J.L-|L|FL|F-J7JLJ-L-J-7|F7L7|-F7FJ7F|L|.F7|-FFJFFL7FJ7-F7-F-.L-||L-JFL.LFLJ|LJLJ---7LFL|.LFL.L7L.-LFJL-F-J-FJ-|J
LJ-FLJFJJ.FJJ7.--F.LJJJL|L|-F7|.J|.|LLJJ.F-LJ-|.LLFJ|F7L|L7-7.F|7F|7L||-FJ.-7JLJJLJL7JL..L7|L-7F-.J-FL-FL.|LL-FFJFJL7.---J||F7.|||FJJ..F-J||
|JFLL-L7LLJ77.FJ..7||J..|7.FJ7-7L-7L77|F7JFL---||.L.JF-JJJ|LF7.|F7JLFJLF|FJFF7.|LF7|LJ|--7LL--J-|7||L|-JLFF77FLJF|-7JFL7L7J||LJ-L77FJFFJJFJ7
|.J|FLL7||LLL---J7LL7-7-7-FJ7J.FJ||.LL7FL7L7.F|.7FL77|LJ7-J-F-L7-J7.7.FF.|J|L|.7|L7JF7-7L|FJ|7L7LLJJ7L7.7LJJ7J|-F.7L77LL--7F|-|.-J--.F-..F7.
L7FL-F-7J|L-|JJ|FL|JJLF-|JLJ|.F|LL..JL|-|-|7-J77J|J|FJ||L-|-|.JJ7.|7L-FJ-7--.L|||7JLF|LF7LJLFJL|7JF.|L7-F--F-J.FL7L7JJ.L-.7JLLJ|.-J-|J-J7LJ-
|L7FLJ-J-JJJLJ.F7JL|-7|.|.FL-7-J7|.FF|LFLF|JF7|LFJ--F|-FJJJJFJL77-L|J.|J|LJJLFF-L7.F-||.J77.JJJ|L-7-7.|LFJ.||L-7J.FJJFJF|.|L7J.FFJ..LLLJL.|J
7-||7J|L7.FJLJFF-7.F7FF-7-F-.J.|LJFLL7LF7|J..LJLJ|.|F|7|FLF-||L|77-L-7.FJ|.7.7JJL|7L7-FF-7-L-JF-7|LJ|JJF7-L--7|J-||L7LFF7F|-L7F-J.F7.|.LFFJ7
L7JJF-7L|-LFJ.L7J|J-|.JL7.F.-J-7LL|J-|-|-J-F.L-7-L|--.LJ-FJ-JJ.LLL.LLF|LL77.JJ.L-|JJLJLJ-F7J..L-LJJL7J-J..|-L--J-J-L7--JFL7-JF|-F77-FLJL-JLJ`;

const DEMODATA = `............
.S------7...
.|F----7|...
.||....||...
.||....||...
.|L-7F-J|...
.|..||..|...
.L--J|..|...
.....|..|...
.....|..|...
.....|..|...
.....L--J...`;

const DEMODATA2 = `OOOOOOOOO
OS-7F--7O
O|.||..|0
O|.LJ..|0
O|F--7.|0
O||..|.|0
O||..|.|0
O|L-7|.|0
O|..||.|0
OL--JL-J0
OOOOOOOOO`;

interface Coordinate {
  x: number;
  y: number;
}

function replaceAllOccurrences(
  inputString: string,
  targetCharacter: string,
  replacementCharacter: string
) {
  return inputString.split(targetCharacter).join(replacementCharacter);
}

function getPossibleNextLocation(
  currentLocation: Coordinate,
  move: string
): Coordinate[] {
  move = replaceAllOccurrences(move, ";", "");
  move = replaceAllOccurrences(move, "d", "");
  move = replaceAllOccurrences(move, "'", "");
  switch (move) {
    case ".":
      return [];
    case "-":
      return [
        { x: currentLocation.x + 1, y: currentLocation.y },
        { x: currentLocation.x - 1, y: currentLocation.y },
      ];
    case "|":
      return [
        { x: currentLocation.x, y: currentLocation.y + 1 },
        { x: currentLocation.x, y: currentLocation.y - 1 },
      ];
    case "L":
      return [
        { x: currentLocation.x, y: currentLocation.y - 1 },
        { x: currentLocation.x + 1, y: currentLocation.y },
      ];
    case "J":
      return [
        { x: currentLocation.x, y: currentLocation.y - 1 },
        { x: currentLocation.x - 1, y: currentLocation.y },
      ];
    case "7":
      return [
        { x: currentLocation.x, y: currentLocation.y + 1 },
        { x: currentLocation.x - 1, y: currentLocation.y },
      ];
    case "F":
      return [
        { x: currentLocation.x, y: currentLocation.y + 1 },
        { x: currentLocation.x + 1, y: currentLocation.y },
      ];
  }
  return [];
}

export const Day10 = () => {
  const [part1, setPart1] = useState<number>(0);
  const [part2, setPart2] = useState<number>(0);
  const [mappinger, setMappinger] = useState<any>(null);

  const map = DATA.split("\n").map((row) => row.split(""));
  let Scoordinates: Coordinate | null = null;
  map.forEach((row, y) => {
    row.forEach((col, x) => {
      if (col === "S") {
        Scoordinates = { x, y };
      }
    });
  });
  const checkIfMoveIsPossible = (
    currentPosition: Coordinate,
    location: Coordinate
  ) => {
    if (
      map.length > location.y &&
      location.y >= 0 &&
      map[location.y].length > location.x &&
      location.x >= 0
    ) {
      const possibleNextLocations = getPossibleNextLocation(
        location,
        map[location.y][location.x]
      );
      if (map[currentPosition.y][currentPosition.x] !== "S") {
        const reachableFromCurrentPosition = getPossibleNextLocation(
          currentPosition,
          map[currentPosition.y][currentPosition.x]
        );
        return (
          possibleNextLocations.filter((location) => {
            return (
              location.x === currentPosition.x &&
              location.y === currentPosition.y
            );
          }).length > 0 &&
          reachableFromCurrentPosition.filter((reachable) => {
            return reachable.x === location.x && reachable.y === location.y;
          }).length > 0
        );
      } else {
        return (
          possibleNextLocations.filter((location) => {
            return (
              location.x === currentPosition.x &&
              location.y === currentPosition.y
            );
          }).length > 0
        );
      }
    }
    return false;
  };

  const getLoop = () => {
    if (Scoordinates !== null) {
      let currentPossition = Scoordinates;
      let passedLocations: Coordinate[] = [];
      do {
        const nextLocations = [
          { x: currentPossition.x, y: currentPossition.y - 1 },
          { x: currentPossition.x, y: currentPossition.y + 1 },
          { x: currentPossition.x - 1, y: currentPossition.y },
          { x: currentPossition.x + 1, y: currentPossition.y },
        ];
        const nextPossibleLocation = nextLocations.filter((location) => {
          const possible = checkIfMoveIsPossible(currentPossition, location);
          return possible;
        });
        const unusedNextLocation = nextPossibleLocation.filter((location) => {
          return (
            passedLocations.filter((passedLocation) => {
              return (
                passedLocation.x === location.x &&
                passedLocation.y === location.y
              );
            }).length === 0
          );
        });
        if (unusedNextLocation.length >= 1) {
          passedLocations.push(currentPossition);
          currentPossition = unusedNextLocation[0];
        } else {
          console.log("no more moves");
          break;
        }
      } while (1 == 1);
      passedLocations.push(currentPossition);
      return passedLocations;
    }
    return [];
  };

  const calculate = () => {
    setPart1(getLoop().length / 2);
  };

  const isWall = (loc: string) => {
    loc = replaceAllOccurrences(loc, ";", "");
    loc = replaceAllOccurrences(loc, "d", "");
    loc = replaceAllOccurrences(loc, "'", "");
    //check S?
    const iswall =
      loc === "L" ||
      loc === "J" ||
      loc === "7" ||
      loc === "F" ||
      loc === "|" ||
      loc === "-";
    return iswall;
  };
  const isSurroundedByWall = (location: Coordinate, loop: Coordinate[]) => {
    //check left
    const left =
      loop.filter((loopLocation) => {
        return loopLocation.x < location.x && loopLocation.y === location.y;
      }).length > 0;
    //check right
    const right =
      loop.filter((loopLocation) => {
        return loopLocation.x > location.x && loopLocation.y === location.y;
      }).length > 0;
    //check top
    const top =
      loop.filter((loopLocation) => {
        return loopLocation.y < location.y && loopLocation.x === location.x;
      }).length > 0;
    //check bottom
    const bottom =
      loop.filter((loopLocation) => {
        return loopLocation.y > location.y && loopLocation.x === location.x;
      }).length > 0;
    return left && right && top && bottom;
  };

  const isSurroundedByVertical = (location: Coordinate, type: string) => {
    //check top
    const top =
      location.y >= 0 ? map[location.y - 1][location.x] === type : false;
    //check bottom
    const bottom =
      map.length > location.y + 1
        ? map[location.y + 1][location.x] === type
        : false;
    return top || bottom;
  };

  const isSurroundedByHorizontal = (location: Coordinate, type: string) => {
    //check left
    const left =
      location.x - 1 >= 0 ? map[location.y][location.x - 1] === type : false;
    //check right
    const right =
      map[location.y].length > location.x + 1
        ? map[location.y][location.x + 1] === type
        : false;
    return left || right;
  };

  const isSurroundedBy = (location: Coordinate, type: string) => {
    return (
      isSurroundedByHorizontal(location, type) ||
      isSurroundedByVertical(location, type)
    );
  };

  const calculatePart2 = () => {
    console.log("calculatePart2");
    const loop = getLoop();
    console.log("loop");
    //mark inner tiles and outer tiles;
    map.forEach((row, y) => {
      row.forEach((col, x) => {
        const isPartOfLoop =
          loop.filter((location) => {
            return location.x === x && location.y === y;
          }).length > 0;
        if (!isPartOfLoop) {
          map[y][x] = isSurroundedByWall({ x, y }, loop) ? "M" : "O";
        }
      });
    });

    console.log("mark all m touching o as o");
    //mark all m touching o as o
    let changed = false;
    do {
      changed = false;
      map.forEach((row, y) => {
        row.forEach((col, x) => {
          if (col === "M") {
            map[y][x] = isSurroundedBy({ x, y }, "O") ? "O" : "M";
            changed = map[y][x] === "O" || changed;
          }
        });
      });
    } while (changed);

    //check for non connected neighboars
    map.forEach((row, y) => {
      row.forEach((col, x) => {
        const isPartOfLoop =
          loop.filter((location) => {
            return location.x === x && location.y === y;
          }).length > 0;
        if (isPartOfLoop) {
          const left = x - 1 >= 0 ? isWall(map[y][x - 1]) : false;
          //check left
          if (left) {
            const possible = !checkIfMoveIsPossible({ x, y }, { x: x - 1, y });
            map[y][x] = possible ? ";" + map[y][x] : map[y][x];
          }
          //check right
          const right = map[y].length > x + 1 ? isWall(map[y][x + 1]) : false;
          if (right) {
            const possible = !checkIfMoveIsPossible({ x, y }, { x: x + 1, y });
            map[y][x] = possible ? map[y][x] + ";" : map[y][x];
          }
          //check top
          const top = y >= 0 ? isWall(map[y - 1][x]) : false;
          if (top) {
            const possible = !checkIfMoveIsPossible({ x, y }, { x, y: y - 1 });
            map[y][x] = possible ? map[y][x] + "'" : map[y][x];
          }
          //check bottom
          const bottom = map.length > y + 1 ? isWall(map[y + 1][x]) : false;
          if (bottom) {
            const possible = !checkIfMoveIsPossible({ x, y }, { x, y: y + 1 });
            map[y][x] = possible ? map[y][x] + "d" : map[y][x];
          }
        }
      });
    });
    console.log(map);

    //if O touches ; or . or ' in right orientation to flow through turn to H or V
    changed = false;
    do {
      changed = false;
      map.forEach((row, y) => {
        row.forEach((col, x) => {
          if (col === "O" || col === "H") {
            const left = x - 1 >= 0 ? isWall(map[y][x - 1]) : false;
            if (left) {
              const isFlowable = left ? map[y][x - 1].includes("d")|| map[y][x-1].includes("'") : false;
              map[y][x - 1] = isFlowable ? "H" : map[y][x - 1];
              if (isFlowable) {
                changed = isFlowable || changed;
              }
            }

            const right = map[y].length > x + 1 ? isWall(map[y][x + 1]) : false;
            if (right) {
              const isFlowableRight = right
                ? map[y][x + 1].includes("d")|| map[y][x-1].includes("'")
                : false;
              map[y][x + 1] = isFlowableRight ? "H" : map[y][x + 1];
              changed = isFlowableRight || changed;
            }
        }
        if(col === "O" || col === "V") {
            const top = y - 1 >= 0 ? isWall(map[y - 1][x]) : false;
            if (top) {
              console.log("top");
              const isFlowableTop = top ? map[y - 1][x].includes(";") : false;
              map[y - 1][x] = isFlowableTop ? "V" : map[y - 1][x];

              changed = isFlowableTop || changed;
            }

            const bottom = map.length > y + 1 ? isWall(map[y + 1][x]) : false;
            if (bottom) {
              const isFlowableBottom = bottom
                ? map[y + 1][x].includes(";")
                : false;
              map[y + 1][x] = isFlowableBottom ? "V" : map[y + 1][x];
              changed = isFlowableBottom || changed;
            }
          }
        });
      });
    } while (changed);

    //repeat mark all m touching o as o
    changed = false;
    do {
      changed = false;
      map.forEach((row, y) => {
        row.forEach((col, x) => {
          if (col === "M") {
            if (isSurroundedByVertical({ x, y }, "V")) {
              map[y][x] = "O";
              changed = true;
            } else if (isSurroundedByHorizontal({ x, y }, "H")) {
              map[y][x] = "O";
              changed = true;
            } else if (isSurroundedBy({ x, y }, "O")) {
              map[y][x] = "O";
              changed = true;
            }
          }
        });
      });
    } while (changed);

    //count all M
    let count = 0;
    map.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col === "M") {
          console.log(col);
          count++;
        }
      });
    });
    setPart2(count);
    console.log(map);
    setMappinger(map);
  };

  return (
    <div>
      <h2>Day 10</h2>
      <button onClick={calculate}>Calculate</button>
      <p>Part 1: {part1}</p>
      <button
        onClick={() => {
          console.log("button clicked");
          calculatePart2();
        }}
      >
        Calculate Part 2
      </button>
      <p>Part 2: {part2}</p>
      {/* {mappinger && mappinger.map((row:any) => {
        return <div>{row.map((col:any) => {
          return col;
        }).join("")}</div>
      })} */}
    </div>
  );
};
