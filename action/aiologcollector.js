/* wsk action update aiologcollector ./action/aiologcollector.js --web true
*/
async function main(params){
    console.log(params.message)
    return {
        body: "Success"
    }
}

exports.main = main