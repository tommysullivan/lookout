var IPAnalyzer = require('../ip_analyzer');

describe('IPAnalyzer', function() {
    var blockSize;
    var subject;
    beforeEach(function() {
        subject = IPAnalyzer(blockSize);
    });

    it('should be instantiable', function() {
        expect(subject).not.toBe(undefined);
    });

    describe('analyzeIPs', function() {
        describe('when ips are empty', function() {
            it('returns an empty object', function() {
                expect(subject.analyzeIPs([])).toEqual({
                    count: 0,
                    good_ips: [],
                    bad_ips: []
                });
            });
        });

        describe('when block size is 16', function() {
            beforeEach(function() {
                blockSize = 16;
            });

            describe('and we pass ips that are not in a 16 netblock', function() {
                var ips = [1,17,33]
                it('indicates all ips are bad', function() {
                    expect(subject.analyzeIPs(ips)).toEqual({
                        count: 3,
                        good_ips: [],
                        bad_ips: ips
                    });
                });
            });

            describe('and we pass ips from two netblocks and one ip not from a netblock', function() {
                var ips = [1,2,50,55,90]
                it('shows us one bad ip and the rest in good ips.', function() {
                    expect(subject.analyzeIPs(ips)).toEqual({
                        count: 5,
                        good_ips: [1,2,50,55],
                        bad_ips: [90]
                    });
                });
            });
        })
    });
});