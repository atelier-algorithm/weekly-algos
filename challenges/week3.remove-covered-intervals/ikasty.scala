// Runtime: 552 ms, faster than 100.00% of Scala online submissions for Remove Covered Intervals.
// Memory Usage: 53.2 MB, less than 100.00% of Scala online submissions for Remove Covered Intervals.
object Solution {
    def removeCoveredIntervals(intervals: Array[Array[Int]]): Int = intervals
        .sortBy(item => (item(1), -item(0)))
        .foldRight(List[Array[Int]]()) {
            case (item, Nil)                // init condition
                => List(item)
            case (item, list@(head::_))     // add item to front
            if head(0) > item(0) && head(1) > item(1)
                => item :: list
            case (_, list)                  // remove item
                => list
        }.size
}