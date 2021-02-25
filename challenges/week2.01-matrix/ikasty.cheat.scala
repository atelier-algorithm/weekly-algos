// Runtime: 684 ms, faster than 100.00% of Scala online submissions
// Memory Usage: 60.3 MB, less than 91.67% of Scala online submissions

// Note: THIS IS CHEAT FROM SITE ANSWERS
object Solution {
    def updateMatrix(matrix: Array[Array[Int]]): Array[Array[Int]] = {
        val result: Array[Array[Int]] = Array.fill(matrix.size, matrix.head.size)(Int.MaxValue - 1)
        
        for (i <- 0 until matrix.size; j <- 0 until matrix.head.size) {
            if (matrix(i)(j) == 0) result(i)(j) = 0
            else {
                val left = if (i > 0 && result(i-1)(j) >= 0) result(i-1)(j) + 1 else result(i)(j)
                val top  = if (j > 0 && result(i)(j-1) >= 0) result(i)(j-1) + 1 else result(i)(j)
                result(i)(j) = Math.min(result(i)(j), Math.min(left, top))
            }
        }
        
        for (i <- (0 until matrix.size).reverse; j <- (0 until matrix.head.size).reverse) {
            val left = if (i < matrix.size - 1 && result(i+1)(j) >= 0) result(i+1)(j) + 1 else result(i)(j)
            val top  = if (j < matrix.head.size - 1 && result(i)(j+1) >= 0) result(i)(j+1) + 1 else result(i)(j)
            result(i)(j) = Math.min(result(i)(j), Math.min(left, top))
        }
        
        result
    }
}