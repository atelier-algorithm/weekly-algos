// Runtime: 1164 ms, faster than 100.00% of Scala online submissions
// Memory Usage: 64 MB, less than 100.00% of Scala online submissions
object Solution {
    def maxNumberOfFamilies(n: Int, reservedSeats: Array[Array[Int]]): Int = {
        val target = reservedSeats.map(_(0)).distinct
        val emptyline = (n - target.size) * 2
        val reserved = reservedSeats
            .filter(2 to 9 contains _(1))
            .groupBy(_(0))
        
        // seat 2, 3 => 0
        // seat 4, 5 => 1
        // seat 6, 7 => 2
        // seat 8, 9 => 3
        val results = for (row <- target) yield reserved
            .getOrElse(row, Array())
            .map(_(1) / 2 - 1).sorted.distinct match {
                case Array(0, 1)        => 1
                case Array(2, 3)        => 1
                case Array(0, 3)        => 1
                case x if x.size >= 2   => 0
                case x if x.size == 1   => 1
                case _                  => 2
            }

        emptyline + results.sum
    }
}