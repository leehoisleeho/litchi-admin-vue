const verifyData = (list) => {
    let msg = ''
    for (let i = 0; i < list.length; i++) {
        if(list[i].data === ''){
            msg = list[i].msg
            return msg
        }
    }
    return 0
}
export default verifyData