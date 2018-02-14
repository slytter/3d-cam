const slaveRouter = require('./lib/slaveRouter');

const CAMERA_PLACEMENT = process.env.CAMERA_PLACEMENT
const ROLE = process.env.ROLE
console.log("ROLE")
if(!process.env.ROLE){
    console.log("Please specify ROLE as either SLAVE or MASTER in env-vars")
    process.exit()
}

if(!process.env.CAMERA_PLACEMENT){
    console.log("Please specify CAMERA_PLACEMENT as either 1, 2, 3, 4 in env-vars")
    process.exit()
}

console.log(CAMERA_PLACEMENT)

slaveRouter();