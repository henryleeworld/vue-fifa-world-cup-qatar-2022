import groups from "../store/match_group.js"

export function datetimeformat(Tb){
    Tb.forEach(function(element){
        let datetime = element.datetime
        datetime = datetime.split('T')
        const date_ = datetime[0]
        const time = datetime[1]
        const h = time.split(':')[0]
        const m = time.split(':')[1]
        element.date = dateFrench(date_.split('-'))
        element.time = `${+h + 1}:${m}`;
    });
}


export function addGroup(Tb){
    Tb.forEach(function(element){
        element.group = groups[element.id]
    })
}

const dateFrench = function(date) {
    const month = ['','一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    return `${date[2]} ${month[date[1]]} ${date[0]}`
}

function nowdate(){
    const date = new Date();
    const m = date.getMonth();
    const j = date.getDate();
    const y = date.getFullYear();
    return `${y}-${m + 1}-${j}`
}

const now_date = nowdate()

export const today = `/matches?start_date=${now_date}&end_date=${now_date}` //for test
export const standing = "/teams/"
export const calendar = "/matches/"

