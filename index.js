const axios = require('axios');
const arg = process.argv[2];
const getContests = async() => {
    try{
        return await axios.get('https://clist.by/get/events/')
    } catch (error) {
        console.error(error)
    }
}

const getevents = async() => {
    const contests = await getContests()

    if(contests.data) {
        result = contests.data;
        let currDate = new Date();

        switch (arg) {
            case "past" :
                console.log ('PAST EVENTS ARE:');
                result.forEach(function(elem) {
                    let end = elem.end;
                    end = new Date(end);
                    if (end < currDate) {

                        console.log(elem);
                    }
                })
                break;
            case "ongoing" :
                console.log ('ONGOING EVENTS ARE');
                result.forEach(function(elem) {
                    let start = elem.start;
                    start = new Date(start);
                    let end = elem.end;
                    end = new Date(end);
                    if (currDate < end && currDate >= start) {
                        console.log(elem);
                    }
                })
                break;
            case "upcoming" :
                console.log ('UPCOMING EVENTS ARE:');
                result.forEach(function(elem) {
                    let start = elem.start;
                    start = new Date(start);
                    if (start > currDate) {
                        console.log(elem);
                    }
                })
                break;
            default:
                console.log('Invalid Choice. Choose past, ongoing or upcoming');
        }
    }
}
getevents()