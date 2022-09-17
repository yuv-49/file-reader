const fs = require('fs')
const readline = require('readline');

module.exports = async function(reqUrl, fileName, res) {
    const query = reqUrl.query;
    const searchWord = query.search;

    let occurance = {};
    let sortedArr = []

    let totalWordCount = 0;
    let searchCount = 0;
    let sentenceCount = 0;

    const readInterface = readline.createInterface({
        input: fs.createReadStream(fileName),
        crlfDelay: Infinity
    });

    for await (const line of readInterface) {
        const words = line.replaceAll('.', '').split(' ');
        totalWordCount += words.length;

        words.forEach(word => {
            if (query.occurance) {
                if (occurance[word] === undefined) {
                    occurance[word] = 1;
                } else {
                    occurance[word] = occurance[word] + 1;
                }
            }

            if (searchWord === word) {
                searchCount += 1;
            }
        })

        if (query.occurance) {
            let wordOccuranceArray = [];
    
            for (const word in occurance) {
                wordOccuranceArray.push([occurance[word], word]);
            }
    
            sortedArr = wordOccuranceArray.sort(function (first, second) {
                if (first[0] === second[0]) {
                    if (first[1] < second[1]) {
                        return -1;
                    } else {
                        return 1;
                    }
                } else {
                    return second[0] - first[0];
                }
            });
        }

        sentenceCount += line.split('.').length - 1;
    }

    const response = {
        ...(!!query.search && { searchCount }),
        ...(!!query.sentenceCount && { sentenceCount }),
        ...(!!query.occurance && {
            topTen: sortedArr.slice(0, 10),
            lastTen: sortedArr.slice(-10)
        }),
        ...(!!query.totalWordCount && { totalWordCount })
    }

    res.write(JSON.stringify(response))
    res.end()
}
