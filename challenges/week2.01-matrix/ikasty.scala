// Runtime: 7084 ms, faster than 8.33% of Scala online submissions
// Memory Usage: 64.1 MB, less than 25.00% of Scala online submissions
import scala.collection.mutable.Queue

object Solution {
    def updateMatrix(matrix: Array[Array[Int]]): Array[Array[Int]] = {
        val result: Array[Array[Int]] = Array.fill(matrix.size, matrix.head.size)(-1)
        val queue = Queue[(Int, Int)]()

        // matrix에 0이 들어간 모든 좌표를 구한다
        val init = (0 until matrix.size) flatMap {
            i => (0 until matrix.head.size) map {
                j => (i, j)
            }
        } filter { tuple => matrix(tuple._1)(tuple._2) == 0 }

        // 해당하는 좌표의 result에 전부 0을 넣고, queue에도 넣는다
        init.map( item => result(item._1)(item._2) = 0 )
        queue ++= init

        while (!queue.isEmpty) {
            val tuple = queue.dequeue
            // 후보 좌표 중에서...
            val candidate = List((tuple._1 - 1, tuple._2), (tuple._1 + 1, tuple._2),
                                 (tuple._1, tuple._2 - 1), (tuple._1, tuple._2 + 1))
                // matrix 범위 내에 있으며
               .filter(item => item._1 >= 0 && item._2 >= 0)
               .filter(item => item._1 < matrix.size && item._2 < matrix.head.size)
                // 방문하지 않은 노드이며
               .filter(item => result(item._1)(item._2) < 0)
                // 큐에 넣지 않은 노드라면
               .filter(item => !queue.contains(item))

            // 현재 result에서 1 증가시키고 큐에 넣기
            candidate map { item => result(item._1)(item._2) = result(tuple._1)(tuple._2) + 1 }
            queue ++= candidate
        }

        // 리턴
        result
    }
}