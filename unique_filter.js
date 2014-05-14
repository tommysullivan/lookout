module.exports = function() {
    return {
        filter: function(arrayToFilter) {
            var uniqueHash = {}
            arrayToFilter.forEach(function(item) {
                var itemAsString = item.toString();
                if(!uniqueHash.hasOwnProperty(itemAsString)) uniqueHash[itemAsString]=true;
            });
            var uniqueItems = []
            for(var name in uniqueHash) {
                uniqueItems.push(name);
            }
            return uniqueItems;
        }
    }
}