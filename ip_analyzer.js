module.exports = function(blockSize) {
    return {
        analyzeIPs: function(uniqueIpNumbers) {
            var bad_ips = []
            var good_ips = []

            //TODO: Even better would be to apply a bitmask to each ip to get a hash, then store an array of ips for each hash. Hashes with only one value in the array would be bad.

            uniqueIpNumbers.forEach(function(uniqueIPNumber) {
                var nearbyNumbers = uniqueIpNumbers.filter(function(otherUniqueIPNumber) {
                    return (otherUniqueIPNumber!=uniqueIPNumber)
                        && (otherUniqueIPNumber < (uniqueIPNumber + blockSize))
                        && (otherUniqueIPNumber > (uniqueIPNumber - blockSize));
                });
                var targetIPList = nearbyNumbers.length > 0 ? good_ips : bad_ips;
                targetIPList.push(uniqueIPNumber);
            });

            var responseJSON = {
                count: uniqueIpNumbers.length,
                good_ips: good_ips,
                bad_ips: bad_ips
            }

            return responseJSON;
        }
    }
}