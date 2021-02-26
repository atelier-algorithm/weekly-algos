// Runtime: 7052 ms, faster than 8.33% of Scala online submissions
// Memory Usage: 62.3 MB, less than 50.00% of Scala online submissions
import scala.collection.mutable.Queue

object Solution {
    def updateMatrix(matrix: Array[Array[Int]]): Array[Array[Int]] = {
        val result: Array[Array[Int]] = Array.fill(matrix.size, matrix.head.size)(-1)
        val queue = Queue[(Int, Int)]()

        // matrix에 0이 들어간 모든 좌표를 구한다
        val init =
            for (i <- (0 until matrix.size); j <- (0 until matrix.head.size) if matrix(i)(j) == 0)
                yield (i, j)

        // 해당하는 좌표의 result에 전부 0을 넣고, queue에도 넣는다
        init.foreach{ case (i, j) => result(i)(j) = 0 }
        queue ++= init

        while (!queue.isEmpty) {
            val (x, y) = queue.dequeue
            // 후보 좌표 중에서...
            val candidate = List((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1))
                // matrix 범위 내에 있으며
               .filter(_._1 >= 0)
               .filter(_._2 >= 0)
               .filter(_._1 < matrix.size)
               .filter(_._2 < matrix.head.size)
                // 방문하지 않은 노드이며
               .filter{ case (i, j) => result(i)(j) < 0 }
                // 큐에 넣지 않은 노드라면
               .filter(!queue.contains(_))

            // 현재 result에서 1 증가시키고 큐에 넣기
            candidate.foreach{ case (i, j) => result(i)(j) = result(x)(y) + 1 }
            queue ++= candidate
        }

        // 리턴
        result
    }
}